import requests
from bs4 import BeautifulSoup
from transformers import pipeline

def extract_text_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.get_text()

def extract_key_sentences(text):
    summarizer = pipeline("summarization")
    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
    return summary[0]['summary_text']

def save_key_sentences(key_sentences, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(key_sentences)

if __name__ == "__main__":
    # URL-en til den første artikkelen
    url = "https://dj.studio/blog/dj-mixing-beginners"
    
    # Hentet og analyserer teksten
    text = extract_text_from_url(url)
    key_sentences = extract_key_sentences(text)
    
    # Lagre resultatet i en egen fil
    save_key_sentences(key_sentences, "dj_mixing_beginners_analysis.txt")
    
    print("Teksten er hentet og lagret i dj_mixing_beginners_analysis.txt")