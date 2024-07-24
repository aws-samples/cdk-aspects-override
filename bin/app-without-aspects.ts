import * as cdk from 'aws-cdk-lib';
import { ExampleStack1, ExampleStack2 } from '../lib/example-stacks';

const app = new cdk.App();

new ExampleStack1(app, 'ExampleStack1WithoutAspects', {
  stackName: 'example-stack1-without-aspects',
});

new ExampleStack2(app, 'ExampleStack2WithoutAspects', {
  stackName: 'example-stack2-without-aspects',
});