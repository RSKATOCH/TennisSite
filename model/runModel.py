import sys
import pandas as pd
import time
import numpy as np
from joblib import load
_modelFile = "updatedmodel.pkl"
_transformFile = "v.joblib"
print("Started loading")
model = load(_modelFile)
testdata = {'Round':['R128'],'Gender':['Male'],'Surface':['Grass'],'P1_ranking':[150],'P2_ranking':[890],
    'P1_h2h':[1],'P2_h2h':[0],'P1_total_losses':[75],'P1_surface_losses':[37],'P2_surface_losses':[20],'P2_total_losses':[451]
    ,'P1_surface_wins':[1290],'P1_total_wins':[2692],'P2_surface_wins':[5176],'P2_total_wins':[11272]}
testdata = pd.DataFrame(testdata,columns=['Round','Gender','Surface','P2_ranking','P1_ranking','P2_h2h','P1_h2h',
'P2_total_losses','P1_total_losses','P2_surface_losses','P1_surface_losses','P2_total_wins','P1_total_wins','P2_surface_wins','P1_surface_wins']).values[0]

print(testdata.shape)
v = load(_transformFile)
datastr = [testdata[0:2]]
dataint = [testdata[3:]]

Xstr = v.transform(datastr)
Xstr = np.asarray(Xstr)
print(Xstr)
Xint = dataint
print(Xstr.shape)
print(len(Xint))
X = np.concatenate((Xstr, Xint), axis=1)
print(X.shape)
print(X)
result = model.predict(X.reshape(1,-1))
print(result)
sys.stdout.flush()