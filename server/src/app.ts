import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from './routes/user.route';

const app = express()


//important setups
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

//API Routes
app.get('/ping',(req : Request , res : Response)=>{
    res.send("Hello World")
})

//user authentication routes
app.use('/api/v1/user', routes); // Use modularized routes


export default app