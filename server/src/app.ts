import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from './routes/user.route';
import logRoutes from './routes/log.route';
import { options } from './controller/user.controller';

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

app.get('/test-cookie', (req, res) => {
    res.cookie('test', 'value', options);
    res.send('Cookie set');
});
  
//API Routes
app.get('/ping',(req : Request , res : Response)=>{
    res.send("Hello World")
})

//user authentication routes
app.use('/api/v1/user', routes); // Use modularized routes
app.use('/api/v1/log', logRoutes); 



export default app