''' Postgres schema '''
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Activity(db.Model):
    ''' daily activity '''
    __tablename__ = 'activity'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, server_default=db.func.now())
    updated = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    time = db.Column(db.DateTime)
    site = db.Column(db.String(50))
    action = db.Column(db.String(300))
    link = db.Column(db.String(300))
    reference = db.Column(db.String(300), unique=True)

    def __init__(self, time, site, action, link, reference):
        self.time = time,
        self.site = site
        self.action = action
        self.link = link
        self.reference = reference

    def serialize(self):
        ''' json to return to client '''
        return {
            'time': self.time.isoformat(),
            'site': self.site,
            'action': self.action,
            'link': self.link
        }

    def save(self):
        ''' save a new entry '''
        db.session.add(self)
        db.session.commit()

def get_activity(limit=None):
    ''' find activity for a given day '''
    if limit:
        return db.session.query(Activity).filter(Activity.time > limit).all()
    else:
        return db.session.query(Activity).all()
