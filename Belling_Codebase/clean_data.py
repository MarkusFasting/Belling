import pandas as pd

# Laste inn data fra CSV-filen
file_path = '/Users/markus/Desktop/SuperDJ_Project/ai_super_dj/rekordbox_tracks.csv'
df = pd.read_csv(file_path)

# Fjerne dubletter basert på TrackID eller filplassering (eller annen kolonne som er unik)
df.drop_duplicates(subset=['TrackID'], inplace=True)

# Fylle inn manglende sjanger med "Unknown" eller en annen default verdi
df['Genre'].fillna('Unknown', inplace=True)

# Fjerne rader med manglende eller null i viktige kolonner (f.eks. navn eller filplassering)
df.dropna(subset=['Name', 'Location'], inplace=True)

# Konverter sjanger til konsistent formatering (f.eks. alle sjangere i små bokstaver)
df['Genre'] = df['Genre'].str.lower()

# Sjekk for uvanlige BPM-verdier og sett en realistisk verdi (for eksempel mellom 60 og 200 BPM)
df['AverageBpm'] = df['AverageBpm'].apply(lambda x: x if 60 <= x <= 200 else None)
df.dropna(subset=['AverageBpm'], inplace=True)

# Lagre den rensede CSV-filen
cleaned_file_path = '/Users/markus/Desktop/SuperDJ_Project/ai_super_dj/cleaned_rekordbox_tracks.csv'
df.to_csv(cleaned_file_path, index=False)

print(f"Dataene er renset og lagret i {cleaned_file_path}")