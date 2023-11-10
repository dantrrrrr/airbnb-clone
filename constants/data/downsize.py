import json
import random

def create_subset(input_file, output_file, subset_size):
    # Load the JSON file
    with open(input_file, 'r') as file:
        jsonData = json.load(file)

    # If jsonData is a dictionary, get its values
    if isinstance(jsonData, dict):
        jsonData = list(jsonData.values())

    # Shuffle the array
    random.shuffle(jsonData)

    # Take the first `subset_size` items
    subset = jsonData[:subset_size]

    # Save the subset to a new file
    with open(output_file, 'w') as file:
        json.dump(subset, file, indent=2)

# Specify the input and output files for each dataset
datasets = [
    {'input': 'airbnb-listings.geojson', 'output': 'subset_airbnb-listings.geojson'},
    {'input': 'airbnb-listings.json', 'output': 'subset_airbnb-listings.json'},
]

# Specify the desired subset size
subset_size = 500

# Create a subset for each dataset
for dataset in datasets:
    create_subset(dataset['input'], dataset['output'], subset_size)
