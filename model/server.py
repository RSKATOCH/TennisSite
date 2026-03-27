import numpy as np
from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
app = Flask(__name__)
_modelFile = "tempmodel.joblib"
_columnsFile = "col.joblib"
# Load the model
print("Loading RF model")
model = load(_modelFile)
print("Loading Mapper")
mapper = load(_columnsFile)

def addMissingColumns(data) :
    for column in mapper :
        if column not in data.keys() :
            data[column] = 0
    return data

def prepareDataFromRequest(request):
    data = {}
    for key in request:
        data[key]=request[key]
    print(data)
    data = pd.get_dummies(pd.DataFrame.from_dict(data))
    print(data)
    return addMissingColumns(data)

@app.route('/predict',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = prepareDataFromRequest(request.get_json(force=True))
    # Make prediction using model loaded from disk as per the data.
    prediction = model.predict(data)
    print(prediction)
    # Take the first value of prediction
    return jsonify({"result":prediction[0]})

if __name__ == '__main__':
    app.run(host="127.0.0.1",port=5000)