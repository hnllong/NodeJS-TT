import AWS from "aws-sdk";
import path from "path";
import { v4 as uuidv4 } from "uuid";
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
  const location = generateFileLocation(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: location,
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

export const removeFileStream = async (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.deleteObject(deleteParams).promise();
};

const generateFileLocation = (file) => {
  const filename =
    path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
  const extension = path.parse(file.originalname).ext;

  return `${filename}${extension}`;
};
