const aws= require("aws-sdk");
const multer= require("multer");
const multers3 = require('multer-s3')
const dotenv = require('dotenv');
dotenv.config( { path : 'config.env'} )


aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId:process.env.AWSAccessKeyId,
    region:process.env.Region
})
const s3 =  new aws.S3()

const upload = multer({
    storage:multers3({
        bucket:process.env.Bucket,
        s3:s3,
        acl:"public-read",
        serverSideEncryption: 'AES256',
        contentEncoding:'gzip',
        key:(req,file,cb)=>{
            cb(null,Date.now().toString()+'-'+file.originalname)
        }
    })
})
module.exports={s3,upload}