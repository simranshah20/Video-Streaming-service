import express,{Request,Response} from 'express';
import videoRouter from './video.routes'

const v1Router = express.Router();

v1Router.use('/videos',videoRouter);  //redirect to videoRotes

v1Router.get('/ping',(_req:Request,res:Response)=>{
    res.json({
        message:'pong!!!'
    })
});
export default v1Router;