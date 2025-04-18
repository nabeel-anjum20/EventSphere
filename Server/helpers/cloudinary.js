import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.v2.config({
    cloud_name: cloud_name,
    api_key: api_key, 
    api_secret: api_secret, 
});

const storage = new multer.memoryStorage();

const imageuploadutils = async (file) => {
    const result = await cloudinary.v2.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
};

const upload = multer({ storage });

export { upload, imageuploadutils };
