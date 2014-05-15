import urllib2
import string

def url(word):
    return 'http://words.bighugelabs.com/api/2/78905c957664c4ec0b57625596af9037/' + word + '/json'

words = 'Substance ane type A little, breakable action. The prevail that characterize engineering square measure some arbitrary and uncertain. Reckon communication - what successful thoroughgoing comprehend three hundred time of life agone is virtually deep today, and what pee immaculate module right away ordain comprise precisely as disordered three hundred life therefore. And deal how umteen language in that location square measure inwards current, park practice Nation. It\'s letter delimited, if within reason ill-defined find. Simply just ideate how umteen difference could subsist inside the like descriptive linguistics and morphological device. The class figure big, mayhap eventide uncounted. And altogether of them folderal. Because hokum ace big, and hokum digit robust'
words = words.translate(string.maketrans("",""), string.punctuation)

for word in words.split(' '):
    word = word.lower()
    wordurl = url(word)
    try:
        syn = urllib2.urlopen(wordurl).read()
        print '\'' + word +'\': ' +syn
    except:
        print ''

