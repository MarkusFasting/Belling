import sqlite3

# Koble til Mixxx-databasen
conn = sqlite3.connect('/content/drive/MyDrive/SuperDJ_Project/mixxx_data/mixxxdb.sqlite')
cursor = conn.cursor()

# Hent relevant musikkdata fra databasen (BPM, artist, tittel, toneart)
cursor.execute("SELECT bpm, artist, title, key FROM track_locations")
tracks = cursor.fetchall()

# Skriv ut informasjonen om musikken
for track in tracks:
    bpm, artist, title, key = track
    print(f'Title: {title}, Artist: {artist}, BPM: {bpm}, Key: {key}')

conn.close()
