# train_module.py

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import torch


def train_and_forecast(file_path, pipeline, prediction_length=16):
    """
    Train on the given data and forecast future values.

    Parameters:
    - file_path (str): Path to the CSV file.
    - pipeline (ChronosPipeline): Pretrained ChronosPipeline model.
    - prediction_length (int): Number of periods to forecast.

    Returns:
    - DataFrame: Forecasted data including dates and median predictions.
    """
    # Load data
    df = pd.read_csv(file_path)
    df = df[['Date', 'Price']]
    df['Date'] = pd.to_datetime(df['Date'])

    # Prepare the context tensor
    context = torch.tensor(df["Price"].values, dtype=torch.float32)

    # Generate forecast
    forecast = pipeline.predict(context, prediction_length)  # shape [num_series, num_samples, prediction_length]

    # Define the start date for the forecast
    start_date = df['Date'].iloc[-1] + pd.DateOffset(weeks=1)

    # Generate weekly forecast dates starting from start_date
    forecast_dates = pd.date_range(start_date, periods=prediction_length, freq='W-' + pd.to_datetime(start_date).strftime('%a'))

    # Get forecast quantiles
    _, median, _ = np.quantile(forecast[0].numpy(), [0.1, 0.5, 0.9], axis=0)

    # Create DataFrame for forecasted data
    forecast_dates = forecast_dates.astype('object')
    df_forecast = pd.DataFrame({
        'Date': forecast_dates,
        'Price': median
    })

    return df_forecast.to_dict(orient="records")

