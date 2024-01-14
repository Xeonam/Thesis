from flask import request
from flask_restful import Resource
from model.models import Deck
from flask_jwt_extended import jwt_required, get_jwt_identity


class CreateDeck(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        name = data.get("name")

        if not name:
            return {"message": "Deck name is required."}, 400

        deck = Deck.add_deck(name, user_id)
        return {"message": "Deck created successfully!", "deck_id": deck.deck_id}, 201