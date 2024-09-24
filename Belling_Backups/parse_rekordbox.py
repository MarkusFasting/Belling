import xml.etree.ElementTree as ET
import csv

def parse_rekordbox_xml(file_path):
    # Lese XML-filen
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Lagre alle sporene i en liste
    tracks = []

    for track in root.findall('COLLECTION/TRACK'):
        track_info = {
            'TrackID': track.get('TrackID'),
            'Name': track.get('Name'),
            'Artist': track.get('Artist'),
            'Genre': track.get('Genre'),
            'Size': track.get('Size'),
            'TotalTime': track.get('TotalTime'),
            'Location': track.get('Location'),
            'AverageBpm': track.get('AverageBpm'),
            'DateAdded': track.get('DateAdded'),
            'BitRate': track.get('BitRate'),
            'SampleRate': track.get('SampleRate'),
        }
        tracks.append(track_info)

    return tracks

def save_to_csv(tracks, output_file):
    # Lagre data til en CSV-fil
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['TrackID', 'Name', 'Artist', 'Genre', 'Size', 'TotalTime', 'Location', 'AverageBpm', 'DateAdded', 'BitRate', 'SampleRate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for track in tracks:
            writer.writerow(track)

if __name__ == "__main__":
    file_path = '/Users/markus/Desktop/SuperDJ_Project/collection.xml'  # Oppdatert filbane
    output_file = '/Users/markus/Desktop/SuperDJ_Project/ai_super_dj/rekordbox_tracks.csv'  # Lagre CSV-filen her

    tracks = parse_rekordbox_xml(file_path)
    save_to_csv(tracks, output_file)
    print(f"Dataene er lagret i {output_file}")