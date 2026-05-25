import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TestmuaiApi implements ICredentialType {
	name = 'testmuaiApi';
	displayName = 'TestMu AI (Formerly LambdaTest) API';
	documentationUrl = 'https://www.testmuai.com/support/docs/';

	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'Your TestMu AI username (find it in your account profile)',
		},
		{
			displayName: 'Access Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your TestMu AI access key (find it in your account profile)',
		},
	];

	// "Test credential" button — hits a lightweight TestMu REST endpoint with
	// the credentials the user just entered.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.accessKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.lambdatest.com',
			url: '/automation/api/v1/sessions',
			method: 'GET',
			qs: { limit: 1 },
		},
	};
}
