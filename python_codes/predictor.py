from sklearn.ensemble import RandomForestClassifier
import numpy as np

# 16 RF classifiers, 1 for each compound
class Predictor:
    def __init__(self):
        self.models = []
        for i in range(16):
            self.models.append(RandomForestClassifier())

    def fit(self, X, y):
        for i in range(16):
            self.models[i].fit(X, y[:, i])

    def predict(self, X):
        y = np.zeros((X.shape[0], 16))
        for i in range(16):
            y[:, i] = self.models[i].predict(X)
        return y
