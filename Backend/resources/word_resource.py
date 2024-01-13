from flask import request
from flask_restful import Resource
from model.models import db, Word, Card
from schema.schemas import WordSchema
from utils.translator import translate_to_hungarian
from flask_jwt_extended import jwt_required, get_jwt_identity
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

        file = request.files['file']

        if file.filename == '':
            return {'message': 'No file selected for uploading'}, 400

        
        filename = secure_filename(file.filename)
        file_content = file.read().decode('utf-8')
        print(file_content)

        #get the list of words
        words = file_content.split("\n")
        #cut the "/r" from the end of the words
        words = [word[:-1] for word in words if word != ""]
        print(words)

        # now translate the words one by one
        hungarian_meanings = []
        for word in words:
            hungarian_meanings.append(translate_to_hungarian(word))
        
        for i in range(len(words)):
            word = Word.add_word(words[i], hungarian_meanings[i])
            word_id = word.word_id 
            if not Card.exists(user_id, word_id):
                Card.add_card(user_id, word_id)

        return {'message': f'File {filename} uploaded successfully'}, 200