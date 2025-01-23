import express,{Request,Response} from 'express';

const v1Router = express.Router();

v1Router.get('/ping',(_req:Request,res:Response)=>{
    res.json({
        message:'pong!!!'
    })
});
export default v1Router;