import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

const helloServiceRole = new aws.iam.Role('hello-service-role', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'sts:AssumeRole',
        Principal: {
          Service: 'lambda.amazonaws.com'
        },
        Effect: 'Allow',
        Sid: ''
      }
    ]
  })
});

const helloServiceLambda = new aws.lambda.Function('hello-service', {
  runtime: aws.lambda.NodeJS10dXRuntime,
  code: new pulumi.asset.FileArchive('../dist'),
  timeout: 2,
  handler: 'index.handler',
  role: helloServiceRole.arn
});

const helloServiceApi = new awsx.apigateway.API('hello-service', {
  routes: [
    {
      path: '/{route+}',
      method: 'ANY',
      eventHandler: helloServiceLambda
    }
  ]
});

export const apiBaseUrl = helloServiceApi.url;
