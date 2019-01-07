import pymongo, requests, json
from flask import jsonify
from config import USER, PASSWORD, CLIENT_ID, CLIENT_SECRET

url = f'https://api.aerisapi.com/observations/summary/:auto?&format=geojson&from=01/06/2019&filter=allstations&limit=1&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}'

conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz

data = requests.get(url).json()

db.raw.drop()
db.raw.insert_many([data])

payload = []

def get_data():
    for r in db.raw.find():
        payload.append(r)
    return payload

