# Importer nødvendige biblioteker
import re

# Les teksten fra filen
with open('dj_mixing_beginners.txt', 'r', encoding='utf-8') as file:
    text = file.read()

# Definer nøkkelbegreper og teknikker vi ser etter
keywords = ['beatmatching', 'crossfading', 'tempo', 'EQ', 'cue points', 'bpm', 'mixing']

# Trekke ut setninger som inneholder nøkkelbegreper
extracted_sentences = []
for keyword in keywords:
    sentences = re.findall(r"([^.]*?" + keyword + r"[^.]*\.)", text, re.IGNORECASE)
    extracted_sentences.extend(sentences)

# Lagre de relevante setningene til en ny fil
with open('dj_mixing_techniques.txt', 'w', encoding='utf-8') as file:
    for sentence in extracted_sentences:
        file.write(sentence + '\n')

print("Nøkkelsetningene er trukket ut og lagret i dj_mixing_techniques.txt")