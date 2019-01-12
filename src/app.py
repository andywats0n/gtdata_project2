import pymongo
from flask import Flask, render_template, jsonify
from bson.json_util import dumps
from config import USER, PASSWORD
import pandas as pd

conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/map_test', methods=['GET'])
def test():
    return render_template('test.html')


@app.route('/api/test', methods=['GET','POST'])
def api_test():
    return dumps(db.maxt.find().limit(10000))

maxt_df = None
mint_df = None
prcp_df = None
snow_df = None


## MAXTEMP
@app.route('/api/maxt', methods=['GET','POST'])
def maxt():
    global maxt_df
    if maxt_df is None:
        my_maxt = pd.DataFrame(list(db.maxt.find()))
        my_maxt['year'] = pd.DatetimeIndex(my_maxt['Date(ISO)']).year
        my_maxt['month'] = pd.DatetimeIndex(my_maxt['Date(ISO)']).month
        maxt_df = pd.DataFrame(my_maxt.groupby(['year', 'month', 'Lat', 'Long'])['Temp(F)'].max()).reset_index()

    return maxt_df.to_json(orient='records')


## MINTEMP
@app.route('/api/mint', methods=['GET','POST'])
def mint():
    global mint_df
    if mint_df is None:
        my_mint = pd.DataFrame(list(db.mint.find()))
        my_mint['year'] = pd.DatetimeIndex(my_mint['Date(ISO)']).year
        my_mint['month'] = pd.DatetimeIndex(my_mint['Date(ISO)']).month
        mint_df = pd.DataFrame(my_mint.groupby(['year', 'month', 'Lat', 'Long'])['Temp(F)'].min()).reset_index()
    return mint_df.to_json(orient='records')


## PRECIPITATION
@app.route('/api/prcp', methods=['GET','POST'])
def prcp():
    global prcp_df
    if prcp_df is None:
        my_prcp = pd.DataFrame(list(db.prcp.find()))
        my_prcp['year'] = pd.DatetimeIndex(my_prcp['Date(ISO)']).year
        my_prcp['month'] = pd.DatetimeIndex(my_prcp['Date(ISO)']).month
        prcp_df = pd.DataFrame(my_prcp.groupby(['year', 'month', 'Lat', 'Long'])['Prcp(in)'].max()).reset_index()
    return prcp_df.to_json(orient='records')


## SNOWFALL
@app.route('/api/snow', methods=['GET','POST'])
def snow():
    global snow_df
    if snow_df is None:
        my_snow = pd.DataFrame(list(db.snow.find()))
        my_snow['year'] = pd.DatetimeIndex(my_snow['Date(ISO)']).year
        my_snow['month'] = pd.DatetimeIndex(my_snow['Date(ISO)']).month
        snow_df = pd.DataFrame(my_snow.groupby(['year', 'month', 'Lat', 'Long'])['Snow(in)'].max()).reset_index()
        snow_df = snow_df[snow_df['Snow(in)'] !=0]
    return snow_df.to_json(orient='records')

## FILTERED MAXTEMP
@app.route('/api/filtermaxt/<mon>/<yr>', methods=['GET','POST'])
def maxtdate(mon, yr):
    new_df = maxt_df[(maxt_df['year']== (int(yr))) & (maxt_df['month']== (int(mon))) ]
    return new_df.to_json(orient='records')


## FILTERED MINTEMP
@app.route('/api/filtermint/<mon>/<yr>', methods=['GET','POST'])
def mintdate(mon, yr):
    new_df = mint_df[(mint_df['year']== (int(yr))) & (mint_df['month']== (int(mon))) ]
    return new_df.to_json(orient='records')


## FILTERED PRECIPITATION
@app.route('/api/filterprcp/<mon>/<yr>', methods=['GET','POST'])
def prcpdate(mon, yr):
    new_df = prcp_df[(prcp_df['year']== (int(yr))) & (prcp_df['month']== (int(mon))) ]
    return new_df.to_json(orient='records')


## FILTERED SNOWFALL
@app.route('/api/filtersnow/<mon>/<yr>', methods=['GET','POST'])
def snowdate(mon, yr):
    new_df = snow_df[(snow_df['year']== (int(yr))) & (snow_df['month']== (int(mon))) ]
    return new_df.to_json(orient='records')


if __name__ == "__main__":
    app.run(debug=False)
