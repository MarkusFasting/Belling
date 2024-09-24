import os
import librosa
import numpy as np
import matplotlib.pyplot as plt
import librosa.display

# Funksjon for å beregne energinivåer
def calculate_energy(y, sr, frame_size=2048, hop_length=512):
    rmse = librosa.feature.rms(y=y, frame_length=frame_size, hop_length=hop_length)[0]
    times = librosa.times_like(rmse, sr=sr, hop_length=hop_length)
    return rmse, times

# Funksjon for harmonisk analyse (Chroma)
def harmonic_analysis(y, sr, hop_length=512):
    chroma = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=hop_length)
    return chroma

# Funksjon for frekvensanalyse (STFT)
def frequency_analysis(y, sr, hop_length=512):
    stft = np.abs(librosa.stft(y, hop_length=hop_length))
    db = librosa.amplitude_to_db(stft, ref=np.max)
    return db

# Funksjon for å analysere BPM
def analyze_bpm(y, sr):
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    return tempo if isinstance(tempo, float) else tempo[0]

# Funksjon for å analysere toneart (Key) og Camelot Key
def analyze_key(y, sr):
    chroma_cqt = librosa.feature.chroma_cqt(y=y, sr=sr)
    key_index = np.argmax(chroma_cqt.mean(axis=1))
    keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    key = keys[key_index]
    return key

def get_camelot_key(key):
    camelot_keys = {
        'C': '8B', 'C#': '3B', 'D': '10B', 'D#': '5B', 'E': '12B', 'F': '7B',
        'F#': '2B', 'G': '9B', 'G#': '4B', 'A': '11B', 'A#': '6B', 'B': '1B',
        'Cm': '8A', 'C#m': '3A', 'Dm': '10A', 'D#m': '5A', 'Em': '12A', 'Fm': '7A',
        'F#m': '2A', 'Gm': '9A', 'G#m': '4A', 'Am': '11A', 'A#m': '6A', 'Bm': '1A'
    }
    return camelot_keys.get(key, "Unknown")

# Funksjon for å lese sjangerdata fra Drive
def load_genre_data_from_drive(genre_file_path):
    genre_rules = {}
    with open(genre_file_path, 'r') as file:
        for line in file:
            genre, bpm_range = line.strip().split(':')
            bpm_range = tuple(map(int, bpm_range.split('-')))
            genre_rules[genre] = bpm_range
    return genre_rules

# Funksjon for å gjenkjenne sjanger basert på BPM og seksjoner
def detect_genre(bpm, sections, genre_rules):
    for genre, bpm_range in genre_rules.items():
        if bpm_range[0] <= bpm <= bpm_range[1]:
            return genre
    return 'unknown'

# Funksjon for å gjenkjenne seksjoner basert på energinivå, frekvens og harmoni
def detect_sections_with_analysis(onset_env, rmse, chroma, stft_db, sr, merge_distance=15.0):
    sections = []
    last_time = 0
    
    # Definer terskler for seksjonsdeteksjon basert på energi, frekvens og harmoni
    intro_threshold = np.percentile(rmse, 10)
    build_up_threshold = np.percentile(rmse, 35)
    drop_threshold = np.percentile(rmse, 85)
    chorus_threshold = np.percentile(rmse, 75)
    breakdown_threshold = np.percentile(rmse, 25)
    takeoff_threshold = np.percentile(rmse, 90)
    outro_threshold = np.percentile(rmse, 10)
    
    section_times = []
    
    onset_times = librosa.frames_to_time(np.arange(len(onset_env)), sr=sr)
    for i, energy in enumerate(rmse):
        time = onset_times[i]
        
        if time - last_time < merge_distance:
            continue
        
        if energy > takeoff_threshold and np.mean(chroma[:, i]) > 0.6:
            section_times.append(("Take-off", time))
        elif energy > drop_threshold and np.mean(chroma[:, i]) > 0.6:
            section_times.append(("Drop", time))
        elif energy > chorus_threshold and np.mean(chroma[:, i]) > 0.5:
            section_times.append(("Chorus", time))
        elif energy > build_up_threshold and np.mean(chroma[:, i]) < 0.5:
            section_times.append(("Build-up", time))
        elif energy < outro_threshold and i > len(rmse) * 0.9:
            section_times.append(("Outro", time))
        elif energy < intro_threshold and i < len(rmse) * 0.1:
            section_times.append(("Intro", time))
        elif energy < breakdown_threshold:
            section_times.append(("Breakdown", time))
        else:
            section_times.append(("Verse", time))
        
        last_time = time
    
    return section_times

