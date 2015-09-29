''' Simple webserver and API routing '''
from flask import Flask, make_response
from nominaflora.NominaFlora import NominaFlora

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
    name = '%s (%s)' % (flora.get_common_name(), flora.get_scientific_name())
    return name

if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

