import spacy
import json

def analyze_text_and_return_json(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    results = []

    for token in doc:
        word_info = {
            "word": token.text,
            "lemma": token.lemma_ if token.lemma_ != token.text else "",
            "part_of_speech": token.pos_,
        }
        results.append(word_info)

    return json.dumps(results, indent=4)
