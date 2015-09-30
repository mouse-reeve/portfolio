''' Simple webserver and API routing '''
from flask import Flask, make_response
import json
from nominaflora.NominaFlora import NominaFlora
import os
from sqlalchemy.orm.exc import NoResultFound

# CONFIG
app = Flask(__name__)
flora = NominaFlora()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

import models
import activity

models.db.init_app(app)

# ROUTES
@app.route('/')
def index():
    ''' render the basic template for angular '''
    return make_response(open('index.html').read())

@app.route('/<path>')
def angular(path):
    ''' render the basic template for angular '''
    return make_response(open('index.html').read())

# the fun stuff API
@app.route('/api/flora', methods=['GET'])
def flower_names():
    ''' returns a made up flower name '''
    name = {'common': flora.get_common_name(), 'scientific': flora.get_scientific_name()}
    return json.dumps(name)


@app.route('/api/activity', methods=['GET'])
def get_activity():
    ''' load activity from all time '''
    data = []
    activity_data = models.get_activity()
    for item in activity_data:
        data.append(item.serialize())

    return json.dumps(data)


if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

