'use strict';

// external modules required
const AWS = require("aws-sdk") //aws-sdk is by default available in lambda runtime
const { v4: uuid } = require("uuid")

// create a s3 client
const S3Client = new AWS.S3({})

// params to create pre-signed url
const bucketName = process.env.BUCKET_NAME
const expiresIn = Number(process.env.EXPIRES_IN)

// main handler function
module.exports.main = async (event) => {
  try {
    const url = S3Client.getSignedUrl("putObject", {
      Bucket: bucketName,
      Key: uuid(),
      Expires: expiresIn,
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          statusCode: 200,
          message: 'Presigned URL generated successfully!',
          data: {
            url
          }
        },
      ),
    }
    return response
  } catch (error) {
    console.log(error)
    const response = {
      statusCode: 500,
      body: JSON.stringify(
        {
          statusCode: 500,
          message: 'Some error occurred.',
          error
        },
      ),
    }
    return response
  }
};
