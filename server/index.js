import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getData }  from './Data/data.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://shailendraruhelasr:XI6lvDbybNn6HuMh@cluster3.nxf0s.mongodb.net/predictor')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  day: String,
  price: Number
});
const DataModel = mongoose.model('Data', dataSchema);

// Define a route to fetch data
app.get('/data', async (req, res) => {
    
  try {




    
    // const data = await DataModel.find({});
    // const temp=await getData();

    // const data = temp
    // .filter(val => val.centre === 'VIJAYAWADA')
    // .map(val => ({
    //   day: val.Date,
    //   price: val.Price
    // }));
    // console.log(data);
    // res.json(data);


  } catch (err) {
    // console.log(getData);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Define a POST route to add data
app.post('/data', async (req, res) => {
  const { day, price } = req.body;

  // Validate data
  if (!day || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const newData = new DataModel({ day, price });
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
