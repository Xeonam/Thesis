from flask import request
from flask_restful import Resource
from model.models import Card, DeckCard
from schema.schemas import CardSchema
from fsrs import Rating
from flask_jwt_extended import jwt_required, get_jwt_identity

card_schema = CardSchema()

class AddCard(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()

        user_id = get_jwt_identity()
        word_id = data["word_id"]

        if Card.exists(user_id, word_id):
            return {"message": "This word is already connected to your profile."}, 409

        card = Card.add_card(user_id, word_id)

        return card_schema.dump(card)

class RepeatCard(Resource):
    @jwt_required()
    def post(self, card_id: int):
        Card.verify_card_ownership(card_id)
        data = request.get_json()
        user_rating = data['rating']

        updated_card = Card.repeat(card_id, Rating(user_rating))

        return card_schema.dump(updated_card)
    
class GetCard(Resource):
    @jwt_required()
    def get(self, card_id: int):
        card = Card.verify_card_ownership(card_id)
        #card = Card.get_card(card_id)
        return card_schema.dump(card)
    
