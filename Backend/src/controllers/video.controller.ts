import { Request , Response } from 'express'
import { processVideoForHLS } from '../services/video.service';
import fs from 'fs';

export const uploadVideoController = async(req:Request ,res:Response)=>{
    if(!req.file){
        res.status(400).json({
            success:false,
            message:"No file is uploaded,Please select a file to upload."
        })
        return;
    }
    const videoPath = req.file.path;
    const outputPath = `output/${Date.now()}`;

    processVideoForHLS(videoPath,outputPath,(err,masterPlaylistPath)=>{
        if(err){
            res.status(500).json({
            success:false,
            message:'An error occured while processing the video'
            });
            return;
        }
        
        //Deleting the video file after processing
        fs.unlink(videoPath,(err)=>{
            if(err){
                console.log('An error occured while deleting the video file: ',err);
            }
        })
        res.status(200).json({
            success:true,
            message:'Video processed successfully',
            data: `${masterPlaylistPath}`
        });
    });
}