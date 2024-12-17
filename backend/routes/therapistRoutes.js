import expreess from 'express'
import { therapistList } from '../controllers/therapistController.js'

const therapistRouter = expreess.Router()


therapistRouter.get('/list', therapistList)

export default therapistRouter