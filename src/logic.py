import pymongo
from config import USER, PASSWORD

conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)

db = client.weatherviz

db.raw.insert_one({'user':USER})

cursor = db.raw.find_one({})

print(cursor)


def payload():
    return {"test":"data"}
