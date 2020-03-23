import aws from "aws-sdk"

const s3Client = new aws.S3({
    accessKeyId: 'AKIAXGHNCYNSMLWWEPFW',
    secretAccessKey: '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',
    region: 'us-east-1'
});

const uploadParams = {
    Bucket: 'agromarketco/items/fruver',
    Key: '', // pass key
    Body: null, // pass file body
};


const s3:any = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

export default s3;
