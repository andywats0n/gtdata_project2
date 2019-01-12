

# Dependencies and Setup
import pandas as pd
import numpy as np
import requests
import time
import datetime as dt
import pymongo, requests, json
from flask import jsonify
from config import USER, PASSWORD, CLIENT_ID, CLIENT_SECRET

# url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/1950&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=maxt"
conn = f'mongodb+srv://{USER}:{PASSWORD}@weatherviz-andy-5dubo.mongodb.net/weatherviz?retryWrites=true'
client = pymongo.MongoClient(conn)
db = client.weatherviz

# boundaries
bottom = 25
top = 49
left = -126
right = -66
add_prcp = "&filter=prcp"
add_snow= "&filter=snow"

df_maxtemp = pd.DataFrame([], columns = {'Date','Date(ISO)', 'Lat', 'Long', 'Temp(F)'})
df_mintemp = pd.DataFrame([], columns = {'Date','Date(ISO)', 'Lat', 'Long', 'Temp(F)'})
df_prcp = pd.DataFrame([], columns = {'Date','Date(ISO)', 'Lat', 'Long', 'Prcp(in)'})
df_snow = pd.DataFrame([], columns = {'Date','Date(ISO)', 'Lat', 'Long', 'Snow(in)'})

df_snow = df_snow[['Date','Date(ISO)',  'Lat', 'Long', 'Snow(in)']]
df_prcp = df_prcp[['Date','Date(ISO)',  'Lat', 'Long', 'Prcp(in)']]
df_maxtemp = df_maxtemp[['Date', 'Date(ISO)', 'Lat', 'Long', 'Temp(F)']]
df_mintemp = df_mintemp[['Date', 'Date(ISO)', 'Lat', 'Long', 'Temp(F)']]

height = (top-bottom)/15
width = (right-left)/40

##MAXTEMP
for i in range(5):
    box_top = round(top - i*height,4)
    box_bottom = round(box_top - height,4)
    for j in range(5):
        box_left = round(left + j*height,4)
        box_right = round(box_left + width,4)

        query_url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/1950&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=maxt"
        weather_response = requests.get(query_url)
        weather_json = weather_response.json()
        # print(i*40+j, len(weather_json['response']), box_bottom, box_left, box_top, box_right)
        for k in range(len(weather_json['response'])):
            response = weather_json['response'][k]

            fahr_temp = response['report']['details']['tempF']
            lat = response['loc']['lat']
            lon = response['loc']['long']
            date = response['report']['timestamp']
            dateiso = response['report']['dateTimeISO']

            df_maxtemp = df_maxtemp.append(pd.Series([date, dateiso, lat, lon, fahr_temp], index=df_maxtemp.columns ), ignore_index=True)

maxt_json = df_maxtemp.to_json()
print('test')
db.max_temp.insert_one(maxt_json)

data = get_data()

payload = []

def get_data():
    for r in db.max_temp.find():
        payload.append(r)
    print(payload)
    return payload


# ##MINTEMP
# for i in range(15):
#     box_top = round(top - i*height,4)
#     box_bottom = round(box_top - height,4)
#     for j in range(40):
#         box_left = round(left + j*height,4)
#         box_right = round(box_left + width,4)

#         query_url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/1950&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=mint"
#         weather_response = requests.get(query_url)
#         weather_json = weather_response.json()
#         print(i*40+j, len(weather_json['response']), box_bottom, box_left, box_top, box_right)
#         for k in range(len(weather_json['response'])):
#             response = weather_json['response'][k]

#             fahr_temp = response['report']['details']['tempF']
#             lat = response['loc']['lat']
#             lon = response['loc']['long']
#             date = response['report']['timestamp']
#             dateiso = response['report']['dateTimeISO']

#             df_mintemp = df_mintemp.append(pd.Series([date, dateiso, lat, lon, fahr_temp], index=df_mintemp.columns ), ignore_index=True)




# ##PRCP
# for i in range(15):
#     box_top = round(top - i*height,4)
#     box_bottom = round(box_top - height,4)
#     for j in range(40):
#         box_left = round(left + j*height,4)
#         box_right = round(box_left + width,4)

#         query_url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/2000&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=prcp"
#         weather_response = requests.get(query_url)
#         weather_json = weather_response.json()
#         print(i*40+j, len(weather_json['response']), box_bottom, box_left, box_top, box_right)
#         for k in range(len(weather_json['response'])):

#             response = weather_json['response'][k]

#             prcp = response['report']['details']['rainIN']
#             lat = response['loc']['lat']
#             lon = response['loc']['long']
#             date = response['report']['timestamp']
#             dateiso = response['report']['dateTimeISO']

#             df_prcp = df_prcp.append(pd.Series([date, dateiso, lat, lon, prcp], index=df_prcp.columns ), ignore_index=True)





# ##SNOW
# for i in range(15):
#     box_top = round(top - i*height,4)
#     box_bottom = round(box_top - height,4)
#     for j in range(40):
#         box_left = round(left + j*height,4)
#         box_right = round(box_left + width,4)

#         query_url = f"https://api.aerisapi.com/records/within?p={box_bottom},{box_left},{box_top},{box_right}&limit=2000&from=01/01/2000&to=now&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&filter=snow"
#         weather_response = requests.get(query_url)
#         weather_json = weather_response.json()
#         print(i*40+j, len(weather_json['response']), box_bottom, box_left, box_top, box_right)
#         for k in range(len(weather_json['response'])):
#             response = weather_json['response'][k]

#             snow = response['report']['details']['snowIN']
#             lat = response['loc']['lat']
#             lon = response['loc']['long']
#             date = response['report']['timestamp']
#             dateiso = response['report']['dateTimeISO']

#             df_snow = df_snow.append(pd.Series([date, dateiso lat, lon, snow], index=df_snow.columns ), ignore_index=True)
