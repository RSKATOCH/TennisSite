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


from twitterscraper import query_tweets


# All tweets matching either Trump or Clinton will be returned. You will get at
# least 10 results within the minimal possible time/number of requests
#for tweet in query_tweets("Roger Federer", 10)[:10]:
#    print(tweet.user.encode('utf-8'))

#Or save the retrieved tweets to file:
file = open("test1.txt","w")
for tweet in query_tweets("Venus Williams", 10, lang='EN'):
	console.log(tweet)
	print(tweet)

file.close()