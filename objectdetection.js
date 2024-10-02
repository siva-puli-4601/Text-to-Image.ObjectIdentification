const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
// Hugging Face API key and object detection model URL
const HUGGINGFACE_API_KEY = process.env.HUGGING_FACE_API_KEY;  // Replace with your API key
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50";  // Example object detection model

// Function to perform object detection
async function detectObjects(imagePath) {
    try {
        // Read the image file (replace with your image path)
        const imageData = fs.readFileSync(imagePath);
        
        // Make a POST request to the Hugging Face API
        const response = await axios.post(
            MODEL_URL,
            imageData,  // Send the image data
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/octet-stream',  // Set content-type for binary data
                },
            }
        );
        
        // Output the object detection result
        console.log('Object detection result:', response.data);
    } catch (error) {
        console.error('Error during object detection:', error.response ? error.response.data : error.message);
    }
}

// Example usage (replace with your local image path)
detectObjects('./generated_image.png');
