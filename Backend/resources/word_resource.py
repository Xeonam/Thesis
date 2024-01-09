from flask import request
from flask_restful import Resource
from model.models import db, Word
from schema.schemas import WordSchema
from utils.translator import translate_to_hungarian
from flask_jwt_extended import jwt_required

word_schema = WordSchema()

class AddWord(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()

        english_word = data['english_word']

        if Word.exists(english_word):
            return {"message": "Word already exists."}, 400
        
        #hungarian_meaning = translate_to_hungarian(english_word)
        hungarian_meaning = "test"
        word = Word.add_word(english_word, hungarian_meaning)

        return word_schema.dump(word)

class GetWord(Resource):
    @jwt_required()
    def get(self, english_word: str):
        word = Word.get_word(english_word)
        return word_schema.dump(word)
