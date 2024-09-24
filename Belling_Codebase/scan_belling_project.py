import os

# Sti til din Belling_Project-mappe
base_folder = '/content/drive/My Drive/SuperDJ_Project/Belling_Project'

# Funksjon for å skanne mapper og returnere strukturen
def scan_folder(folder_path):
    folder_structure = []
    for root, dirs, files in os.walk(folder_path):
        level = root.replace(folder_path, '').count(os.sep)
        indent = ' ' * 2 * level
        folder_structure.append(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for f in files:
            folder_structure.append(f'{subindent}{f}')
    return folder_structure

# Funksjon for å skrive mappestrukturen til en fil
def save_structure_to_file(folder_structure, output_file):
    with open(output_file, 'w') as f:
        for line in folder_structure:
            f.write(f'{line}\n')

# Skann mappestrukturen
project_structure = scan_folder(base_folder)

# Lagre til en fil i Google Drive
output_file_path = os.path.join(base_folder, 'belling_project_structure.txt')
save_structure_to_file(project_structure, output_file_path)

print(f"Mappestrukturen er lagret til {output_file_path}")