from flask import request
from flask_restful import Resource
from model.models import Card
from schema.schemas import CardSchema
from fsrs import Rating

card_schema = CardSchema()

class AddCard(Resource):
    def post(self):
        data = request.get_json()

        user_id = data['user_id']
        word_id = data["word_id"]

        if Card.exists(user_id, word_id):
            return {"message": "Already connected."}, 400

        card = Card.add_card(user_id, word_id)

        return card_schema.dump(card)

class RepeatCard(Resource):
    def post(self, card_id: int):
        data = request.get_json()
        user_rating = data['rating']

        card = Card.repeat(card_id, Rating(user_rating))

        return card_schema.dump(card)
    
class GetCard(Resource):
    def get(self, card_id: int):
        card = Card.get_card(card_id)
        return card_schema.dump(card)