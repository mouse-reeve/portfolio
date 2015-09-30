''' gets counts of today's activity '''
from datetime import datetime
import json
import tweepy
from tweepy.error import TweepError
import urllib2

import settings

today = datetime.today().isoformat()[:10]

def github():
    ''' github activity '''
    # TODO: doesn't normalize for time zone
    data = urllib2.urlopen('https://api.github.com/users/mouse-reeve/events/public')
    data = json.loads(data.read())
    counts = [item['payload']['size'] if 'size' in item['payload'] else 1 \
              for item in data if item['created_at'][:10] == today]
    count = reduce(lambda x, y: x+y, counts)
    return count


def duolingo():
    ''' duolingo event stream '''
    data = urllib2.urlopen('https://www.duolingo.com/activity/117204017')
    data = json.loads(data.read())
    return len(data['events'])


def twitter():
    ''' twitter activity '''
    auth = tweepy.OAuthHandler(settings.TWITTER_API_KEY, settings.TWITTER_API_SECRET)
    auth.set_access_token(settings.TWITTER_ACCESS_TOKEN, settings.TWITTER_ACCESS_SECRET)
    api = tweepy.API(auth)
    try:
        api.verify_credentials()
    except TweepError:
        return 0

    tweets = api.user_timeline('tripofmice')
    tweets = [item.text for item in tweets if item.created_at.isoformat()[:10] == today]

    return len(tweets)


def instagram():
    ''' instagram activity '''
    data = urllib2.urlopen('https://api.instagram.com/v1/users/%s/media/recent/?client_id=%s' %
                           (settings.IG_USER_ID,
                            settings.IG_CLIENT_ID))
    data = json.loads(data.read())
    links = [item for item in data['data'] \
            if datetime.fromtimestamp(int(item['created_time'])).isoformat()[:10] == today]
    return len(links)
