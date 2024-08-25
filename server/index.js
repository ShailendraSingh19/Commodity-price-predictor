
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import temp from './Data/temp.json' assert { type: 'json' };

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using Mongoose

mongoose.connect('mongodb+srv://shailendraruhelasr:XI6lvDbybNn6HuMh@cluster3.nxf0s.mongodb.net/prediction')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // exit the process if the connection fails
  });

  const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prices: [{ 
      location: { type: String, required: true }, 
      price: { type: Number, required: true }
    }]
  });

const Food = mongoose.model('Food', foodSchema);


app.get('/data', async (req, res) => {
  const tempString = JSON.stringify(temp);
    res.send(tempString);
})
app.post('/food', async (req, res) => {
  const { name, prices } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Food name is missing from the request' });
  }

  try {
    // Find the food item by name
    const food = await Food.findOne({ name: name });

    if (!food) {
      // If food item doesn't exist, create a new one with the provided prices
      const newFood = new Food({
        name: name,
        prices: prices
      });
      await newFood.save();
      return res.send({ message: 'Food created successfully', food: newFood });
    }

    // Append new prices to existing prices
    prices.forEach(priceObj => {
      const existingPrice = food.prices.find(p => p.location === priceObj.location);
      if (existingPrice) {
        // Update the price if location already exists
        existingPrice.price = priceObj.price;
      } else {
        // Push new location and price if it does not exist
        food.prices.push(priceObj);
      }
    });

    // Save the updated food item
    await food.save();
    res.send({ message: 'Food prices updated successfully', food });
  } catch (error) {
    console.error('Error during database query:', error);
    res.status(500).send({ message: 'Error updating food prices', error: error.message });
  }
});
