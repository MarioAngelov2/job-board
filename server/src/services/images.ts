import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfilePicture = async (imageData: any) => {
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
            resolve({ imageUrl: result?.secure_url, imageId: result?.public_id });
          }
        }
      );

      uploadStream.end(imageData.buffer);
    });

    return result;
  } catch (error) {
    console.error('Error uploading profile picture to Cloudinary:', error);
    throw new Error('Failed to upload profile picture');
  }
};