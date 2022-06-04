import pandas as pd
import os

# directory folder to loop over csv files
directory = "./Data/Commons Divisions"
filename_to_save = "./commons_divisions.json"
frames = []

# 
for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        print(os.path.join(directory, filename))
        frame = pd.read_csv(os.path.join(directory, filename))
        frame['id'] = frame['uri'].str.split('/').str[-1]
        frame['id'] = pd.to_numeric(frame['id'])
        frames.append(frame)
        continue
    else:
        continue

result = pd.concat(frames)
result.sort_values(by=['id'], ascending=True, inplace=True)
print(result)
json_out = result.to_json(filename_to_save, orient="records")