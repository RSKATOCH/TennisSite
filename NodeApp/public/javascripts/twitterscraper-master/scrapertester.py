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



def get_sentiment_scores(text):
    snt = analyser.polarity_scores(text)
    #print("{:-<40} {}".format(text, str(snt['compound'])))
    return(snt['compound'])

# All tweets matching either Trump or Clinton will be returned. You will get at
# least 10 results within the minimal possible time/number of requests


#file = open("testRF.json","w")
#for tweet in query_tweets("Roger Federer", 10, lang='en')[:50]:
#    tweet_sentiments.append(get_sentiment_scores(tweet.text))
#    file.write(tweet.text)
#favorability = statistics.mean(tweet_sentiments)
#print(favorability)
#file.close()

def get_twitter_sentiment_year(year, playername):
	tweet_sentiments = []
	file = open("testRFRF.json","w")
	begindates = []
	monthlyfavorability = []
	if (year <= 2018):
		for m in range(1,13):
			begindates.append(dt.date(int(year), m, 1))
		for d in begindates:
			enddate = d+relativedelta(months=+1)
			for tweet in query_tweets(query=playername, limit=20, begindate=begindate, enddate=enddate, lang='en')[:20]:
			    tweet_sentiments.append(get_sentiment_scores(tweet.text))
			    file.write(tweet.text)
			#print(tweet_sentiments)
			favorability = statistics.mean(tweet_sentiments)
			print(favorability)
			monthlyfavorability.append(favorability)
	file.close()

def get_twitter_sentiment_month(year, month, playername):
	#file = open("testRFRF.txt","w")
	tweet_sentiments = []
	begindate = dt.date(int(year), int(month), 1)
	enddate = begindate+relativedelta(months=+1)
	for tweet in query_tweets(query=playername, limit=20, begindate=begindate, enddate=enddate, lang='en')[:20]:
	    tweet_sentiments.append(get_sentiment_scores(tweet.text))
	    #file.write(tweet.text)
	favorability = statistics.mean(tweet_sentiments)
	print(favorability)
	#file.close()
	return(favorability)

get_twitter_sentiment_month(2018, 5, "Roger Federer")

#file = open("testSW.txt","w")
#for tweet in query_tweets("Serena Williams", 10, lang='EN')[:10]:
#    file.write(tweet.encode('utf-8'))
#file.close()

#Or save the retrieved tweets to file:
#for tweet in query_tweets("Serena Williams", 10, lang='EN'):
#        print(tweet)

#file = open("testVW.txt","w")
#for tweet in query_tweets("Venus Williams", 10, lang='EN'):
#	console.log(tweet)
#	print(tweet)
#	file.write(tweet.encode('utf-8'))

#file.close()