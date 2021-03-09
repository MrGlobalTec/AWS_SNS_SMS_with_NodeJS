# AWS-SNS-SMS with NodeJS

A quick example of sending an SMS with AWS SNS and NodeJS

Download this repository

`$ cd AWS_SNS_SMS_with_NodeJS`
`$ npm i`

Create a specific AWS IAM user and add to group 'AmazonSNSFullAccess'

create `.env` and enter your correct AWS access key, secret and region.

`$ npm start`

You want to send a message to a number,
The country code is +44
The mobile number is (0)7700 900123
The E.164 format would be +447700900123
Then Visit

Example.
Send Text Message:
`$ {"PhoneNumber": "+447898401687", "message": "a", "subject": "a"} `
