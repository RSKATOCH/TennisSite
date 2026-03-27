import pandas as pd
import sklearn
from sklearn.decomposition import PCA
import numpy as np
import joblib
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

data = pd.read_csv('winner.csv')
data['Surface'].fillna("Unknown",inplace=True)
oneh = pd.get_dummies(data)
labels = oneh.prediction
oneh = oneh.drop(['prediction'],axis=1)
#print(oneh,labels)
joblib.dump(oneh.columns,"col.joblib")
model = RandomForestClassifier(max_depth=4, max_features='auto', n_estimators=1000, random_state=0)
model.fit(oneh,labels)
joblib.dump(model,"tempmodel.joblib")
#model = joblib.load("tempmodel.joblib")
#print np.mean(cross_val_score(model, oneh, labels, cv=10))
