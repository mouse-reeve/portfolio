''' Simple webserver and API routing '''
from flask import Flask, make_response

# CONFIG
DEBUG = True
app = Flask(__name__)

# ROUTES
@app.route('/')
def index():
    ''' Render the basic template for angular '''
    return make_response(open('index.html').read())

if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

