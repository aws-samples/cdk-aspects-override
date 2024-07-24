import * as cdk from 'aws-cdk-lib';
import { ExampleStack1, ExampleStack2 } from '../lib/example-stacks';
import { RoleNamingConventionAspect } from '../lib/aspects';

const app = new cdk.App();

// Define a prefix for the role names
const ROLE_NAME_PREFIX = 'dev-unicorn';

// Instantiate the RoleNamingConventionAspect with the desired prefix
const roleNamingConventionAspect = new RoleNamingConventionAspect(ROLE_NAME_PREFIX);

// Apply the aspect to the entire app
cdk.Aspects.of(app).add(roleNamingConventionAspect);

new ExampleStack1(app, 'ExampleStack1WithAspects', {
  stackName: 'example-stack1-with-aspects',
});

new ExampleStack2(app, 'ExampleStack2WithAspects', {
  stackName: 'example-stack2-with-aspects',
});
