import os
import csv

# Angi mappen der musikkfilene ligger
music_folder = os.path.expanduser("~/Desktop/SuperDJ_Project/Ny 2024 HC musikk")

# Angi filbanen til CSV-filen som skal opprettes
csv_file = os.path.expanduser("~/Desktop/SuperDJ_Project/ai_super_dj/music_files.csv")

# Funksjon for å hente filinformasjon
def get_file_info(file_path):
    file_name = os.path.basename(file_path)
    file_size = os.path.getsize(file_path)
    file_type = os.path.splitext(file_path)[1][1:]  # Ekstension uten punktum
    return file_name, file_size, file_type

# Samle filinformasjon
file_data = []
for root, dirs, files in os.walk(music_folder):
    for file in files:
        file_path = os.path.join(root, file)
        file_data.append(get_file_info(file_path))

# Lagre dataene til en CSV-fil
with open(csv_file, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['File Name', 'Size (Bytes)', 'Type'])  # Header
    csvwriter.writerows(file_data)

print(f"Dataene er lagret i {csv_file}")