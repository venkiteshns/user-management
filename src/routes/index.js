import express from 'express'
import adminRoute from './admin.js'
import userRoute from './user.js'

const route = express.Router()

route.use('/',userRoute)
route.use('/admin',adminRoute)

export default route;
