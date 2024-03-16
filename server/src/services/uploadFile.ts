import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface File {
  buffer: Buffer;
}

export const uploadFile = async (data: File) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: 'auto',
          upload_preset: 'onlineShop',
        },
        (error, result) => {
          if (error) {
            console.log('Error inside upload_stream:', error);
            reject(error);
          } else {
            resolve({ file: result?.secure_url, fileID: result?.public_id });
          }
        }
      );

      uploadStream.end(data.buffer);
    });

    return result;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};