import { UploadedFile } from "express-fileupload";
import { v4 as uuid} from "uuid";
import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";

const vacationsImagesFolder = "./src/1-assets/images/vacations/";

// Save new image
async function saveImage(image: UploadedFile): Promise<string> {
    
    // Create unique image name:
    const uniqueImageName = createImageName(image.name);
    const absolutePath = vacationsImagesFolder + uniqueImageName;

    // Save to disk:
    await image.mv(absolutePath); // MV = move

    // Return new name:
    return uniqueImageName;
}

// Update existing image:
async function updateImage(image: UploadedFile, existingImageName: string): Promise<string> {
    
    // Delete image from disk
    await deleteImage(existingImageName);

    // Save new image to disk
    const uniqueImageName = await saveImage(image);

    // Return new name:
    return uniqueImageName;
}

// Delete existing image:
async function deleteImage(existingImageName: string): Promise<void> {
    try {
        // if no image sent
        if(!existingImageName) return;

        // Delete existing image
        await fsPromises.unlink(vacationsImagesFolder + existingImageName);
    }
    catch(err:any) {
        console.error(err.message);
    }

}

// Taking imageName extension and adding unique name
function createImageName(originalImageName: string): string {

    // Take original image extension:
    const extension = originalImageName.substring(originalImageName.lastIndexOf("."));

    // Create unique name including original extension 
    const uniqueImageName = uuid() + extension;

    return uniqueImageName;

}

// get image full path for frontend
function getAbsolutePath(imageName: string): string {

    let absolutePath = path.join(__dirname, "..", "1-assets", "images","vacations", imageName);

    // if image doesn't exist
    if(!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "1-assets", "images", "image-not-found.png");
    }

    return absolutePath;
}

export default {
    saveImage,
    deleteImage,
    updateImage,
    getAbsolutePath
};