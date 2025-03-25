import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  region: 'us-west-2', 
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:0b8fec4a-c7f9-43a2-a67e-8db326f37210', 
  }),
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'photogalleryappbucket' }, 
});

export { cognito, s3 };
