import AWS from "aws-sdk";
import fs from "fs";
import { environment } from "../config/index.js";

const bucketName = environment.aws.bucket_name;

const config = {
  region: environment.aws.region,
  s3: {
    endpoint: environment.aws.endpoint,
  },
  accessKeyId: environment.aws.access_token_id,
  secretAccessKey: environment.aws.secret_key,
  s3ForcePathStyle: true,
};

const s3 = new AWS.S3(config);

AWS.config.update(config);

export const uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
