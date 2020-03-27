import aws from 'aws-sdk';

const s3Client = new aws.S3(aws.config.loadFromPath('./awsconfig.json'));

const uploadParams = {
  Bucket: '',
  Key: '', // pass key
  Body: null, // pass file body
};

const s3: any = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

export default s3;
