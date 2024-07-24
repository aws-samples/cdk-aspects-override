import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {NagSuppressions } from "cdk-nag";
import { Construct } from 'constructs';

// Define a new construct for an example Lambda function
export class HelloWorldLambda extends Construct {
  private readonly fn: lambda.Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.fn = new lambda.Function(this, 'LambdaFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log("Hello World");
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello World" }),
          };
        };
      `),
    });

    // Call the method to suppress CDK NAG warnings for the Lambda function's role
    this.suppressRoleWarnings();
  }

  private suppressRoleWarnings(): void {
    if (!this.fn.role) {
      throw new Error('Lambda function role is undefined');
    }
    NagSuppressions.addResourceSuppressions(this.fn.role, [
      {
        id: 'AwsSolutions-IAM4',
        reason: 'Allow managed policy for default role'
      },
    ]);
  }

  // Getter to expose the Lambda function's role name
  public get roleName(): string {
    if (!this.fn.role) {
      throw new Error('Lambda function role is undefined');
    }
    return this.fn.role.roleName;
  }
}

// Use the construct to create example stacks
export class ExampleStack1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Instantiate the an example lambda twice with different names
    const fn1 = new HelloWorldLambda(this, 'Function1');
    const fn2 = new HelloWorldLambda(this, 'Function2');

    // Add outputs for Role names

    new cdk.CfnOutput(this, 'Function1RoleName', {
      value: fn1.roleName
    });

    new cdk.CfnOutput(this, 'Function2RoleName', {
      value: fn2.roleName
    });
  }
}

export class ExampleStack2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const fn3 = new HelloWorldLambda(this, 'Function3');

    new cdk.CfnOutput(this, 'Function3RoleName', {
      value: fn3.roleName
    });
  }
}
