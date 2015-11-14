''' Simple webserver and API routing '''
from datetime import datetime, timedelta
from flask import Flask, make_response
import json
from nominaflora.NominaFlora import NominaFlora
import os

# CONFIG
app = Flask(__name__)
flora = NominaFlora()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
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
    ''' load activity from all time '''
    data = []
    limit = datetime.now() - timedelta(days=14)
    activity_data = models.get_activity(limit)

    stats = {'days': []}
    data = [item.serialize() for item in activity_data]

    for day in (limit + timedelta(n) for n in range(15)):
        stats['days'].append({
            'date': day.isoformat()[:10],
            'count': len([i for i in data if \
                i['time'][:10] == day.isoformat()[:10]])
            })
    stats['total'] = sum([day['count'] for day in stats['days']])

    return json.dumps({'stats': stats, 'activity': data})


if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

