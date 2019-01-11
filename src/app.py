from flask import Flask, render_template, jsonify
from config import USER, PASSWORD
from bson.json_util import dumps
import pymongo

conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/api/maxt', methods=['GET'])
def fetch_maxt():
    return dumps(db.maxt.find())

@app.route('/api/prcp', methods=['GET'])
def fetch_prcp():
    return dumps(db.prcp.find())

@app.route('/api/animated', methods=['GET'])
def load_animated_map():
    return render_template('animation_tiles.html')

@app.route('/api/chloro', methods=['GET'])
def load_chloro():
    return render_template('chloro.html')

if __name__ == "__main__":
    app.run(debug=True)
