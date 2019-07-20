# Serverless Envato Sale Verifier

## Serverless Technology
Serverless is the new buzz word and we don't want to pay for the server resources while service is in idle. AWS Lambda feature lets you deploy your node.js code to the AWS and it will only execute on specific http events. By this technology, the resources are only used while it is required. Voila! isn't it?

## Envato
Envato is a marketplace, where you can display your product for sale. For each sale, envato provides you a sales code, which is required to verified before the product is installed. So for each product verfication you need a API that verifies the product purchase and you also need to track the sales count for single license.

## About this repo
This repo for serverless envato sale verifier, uses the serverless technology and verifies the sales of the Envato product. So you don't have to pay for a full server resources every month and pay per hit resource consumption wise, and also FYI AWS gives 1 Million hits/month to Lambda for free :), isn't is cool.

If you are benifitted by the repo, please hit the star.

## Configuration

First you need to install node and npm. Once you have node and npm to the latest stable version. Clone the repo and run npm install. After that install the serverless package via npm.

    npm install -g serverless

You can try checking the AWS Serverless basic templates using below:

    serverless create -t aws-nodejs

It will create a directory with the basic template for the serverless node js application. For this app, you need to add the AWS Key Based user credentials. You can easily get that from the AWS IAM by creating a user with Key and perform the below operations:

    serverless config credentials --provider aws --key <USER_KEY> --secret <USER_SECRET>

Once you do the following you will see a directory has been created inside your home directory with .aws/crendentials which means your credential for AWS is configured.

First create a Envato API Key from the Envato website. Copy the Envato Keys and now you need to add the environment keys for the Envato. Do the below:

    cp -av .env.example .env
    vi .env

Here you need to add the Envato keys. You are now 1 step away from the magic.

Now run the below command in the application directory to deploy your code to AWS Lambda.

    serverless deploy

It will take sometime to deploy and once done. You will get a URL for the API. Hit the API from the Postman or do the below cURL operation to verify:

```
curl -X POST \
  <URL>/envato/verify \
  -H 'Content-Type: application/json' \
  -d '{
	"envato_code": "<ENTER_YOUR_ENVATO_CODE>"
}'
```

For the installer, this step is a bit complex, as you need to add your DB SQL in a file and set it to the installer. It is required if you have your own web app that requires a database to run. Hit the following API from the postman or do the below cURL operation to installer:

```
curl -X POST \
  <URL>/envato/installer
```

# Thank you

