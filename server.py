from flask import Flask, request, make_response, g

import os

# CONFIG
DEBUG = True
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# ROUTES
@app.route('/')
def index():
    return make_response(open('index.html').read())

if __name__ == '__main__':
    app.debug = True
    app.run(port=4000)

