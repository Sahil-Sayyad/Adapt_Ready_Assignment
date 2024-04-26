const Tesseract = require('tesseract.js');

// Function to extract text from an image using OCR
async function extractTextFromImage(imagePath) {
    try {
        const result = await Tesseract.recognize(
            imagePath,
            'eng', 
           
        );
        return result.data.text;
    } catch (error) {
        console.error('Error extracting text from image:', error);
        return ''; 
    }
}

// Function to parse extracted text using refined regular expressions
function parseIDCardText(text) {
    const regexName = /NAME: ([A-Z\s]+)/i; // Match name (uppercase letters and spaces)
    const regexPhone = /(\d{3}-\d{3}-\d{4})/; // Match phone number (###-###-####)
    const regexDOB = /poB[\s:]+(\d{1,2}\/\d{1,2}\/\d{4})/; // Match DOB (dd/mm/yyyy or d/m/yyyy)
    const regexAddress = /ADDRESS : (.+)/; // Match address

    const nameMatch = text ? text.match(regexName) : null;
    const phoneMatch = text ? text.match(regexPhone) : null;
    const dobMatch = text ? text.match(regexDOB) : null;
    const addressMatch = text ? text.match(regexAddress) : null;

    const data = {
        name: nameMatch ? nameMatch[1].trim() : '', 
        phone: phoneMatch ? phoneMatch[1] : '',
        dob: dobMatch ? dobMatch[1] : '',
        address: addressMatch ? addressMatch[1].trim() : '' 
    };

    return data;
}

// Main function to process the image and extract structured data
async function processImage(imagePath) {
    try {
        // Extract text from the image
        const extractedText = await extractTextFromImage(imagePath);
        // Parse extracted text using regular expressions
        const parsedData = parseIDCardText(extractedText);
        console.log('Structured Data:', parsedData);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

// Usage: Call processImage function with the path to your image
const imagePath = './image.webp';
processImage(imagePath);
