const express = require('express')
const route = express.Router()
const aws = require('./aws')

const dotenv = require('dotenv');


dotenv.config( { path : 'config.env'} )

route.get('/',(req,res)=>{
    aws.s3.listObjectsV2({Bucket:process.env.Bucket},(err,data)=>{
        if(err){
            console.error(err)
        }else{
            
            let x = data.Contents.map(item=>item.Key)
    res.render('home',{files:x})
        }
        
    })
    
})
route.post('/upload',aws.upload.single('file'),(req,res)=>{
    res.json({status:'ok',fileName:req.file.key})
})

route.get('/download/:filename',async (req,res)=>{
    const filename = req.params.filename
    aws.s3.getObject({Bucket:process.env.Bucket,Key:filename},(err,data)=>{
        if(err){
            console.error(err)
        }else{
            res.send(data.Body)
        }
    })
    
})

module.exports=route