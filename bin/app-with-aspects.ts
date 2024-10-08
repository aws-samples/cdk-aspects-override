// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from 'aws-cdk-lib';
import { AwsSolutionsChecks, NagSuppressions } from "cdk-nag";
import { ExampleStack1, ExampleStack2 } from '../lib/example-stacks';
import { RoleNamingConventionAspect } from '../lib/aspects';


const app = new cdk.App();

// Define a prefix for the role names
const ROLE_NAME_PREFIX = 'dev-unicorn';

// Instantiate the RoleNamingConventionAspect with the desired prefix
const roleNamingConventionAspect = new RoleNamingConventionAspect(ROLE_NAME_PREFIX);

// Apply the aspect to the entire app
cdk.Aspects.of(app).add(roleNamingConventionAspect);

// Enable CDK NAG checks for the entire app
cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));

new ExampleStack1(app, 'ExampleStack1WithAspects', {
  stackName: 'example-stack1-with-aspects',
});

new ExampleStack2(app, 'ExampleStack2WithAspects', {
  stackName: 'example-stack2-with-aspects',
});
