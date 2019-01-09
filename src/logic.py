import pymongo, requests, json
from flask import jsonify
from config import USER, PASSWORD, CLIENT_ID, CLIENT_SECRET
import aerisweather
import pandas as pd

# url = f'https://api.aerisapi.com/observations/summary/:auto?&format=geojson&from=01/06/2019&filter=allstations&limit=1&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}'
url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/1950&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=maxt"
conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz
res = requests.get(url).json()

db.raw.drop()

db.max_temp.insert_many([res])

data = get_data()

payload = []

def get_data():
    for r in db.raw.find():
        payload.append(r)
    print(payload)
    return payload

