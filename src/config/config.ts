export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'AKIAXGHNCYNSDV4IRX7S',
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY ||
    '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',
  REGION: 'us-east-1',
  Bucket: process.env.Bucket,
};
