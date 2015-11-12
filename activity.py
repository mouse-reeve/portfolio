''' gets counts of my recent online activity '''
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import dateutil.parser
import feedparser
import json
import os
import re
import requests
from sqlalchemy.exc import IntegrityError
import urllib2
from urllib import quote_plus

from server import models, app

def github(page=1):
    ''' github activity '''
    data = urllib2.urlopen('https://api.github.com/users/mouse-reeve/events/public?page=%d' % page)
    data = json.loads(data.read())

    site = 'GitHub'
    count = 0
    for event in data:
        time = dateutil.parser.parse(event['created_at'])
        if event['type'] == 'PushEvent':
            for commit in event['payload']['commits']:
                action = 'commit'
                link = commit['url']
                reference = commit['sha']

                try:
                    activity = models.Activity(time, site, action, link, reference)
                    activity.save()
                    count += 1
                except IntegrityError:
                    models.db.session.rollback()
                    break
        elif event['type'] == 'IssuesEvent':
            action = '%s issue' % event['payload']['action']
            link = event['payload']['issue']['url']
            reference = 'issue-%s' % event['id']
            try:
                activity = models.Activity(time, site, action, link, reference)
                activity.save()
                count += 1
            except IntegrityError:
                models.db.session.rollback()

    return {'count': count, 'next': page+1}


def twitter():
    ''' twitter activity '''
    page = requests.get('http://twitter.com/tripofmice/with_replies')
    soup = BeautifulSoup(page.text, 'html.parser')
    tweets = soup.find_all(class_='content')

    count = 0
    site = 'Twitter'
    action = 'tweet'
    for tweet in tweets:
        node = tweet.find(class_='tweet-timestamp')
        time = node.findChild().get('data-time')
        time = datetime.fromtimestamp(int(time))
        link = 'http://twitter.com/%s' % node.get('href')
        id_str = link.split('/')[-1]
        reference = 'tweet-%s' % id_str

        try:
            activity = models.Activity(time, site, action, link, reference)
            activity.save()
            count += 1
        except IntegrityError:
            models.db.session.rollback()

    return {'count': count}


def duolingo(page=None):
    ''' duolingo activity '''
    url = 'https://www.duolingo.com/stream/117204017'
    if page:
        url = '%s?before=%s' % (url, quote_plus(page))

    data = urllib2.urlopen(url)
    data = json.loads(data.read())
    site = 'Duolingo'
    link = 'https://www.duolingo.com/tripofmice'
    count = 0
    for item in data['events']:
        time = item['datetime_string'].strip()

        delta = None
        if re.match(r'\d* hours ago', time):
            delta = int(time.split()[0])
        elif re.match('yesterday', time):
            delta = 24
        elif re.match(r'\d* days ago', time):
            delta = int(time.split()[0]) * 24
        elif re.match(r'\d* week', time):
            delta = int(time.split()[0]) * 24 * 7

        if delta:
            time = datetime.now() - timedelta(hours=delta)
            action = item['type']
            reference = 'duolingo-%d' % item['id']

            try:
                activity = models.Activity(time, site, action, link, reference)
                activity.save()
                count += 1
            except IntegrityError:
                models.db.session.rollback()
    return {'count': count, 'next': data['before']}


def instagram():
    ''' instagram activity '''
    try:
        data = urllib2.urlopen('https://api.instagram.com/v1/users/%s/media/recent/?client_id=%s' %
                               (os.environ['IG_USER_ID'],
                                os.environ['IG_CLIENT_ID']))
    except KeyError:
        return 0

    data = json.loads(data.read())
    site = 'Instagram'
    count = 0
    for item in data['data']:
        time = datetime.fromtimestamp(int(item['created_time']))
        action = item['type']
        link = item['link']
        reference = 'instagram-%s' % item['id']

        try:
            activity = models.Activity(time, site, action, link, reference)
            activity.save()
            count += 1
        except IntegrityError:
            models.db.session.rollback()
    return {'count': count}


def goodreads():
    ''' reading update from goodreads rss '''
    feed = feedparser.parse('https://www.goodreads.com/user/updates_rss/22467583')

    site = 'Goodreads'
    count = 0

    for item in feed.entries:
        # Mousemousemouse finished reading 'The Amber Spyglass
        title = item['title']
        # remove "Mousemousemouse " name in front of title
        title = re.sub(r'^[A-Za-z]*\s', '', title)
        if 'finished' in title:
            action = 'finished reading'
        elif 'currently' in title:
            action = 'started reading'
        else:
            continue

        # hella jank
        time = re.sub(r' -0.00', '', item['published'])
        time = datetime.strptime(time, '%a, %d %b %Y %H:%M:%S')

        link = item.links[0]['href']
        reference = 'goodreads-%s' % item.id

        try:
            activity = models.Activity(time, site, action, link, reference)
            activity.save()
            count += 1
        except IntegrityError:
            models.db.session.rollback()

    return {'count': count}


def update():
    ''' run update functions '''
    sites = {
        'github': github,
        'twitter': twitter,
        'duolingo': duolingo,
        'instagram': instagram,
        'goodreads': goodreads
    }
    with app.app_context():
        for site in sites:
            print 'Updating %s' % site
            result = sites[site]()
            print 'added %s items' % result['count']
            count = 0
            while 'next' in result and result['count'] > 0 and count < 25:
                result = sites[site](page=result['next'])
                print 'added %s items' % result['count']
                count += 1
