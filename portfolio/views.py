''' site views '''
from datetime import datetime, timedelta
from dateutil.parser import parse
from flask import render_template, redirect
from jinja2.exceptions import TemplateNotFound
import json

from portfolio import app, flora, models

# ROUTES
@app.route('/')
def index():
    ''' render the home page and links '''
    pages = [
        {'link': 'clocks', 'display': 'clocks'},
        {'link': 'chomsky', 'display': 'chomp'},
        {'link': 'thesaurus', 'display': 'sense'},
        {'link': 'flora', 'display': 'flora'},
        {'link': 'kipple', 'display': 'kipple'},
        {'link': 'activity', 'display': 'activity'},
        {'link': 'resume', 'display': 'r&eacute;sum&eacute;'},
        {'link': 'about', 'display': 'about'}
    ]

    return render_template('index.html', pages=pages, activity=get_activity())

@app.route('/resume')
def resume():
    ''' render resume template from json '''
    data = json.load(file('portfolio/static/files/resume.json'))
    return render_template('resume.html', resume=data)

@app.route('/activity')
def actvity():
    ''' render resume template from json '''
    return render_template('activity.html', activity=get_activity())

@app.route('/<name>')
def page(name):
    ''' render a template, if it exists '''
    template = '%s.html' % name
    try:
        return render_template(template)
    except TemplateNotFound:
        return redirect('/')

# the fun stuff API
@app.route('/api/flora')
def flower_names():
    ''' returns a made up flower name '''
    name = {
        'common': flora.get_common_name(),
        'scientific': flora.get_scientific_name()
    }
    return json.dumps(name)


@app.route('/api/activity')
def get_activity():
    ''' load activity from all time '''
    data = []
    limit = datetime.now() - timedelta(days=14)
    activity_data = models.get_activity(limit)

    stats = {'days': []}
    for item in activity_data:
        date = item.time.strftime('%A, %d %b %Y')
        item = item.serialize()
        item['date'] = date
        data.append(item)

    for day in (limit + timedelta(n) for n in range(15)):
        stats['days'].append({
            'date': day.isoformat()[:10],
            'day': day.strftime('%a'),
            'count': len([i for i in data if \
                i['time'][:10] == day.isoformat()[:10]])
            })
    stats['total'] = sum([day['count'] for day in stats['days']])

    return {'stats': stats, 'activity': data}


# --- filters
@app.template_filter('time')
def time_filter(date):
    ''' make time fields pretty '''
    if not date:
        return 'present'

    try:
        timestamp = parse(date)
    except ValueError:
        return date

    return timestamp.strftime('%b %Y')
