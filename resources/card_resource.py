from flask import request
from flask_restful import Resource
from model.models import Card
from schema.schemas import CardSchema

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