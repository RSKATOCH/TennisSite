#from twitterscraper import query_tweets

#if __name__ == '__main__':
#    list_of_tweets = query_tweets("Roger Federer", 10)

    #print the retrieved tweets to the screen:
    #for tweet in query_tweets("Trump OR Clinton", 10):
    #    print(tweet)

    #Or save the retrieved tweets to file:
#    file = open("output.txt","w")
#    for tweet in query_tweets("Roger Federer", 10):
#        print(tweet.text)
#        file.write(tweet.encode('utf-8'))
#    file.close()

import statistics
from twitterscraper import query_tweets
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from dateutil.relativedelta import *
import datetime as dt
analyser = SentimentIntensityAnalyzer()

from flask import Flask

app = Flask(__name__)

@app.route("/twitter/<playername>/<year>/<month>", methods=["GET"])
def get_twitter_sentiment_month(year, month, playername):
	#file = open("testRFRF.txt","w")
	tweet_sentiments = []
	begindate = dt.date(int(year), int(month), 1)
	enddate = begindate+relativedelta(months=+1)
	for tweet in query_tweets(query=playername, limit=20, begindate=begindate, enddate=enddate, lang='en')[:20]:
	    snt = analyser.polarity_scores(tweet.text)
	    tweet_sentiments.append(snt['compound'])
	    #file.write(tweet.text)
	favorability = statistics.mean(tweet_sentiments)
	print(favorability)
	#file.close()
	return(str(favorability))

if __name__ == '__main__':
    app.run(host= 'localhost', port='8084', debug=True)

