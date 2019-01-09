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

@app.route('/api/max_temp', methods=['GET','POST'])
def fetch_maxt():
    return dumps(db.max_temp.find())

@app.route('/api/prcp', methods=['GET','POST'])
def fetch_prcp():
    return dumps(db.prcp.find())

if __name__ == "__main__":
    app.run(debug=True)
