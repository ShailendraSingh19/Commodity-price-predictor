import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dummydata from './Data/temp.json' assert { type: 'json' };
 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  });

  const foodSchema = new mongoose.Schema({
      Date:{type: String,required: true},
      centre: { type: String, required: true }, 
      Price: { type: Number, required: true },
  },{ versionKey: false });

function getmodel(name){
  if(mongoose.models[name]){
    return mongoose.models[name];
  }
  else return mongoose.model(name,foodSchema);
}

app.get('/data', async (req, res) => {
  const tempString = JSON.stringify(dummydata);
    res.send(tempString);
})
app.post('/commodity',async(req,res)=>{
  const{name,NewAdd}=req.body;
  const price=NewAdd.price;
  const{Date,centre}=NewAdd;
  const temp=getmodel(name);
  // console.log(NewAdd);
  const Centreflag = await temp.findOne({ centre: centre });
  const dateflag = await temp.findOne({ Date: Date });
  console.log(Date);
  console.log(dateflag);
  if( !Centreflag || dateflag){
    console.log(dateflag);
    console.log(Centreflag);
    res.status(403);
    console.log("forbidden")
  }
  else{
    try{
      const newdata= await temp.create(NewAdd);
      res.send({msg:"successful addition"});
      console.log("success");
      return true;
    }catch(err){
      console.log("erorr while adding new data");
      res.status(400);
    }
  }
    
})
