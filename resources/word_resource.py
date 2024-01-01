from flask import request
from flask_restful import Resource
from model.models import db, Word
from schema.schemas import WordSchema
from utils.translator import translate_to_hungarian

word_schema = WordSchema()

class AddWord(Resource):
    def post(self):
        data = request.get_json()

        english_word = data['english_word']

        if Word.exists(english_word):
            return {"message": "Word already exists."}, 400
        
        hungarian_meaning = translate_to_hungarian(english_word)
        word = Word.add_word(english_word, hungarian_meaning)

        return word_schema.dump(word)
