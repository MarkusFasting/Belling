import openai
import csv

# Sett opp API-nøkkelen din
openai.api_key = 'DIN_OPENAI_API_KEY'

# Les innholdet fra csv-filen
with open('dj_mixing_data.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        category, content = row
        prompt = f"Du er en AI DJ-trener. Lær om {category}. {content}"

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )

        print(f"AI-respons for {category}: {response.choices[0].text.strip()}")