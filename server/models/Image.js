import cloudinary from 'cloudinary';    
import dotEnv from 'dotenv'

dotEnv.config()

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SERCRET,
    }
);

export const uploadImage = (image) => {
    const cloudinaryOptions = {
        resource_type: 'raw'
    }

return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(cloudinaryOptions, function(e, result) {
        if(e) {
            reject(e);
        } else {
            resolve(result)
        }
    }).end(image.buffer)
})
};

module.exports = Image;