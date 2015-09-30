''' Simple webserver and API routing '''
from datetime import datetime
from flask import Flask, make_response
import json
from nominaflora.NominaFlora import NominaFlora
from sqlalchemy.orm.exc import NoResultFound

import activity

# CONFIG
app = Flask(__name__)
flora = NominaFlora()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/portfolio'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

import models

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
    ''' load my activity for the day '''
    activity_data = {
        'GitHub': activity.github(),
        'Duolingo': activity.duolingo(),
        'Twitter': activity.twitter(),
        'Instagram': activity.instagram(),
    }

    # Daily total
    activity_data['all'] = reduce(lambda x, y: x+y, activity_data.values())

    try:
        today = models.get_activity(datetime.today())
        today.update_activity(activity_data)
    except NoResultFound:
        entry = models.Activity(datetime.today(), activity_data)
        entry.save()

    return json.dumps(activity_data)

if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

