require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Load API key from environment variable
const API_KEY = process.env.HUGGING_FACE_API_KEY;

// Base URL for Hugging Face text-to-image model (Stable Diffusion)
const apiUrl = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

// Define the prompt (text input for image generation)
const prompt = "generate a image which contains a people and animals and objects";

// Function to generate image from text
async function generateImageFromText(prompt) {
  try {
    const response = await axios.post(
      apiUrl,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // Important to get the image as binary data
      }
    );

    // Check for response status
    if (response.status === 200) {

        console.log(response);
      // Save the image to a file
      fs.writeFileSync('generated_image.png', response.data);
      console.log('Image saved as generated_image.png');
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

// Run the function
generateImageFromText(prompt);
