export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || 'AKIAXGHNCYNSMLWWEPFW',    
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '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',
    REGION: 'us-east-1',
    Bucket: process.env.Bucket
}
