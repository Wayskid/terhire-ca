import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function upload(images) {
  try {
    if (!images) throw new Error("Please upload picture");

    //Lets you upload single or multiple files
    const multiplePicturePromise = images.map((image) =>
      cloudinary.uploader.upload(image, { folder: "Terhire" })
    );
    const imageResponses = await Promise.all(multiplePicturePromise);
    return imageResponses;
  } catch (error) {
    console.log(error);
  }
}

export default upload;
