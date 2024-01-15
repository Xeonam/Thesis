from flask import request
from flask_restful import Resource
from model.models import Deck, DeckCard, Card
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
    
class AddCardToDeck(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()

        deck_id = data.get("deck_id")
        card_id = data.get("card_id")

        if not deck_id or not card_id:
            return {"message": "Both deck_id and card_id are required in the request body."}, 400

        deck = Deck.get_deck(deck_id)

        if not deck:
            return {"message": "Deck not found."}, 404

        card = Card.get_card(card_id)

        if not card:
            return {"message": "Card not found."}, 404

        DeckCard.add_to_deck(deck_id, card_id)

        return {"message": "Card added to deck successfully!"}, 200

class GetDeckWords(Resource):
    @jwt_required()
    def get(self):
        try:
            data = request.get_json()
            deck_id = data.get("deck_id")

            if not deck_id:
                return {"message": "Deck ID is required."}, 400

            current_user_id = get_jwt_identity()
            deck = Deck.query.filter_by(user_id=current_user_id, deck_id=deck_id).first()

            if not deck:
                return {"message": "Deck not found for this user."}, 404

            words_data = [
                {
                    "word_id": word.word_id,
                    "english_word": word.english_word,
                    "hungarian_meaning": word.hungarian_meaning
                } for word in Deck.get_deck_words(deck_id)
            ]

            return {"words": words_data}, 200

        except Exception as e:
            return {"message": str(e)}, 500
