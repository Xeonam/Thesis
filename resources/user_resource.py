from flask import request, jsonify
from flask_restful import Resource
from model.models import db, User, Card
from schema.schemas import UserSchema, WordSchema, CardSchema


user_schema = UserSchema()
word_schema = WordSchema()
WordSchema(many=True)
class AddUser(Resource):
    def post(self):
        data = request.get_json()

        username = data['username']
        email = data["email"]
        pw = data["pw"]

        user = User.add_user(username, email, pw)

        return user_schema.dump(user)

class GetWords(Resource):
    def get(self, user_id: int):
        words = User.get_user_words(user_id=user_id)
        words = [{'card_id': user_card.Card.id, 'word': word_schema.dump(user_card.Word)} for user_card in words]

        return words

class GetDueCards(Resource):
    def get(self, user_id: int):
        cards = User.get_due_cards(user_id=user_id)
        cards = [{'card_id': user_card.Card.id, 'word': word_schema.dump(user_card.Word)} for user_card in cards]

        return cards
