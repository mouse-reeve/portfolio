''' server initialization '''
from flask import Flask
from nominaflora.NominaFlora import NominaFlora
import os

app = Flask(__name__)
flora = NominaFlora()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

import models

models.db.init_app(app)


import portfolio.views
