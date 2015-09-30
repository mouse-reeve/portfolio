''' Postgres schema '''
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgres import JSON

db = SQLAlchemy()

class Activity(db.Model):
    ''' daily activity '''
    __tablename__ = 'activity'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, server_default=db.func.now())
    updated = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    day = db.Column(db.String, unique=True)
    activity = db.Column(JSON)

    def __init__(self, date, activity):
        self.day = date.isoformat()[:10]
        self.activity = activity

    def serialize(self):
        ''' json to return to client '''
        return {
            'day': self.day,
            'activity': self.activity
        }

    def update_activity(self, activity):
        ''' update today's activity '''
        self.activity = activity
        db.session.commit()

    def save(self):
        ''' save a new entry '''
        db.session.add(self)
        db.session.commit()

def get_activity(date):
    ''' find activity for a given day '''
    return db.session.query(Activity)\
           .filter(Activity.day == date.isoformat()[:10]).one()
