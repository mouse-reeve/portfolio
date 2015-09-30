''' gets counts of today's activity '''
from datetime import datetime
import dateutil.parser
import json
import os
from sqlalchemy.exc import IntegrityError
import tweepy
from tweepy.error import TweepError
import urllib2

from server import models

today = datetime.today().isoformat()[:10]

def github():
    ''' github activity '''
    data = urllib2.urlopen('https://api.github.com/users/mouse-reeve/events/public')
    data = json.loads(data.read())

    site = 'GitHub'
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
            except IntegrityError:
                models.db.session.rollback()

    counts = [item['payload']['size'] if 'size' in item['payload'] else 1 \
              for item in data if item['created_at'][:10] == today]
    count = reduce(lambda x, y: x+y, counts)
    return count


def twitter():
    ''' twitter activity '''
    try:
        auth = tweepy.OAuthHandler(os.environ['TWITTER_API_KEY'],
                                   os.environ['TWITTER_API_SECRET'])
        auth.set_access_token(os.environ['TWITTER_ACCESS_TOKEN'],
                              os.environ['TWITTER_ACCESS_SECRET'])
    except KeyError:
        return 0

    api = tweepy.API(auth)
    try:
        api.verify_credentials()
    except TweepError:
        return 0

    tweets = api.user_timeline('tripofmice')

    site = 'Twitter'
    for tweet in tweets:
        time = tweet.created_at
        action = 'tweet'
        link = 'http://twitter.com/tripofmice/status/%s' % tweet.id_str
        reference = 'tweet-%s' % tweet.id_str

        try:
            activity = models.Activity(time, site, action, link, reference)
            activity.save()
        except IntegrityError:
            models.db.session.rollback()


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
    for item in data['data']:
        time = datetime.fromtimestamp(int(item['created_time']))
        action = item['type']
        link = item['link']
        reference = 'instagram-%s' % item['id']

        try:
            activity = models.Activity(time, site, action, link, reference)
            activity.save()
        except IntegrityError:
            models.db.session.rollback()
