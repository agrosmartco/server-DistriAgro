import aws from "aws-sdk"
import config from "../config/config";

const s3Client = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.REGION
});

const uploadParams = {
    Bucket: '',
    Key: '', // pass key
    Body: null, // pass file body
};


const s3:any = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

export default s3;
