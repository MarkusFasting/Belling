import numpy as np
import librosa
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Funksjon for å laste og analysere en lydfil
def analyze_track(file_path):
    y, sr = librosa.load(file_path)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    mfcc = librosa.feature.mfcc(y=y, sr=sr)
    return tempo, mfcc

# Funksjon for å bygge en enkel AI-modell
def build_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(128, activation='relu', input_shape=input_shape),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(10, activation='softmax')  # Antall utganger kan justeres
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

# Funksjon for å trene AI-modellen
def train_model(X, y):
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    
    model = build_model((X_train.shape[1],))
    model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))
    
    return model, le

# Hovedfunksjon
if __name__ == "__main__":
    # Eksempel data for testing (du kan legge til flere sanger senere)
    file_paths = ["../music_library/your_song1.mp3", "../music_library/your_song2.mp3"]
    X = []
    y = []  # Dette bør være etiketter eller sjangere for sangene

    for file_path in file_paths:
        tempo, mfcc = analyze_track(file_path)
        X.append(np.mean(mfcc, axis=1))
        y.append("genre_or_label")  # Erstatt med riktig etikett eller sjanger
    
    X = np.array(X)
    model, label_encoder = train_model(X, y)

    # Lagre modellen
    model.save("ai_dj_model.h5")
    print("Modell er trent og lagret som 'ai_dj_model.h5'")