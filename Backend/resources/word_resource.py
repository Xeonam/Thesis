from flask import request
from flask_restful import Resource
from model.models import db, Word, Card, DeckCard
from schema.schemas import WordSchema
from utils.translator import translate_to_hungarian
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.text_analyzer import analyze_text_and_return_json
from werkzeug.utils import secure_filename

word_schema = WordSchema()

class AddWord(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()

        english_word = data['english_word']

        if Word.exists(english_word):
            word = Word.get_word(english_word)
            return word_schema.dump(word)
            #return {"message": "Word already exists."}, 200
        
        #hungarian_meaning = translate_to_hungarian(english_word)
        hungarian_meaning = "test"
        word = Word.add_word(english_word, hungarian_meaning)

        return word_schema.dump(word)

class AddCustomWord(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        english_word = data['english_word']
        hungarian_meaning = data['hungarian_meaning']

        word = Word.add_word(english_word, hungarian_meaning, custom_meaning=True)

        return word_schema.dump(word)

class GetWord(Resource):
    @jwt_required()
    def get(self, english_word: str):
        word = Word.get_word(english_word)
        return word_schema.dump(word)

class FileUpload(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        if 'file' not in request.files:
            return {'message': 'No file part'}, 400
        print(request.form)
        deck_id = request.form.get('deck_id')
        file = request.files['file']

        if not file.filename.endswith('.txt'):
            return {'message': 'File is not a .txt file'}, 400

        file_content = file.read().decode('utf-8')
        words = file_content.splitlines()
        hungarian_meanings = [translate_to_hungarian(word) for word in words if word]

        for word, hungarian_meaning in zip(words, hungarian_meanings):
            if not Word.exists(word):
                word_obj = Word.add_word(word, hungarian_meaning)
            else:
                word_obj = Word.get_word(word)

            word_id = word_obj.word_id
            if not Card.exists(user_id, word_id):
                card = Card.add_card(user_id, word_id)
                DeckCard.add_to_deck(deck_id, card.id)
            
        return {'message': f'File {file.filename} uploaded successfully'}, 200
    
class GetTextAnalysis(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        text = data['text']
        return analyze_text_and_return_json(text)

