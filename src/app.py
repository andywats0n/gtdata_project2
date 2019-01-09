# Externally Visible Server
# If you run the server you will notice that the server is only accessible from your own computer, not from any other in the network. This is the default because in debugging mode a user of the application can execute arbitrary Python code on your computer.

# If you have the debugger disabled or trust the users on your network, you can make the server publicly available simply by adding --host=0.0.0.0 to the command line:

# flask run --host=0.0.0.0
# This tells your operating system to listen on all public IPs.

import pymongo
from flask import Flask, render_template, jsonify
from bson.json_util import dumps
from config import USER, PASSWORD

conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/api/test', methods=['GET','POST'])
def api_test():
    return dumps(db.max_temp.find())

if __name__ == "__main__":
    app.run(debug=True)
