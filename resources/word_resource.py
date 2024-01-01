from flask import request
from flask_restful import Resource
from model.models import db, Word
from schema.schemas import WordSchema

word_schema = WordSchema()

class AddWord(Resource):
    def post(self):
        data = request.get_json()

        english_word = data['english_word']
        hungarian_meaning = data["hungarian_meaning"]

        word = Word.add_word(english_word, hungarian_meaning)

        return word_schema.dump(word)
