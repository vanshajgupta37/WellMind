// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { 
  sendChatRequest, 
  getPendingChatRequests, 
  acceptChatRequest, 
  rejectChatRequest,
  getClientSessions,
  getTherapistSessions
} = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Chat Request Routes
router.post('/requests/send', authMiddleware, sendChatRequest);
router.get('/requests/pending', authMiddleware, getPendingChatRequests);
router.post('/requests/:requestId/accept', authMiddleware, acceptChatRequest);
router.post('/requests/:requestId/reject', authMiddleware, rejectChatRequest);

// Chat Session Routes
router.get('/sessions/client', authMiddleware, getClientSessions);
router.get('/sessions/therapist', authMiddleware, getTherapistSessions);

module.exports = router;

// controllers/chatController.js
const ChatRequest = require('../models/ChatRequest');
const ChatSession = require('../models/ChatSession');
const Client = require('../models/Client');
const Therapist = require('../models/Therapist');

exports.sendChatRequest = async (req, res) => {
  try {
    const { therapistId } = req.body;
    const clientId = req.user.id;

    // Check if an active request already exists
    const existingRequest = await ChatRequest.findOne({
      client: clientId,
      therapist: therapistId,
      status: 'Pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Chat request already sent' });
    }

    const chatRequest = new ChatRequest({
      client: clientId,
      therapist: therapistId,
      status: 'Pending'
    });

    await chatRequest.save();
    res.status(201).json(chatRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error sending chat request' });
  }
};

exports.getPendingChatRequests = async (req, res) => {
  try {
    const therapistId = req.user.id;
    const pendingRequests = await ChatRequest.find({ 
      therapist: therapistId, 
      status: 'Pending' 
    }).populate('client', 'name email');

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat requests' });
  }
};

exports.acceptChatRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const therapistId = req.user.id;

    const chatRequest = await ChatRequest.findOneAndUpdate(
      { _id: requestId, therapist: therapistId, status: 'Pending' },
      { status: 'Accepted' },
      { new: true }
    ).populate('client').populate('therapist');

    if (!chatRequest) {
      return res.status(404).json({ message: 'Chat request not found' });
    }

    // Create a new chat session
    const chatSession = new ChatSession({
      client: chatRequest.client._id,
      therapist: chatRequest.therapist._id
    });

    await chatSession.save();

    res.json({ chatRequest, chatSession });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting chat request' });
  }
};

exports.getClientSessions = async (req, res) => {
  try {
    const clientId = req.user.id;
    const sessions = await ChatSession.find({ client: clientId })
      .populate('therapist', 'name expertise');

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client sessions' });
  }
};