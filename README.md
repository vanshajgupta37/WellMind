# WellMind

*WellMind* is a modern web application designed to connect patients with licensed therapists, offering seamless mental health services. The platform emphasizes accessibility, security, and a user-friendly experience, ensuring that mental health care is just a few clicks away.

## Features
- *User Authentication*: Secure login and registration with role-based access control
- *Therapist Directory*: Browse and filter therapist profiles by specialty and availability
- *Appointment Scheduling*: Book, view, and manage your appointments with ease
- *Responsive Design*: Optimized for devices of all sizes
- *Secure Media Management*: Profile images and assets are stored and retrieved securely

## Tech Stack

### Frontend
- *React (Vite)*: Fast and modular UI framework
- *Tailwind CSS*: Clean and customizable styling
- *React Router DOM*: Seamless navigation
- *Axios*: For RESTful API integration

### Backend
- *Node.js*: Fast and scalable runtime environment
- *Express.js*: Lightweight and flexible backend framework
- *MongoDB*: NoSQL database for storing dynamic data
- *Mongoose*: Object Data Modeling for MongoDB
- *JWT*: Secure token-based authentication
- *bcrypt*: Password hashing for enhanced security

### Others
- *Cloudinary*: Media asset management
- *AWS (Amplify & EC2)*: For hosting and deployment
- *MongoDB Atlas*: Cloud-hosted database solution

## Installation

### Prerequisites
- *Node.js* (v14 or higher)
- *MongoDB* (Local or Atlas)
- *Cloudinary* account (optional for media management)

### Steps

1. *Clone the Repository*:
   bash
   git clone https://github.com/vanshajgupta37/WellMind.git
   cd WellMind
   

2. *Install Dependencies*:
   bash
   cd backend
   npm install
   cd ../frontend
   npm install
   

3. *Set Up Environment Variables*:
   Create a .env file in the backend directory:
   
   PORT=5000
   MONGO_URI=<Your_MongoDB_URI>
   JWT_SECRET=<Your_JWT_Secret>
   CLOUDINARY_NAME=<Your_Cloudinary_Name>
   CLOUDINARY_API_KEY=<Your_API_Key>
   CLOUDINARY_API_SECRET=<Your_API_Secret>
   

4. *Start the Servers*:
   bash
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd ../frontend
   npm run dev
   

5. *Access the Application*: Open http://localhost:3000 in your browser

## API Overview

### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Log in and receive a JWT

### Therapists
- GET /therapists - Fetch therapist profiles
- GET /therapists/:id - View detailed therapist information

### Appointments
- POST /appointments - Book a new appointment
- GET /appointments - Retrieve user appointment history

## Folder Structure

### Backend
- */models*: Database models for users, therapists, and appointments
- */routes*: API routes for authentication, therapists, and appointments
- */middleware*: Authentication and error handling middleware
- *server.js*: Entry point for the backend application

### Frontend
- */src/components*: Reusable React components
- */src/pages*: Page-level components for routing
- */src/context*: Context API for state management
- */src/utils*: Utility functions (e.g., API calls)
- *vite.config.js*: Configuration for the Vite development server

## Deployment

### Frontend
Deployed on *AWS Amplify* for scalability and CI/CD integration

### Backend
Hosted on *AWS EC2* for flexibility and control

### Database
MongoDB Atlas with restricted IP access for secure data storage

## Future Plans
- *Integrated Payments*: Add support for Stripe or PayPal
- *Telehealth Integration*: Enable video conferencing for sessions
- *Mobile App*: Expand accessibility with native Android and iOS apps
- *AI Recommendations*: Smart therapist suggestions based on user preferences
- *Real-Time Chat*: Build a chat feature for seamless communication

## Contributing
Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m "Add feature-name")
4. Push to the branch (git push origin feature-name)
5. Open a Pull Request

## License
This project is licensed under the MIT License. See the LICENSE file for details.