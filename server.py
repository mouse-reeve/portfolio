''' Simple webserver and API routing '''
from flask import Flask, make_response
from nominaflora.NominaFlora import NominaFlora
import json
import urllib2

# CONFIG
app = Flask(__name__)
flora = NominaFlora()

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
    activity = {'all': 0}

    # GitHub activity
    github = urllib2.urlopen('https://api.github.com/users/mouse-reeve/events/public')
    github = json.loads(github.read())
    counts = [item['payload']['size'] if 'size' in item['payload'] else 1 \
              for item in github if item['created_at'][:10] == '2015-09-29']
    activity['github'] = reduce(lambda x, y: x+y, counts)
    activity['all'] += activity['github']

    return json.dumps(activity)

if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

