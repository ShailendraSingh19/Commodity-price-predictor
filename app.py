from fastapi import FastAPI, HTTPException
import pandas as pd
import torch
import os
from starlette.middleware.cors import CORSMiddleware
from chronos import ChronosPipeline
from files import file_list, get_crop, get_city
from train import train_and_forecast  

app = FastAPI()

device = "mps" if torch.backends.mps.is_available() and torch.backends.mps.is_built() else "cuda" if torch.cuda.is_available() else "cpu"

# Preload the model pipeline to avoid loading it for every request
pipeline = ChronosPipeline.from_pretrained(
    "amazon/chronos-t5-tiny",
    device_map=device,
    torch_dtype=torch.bfloat16,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods; adjust as needed
    allow_headers=["*"],  # Allows all headers; adjust as needed
)

data = {}

@app.get('/train')
def train_pipeline():
    for file in file_list:
        dir = os.path.join("data", file)
        crop = get_crop(file)
        city = get_city(file)
        forecast = train_and_forecast(dir, pipeline)
        
        # Ensure the crop key exists in the data dictionary
        if crop not in data:
            data[crop] = {}
        
        # Assign the forecast to the city key within the crop dictionary
        data[crop][city] = forecast
    
    return {"message": "All models trained successfully. Go to /inference"}

@app.get('/inference')
def get_response():
    if not data:
        return {"message": "Please go to /train first"}
    
    # The data dictionary is already in a serializable format
    # so we can return it directly
    # print(data)
    return data
