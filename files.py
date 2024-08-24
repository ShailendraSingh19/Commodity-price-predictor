import os
import re

# Specify the directory where your files are located
data_folder = 'data/'  

# Get the list of files in the directory
file_list = os.listdir(data_folder)

# If you want to filter out only files (excluding directories)
file_list = [f for f in file_list if os.path.isfile(os.path.join(data_folder, f))]

def get_crop(name):
    match = re.match(r"^(.*?)_", name)

    if match:
        result = match.group(1)
        return result

def get_city(name):
    match = re.search(r'_(.*?)\.', name)
    if match:
        result = match.group(1)
        return result

