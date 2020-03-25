export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'AKIAXGHNCYNSK3ZA4FVU',
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ||
    '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',
  REGION: 'us-east-1',
  Bucket: process.env.Bucket,
};
