import numpy as np  # Assuming we'll use numpy for handling data
import joblib  # For loading the trained model


class CarPricePredictor:
    def __init__(self, model_path):
        self.model = joblib.load(model_path)  # Load our trained model

    def predict(self, input_data):
        # Preprocess the input
        preprocessed_input = self.preprocess_input(input_data)

        # Reshape the input as the model expects a 2D array
        preprocessed_input = np.array(preprocessed_input).reshape(1, -1)

        # Predict using the loaded model
        prediction = self.model.predict(preprocessed_input)[
            0
        ]  # Take the first prediction

        # Post-process the prediction
        post_processed_prediction = self.post_process_prediction(prediction)

        return post_processed_prediction

    def preprocess_input(self, user_input):
        # Define the order of features as in X_train and X_test
        feature_order = ["year", "mileage", "power", "combined_consumption"]

        # Extract relevant features from the input
        input_features = [user_input.get(feature, 0) for feature in feature_order]

        # Handle missing or incorrect values (e.g., empty strings, None)
        input_features = [
            0 if feature == "" or feature is None else feature
            for feature in input_features
        ]

        return input_features

    def post_process_prediction(self, prediction):
        # TODO: Implement any postprocessing needed for the prediction
        # For now, let's assume no postprocessing is needed
        return prediction
