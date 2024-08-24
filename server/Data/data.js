import csv from 'csvtojson';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the specific CSV file
const csvFilePath = path.join(__dirname, 'CSV', 'onion.csv');

// Define the function to convert CSV to JSON
export const getData = async () => {
  try {
    console.log(`Reading file from: ${csvFilePath}`); // Debugging line
    const jsonData = await csv().fromFile(csvFilePath);
    console.log('CSV to JSON conversion successful.'); // Debugging line
    return jsonData;
  } catch (err) {
    console.error('Error reading CSV file:', err);
    throw err;
  }
};