# Filsti til lydfilen
audio_file_path = '/content/drive/My Drive/SuperDJ_Project/music_library/18420294_Got That Booty_(Extended Mix).mp3'

# Last inn lydfilen
y, sr = librosa.load(audio_file_path)

# 1. Varighet i sekunder
duration = librosa.get_duration(y=y, sr=sr)
print(f"Varighet: {int(duration // 60):02d}:{int(duration % 60):02d}.{int((duration % 1) * 1000):03d}")

# 2. Beregn energi
rmse, times = calculate_energy(y, sr)
print(f"Analysert energinivåer i musikken")

# 3. Harmonisk analyse (Chroma)
chroma = harmonic_analysis(y, sr)

# 4. Frekvensanalyse (STFT)
stft_db = frequency_analysis(y, sr)

# 5. Onsets
onset_env = librosa.onset.onset_strength(y=y, sr=sr)
sections = detect_sections_with_analysis(onset_env, rmse, chroma, stft_db, sr)

# 6. BPM-analyse
bpm_value = analyze_bpm(y, sr)
print(f"BPM (Tempo): {int(bpm_value)}")

# 7. Toneart og Camelot Key-analyse
key = analyze_key(y, sr)
camelot_key = get_camelot_key(key)
print(f"Toneart (Key): {key}")
print(f"Camelot Key: {camelot_key}")

# 8. Last sjangerdata fra Drive
genre_file_path = '/content/drive/My Drive/SuperDJ_Project/collected_files/everynoise_genres.txt'
genre_rules = load_genre_data_from_drive(genre_file_path)

# 9. Identifiser sjanger basert på BPM og seksjoner
section_names = [s[0] for s in sections]
detected_genre = detect_genre(bpm_value, section_names, genre_rules)
print(f"Oppdaget sjanger: {detected_genre}")

# 10. Seksjonsanalyse
print("\nSeksjoner i rekkefølge:")
for section, time in sections:
    print(f"{section} starter ved {time:.2f} sekunder")

# 11. Plot resultatene
plt.figure(figsize=(12, 8))

plt.subplot(4, 1, 1)
librosa.display.waveshow(y, sr=sr, alpha=0.5)
plt.title('Waveform')
plt.ylabel('Amplitude')
plt.xlabel('Time (s)')

plt.subplot(4, 1, 2)
plt.plot(times, rmse, label='Energy (RMSE)', color='b')
plt.vlines(librosa.frames_to_time(np.arange(len(onset_env)), sr=sr), 0, np.max(rmse), color='r', alpha=0.8, linestyle='--', label='Onsets')
plt.title('Energy and Onsets')
plt.ylabel('Energy')
plt.xlabel('Time (s)')
plt.legend()

plt.subplot(4, 1, 3)
librosa.display.specshow(chroma, y_axis='chroma', x_axis='time', sr=sr)
plt.title('Chromagram')
plt.colorbar()

plt.subplot(4, 1, 4)
librosa.display.specshow(stft_db, sr=sr, hop_length=512, x_axis='time', y_axis='log')
plt.title('STFT (Frekvensspekter)')
plt.colorbar(format='%+2.0f dB')

plt.tight_layout()
plt.show()