from flask import request
from flask_restful import Resource
from model.models import Deck, DeckCard, Card, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from schema.schemas import WordSchema

word_schema = WordSchema()
class CreateDeck(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        name = data.get("name")
        is_public = data.get("is_public")

        if not name:
            return {"message": "Deck name is required."}, 400

        deck = Deck.add_deck(name, user_id, is_public)
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
            deck_id = request.args.get("deck_id")
            print(deck_id)
            if not deck_id:
                return {"message": "Deck ID is required."}, 400

            current_user_id = get_jwt_identity()
            deck = Deck.query.filter_by(user_id=current_user_id, deck_id=deck_id).first()

            if not deck:
                return {"message": "Deck not found for this user."}, 404

            data = User.get_user_deck_words(current_user_id, deck_id)

            words = [{'card_id': user_card.Card.id, 'word': word_schema.dump(user_card.Word)} for user_card in data]

            return words, 200

        except Exception as e:
            return {"message": str(e)}, 500
        
class DeleteDeck(Resource):
    @jwt_required()
    def delete(self):
        try:
            deck_id = request.args.get("deck_id")

            if not deck_id:
                return {"message": "Deck ID is required."}, 400

            current_user_id = get_jwt_identity()
            deck = Deck.query.filter_by(user_id=current_user_id, deck_id=deck_id).first()

            if not deck:
                return {"message": "Deck not found for this user."}, 404

            Deck.delete_deck(deck_id)

            return {"message": "Deck deleted successfully!"}, 200

        except Exception as e:
            return {"message": str(e)}, 500

class GetPublicDecks(Resource):
    @jwt_required()
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            decks = Deck.get_public_decks(current_user_id)

            data = [{'deck_id': deck.deck_id, 'name': deck.name} for deck in decks]

            return data, 200

        except Exception as e:
            return {"message": str(e)}, 500
class CloneDeck(Resource):
    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            deck_id = data.get("deck_id")
            user_id = get_jwt_identity()
            Deck.clone_to_user(deck_id, user_id)

            return {"message": "Deck cloned successfully!"}, 200
        
        except Exception as e:
            return {"message": str(e)}, 500
        
class GetPublicDeckWords(Resource):
    @jwt_required()
    def get(self):
        try:
            deck_id = request.args.get("deck_id")

            if not deck_id:
                return {"message": "Deck ID is required."}, 400

            deck = Deck.get_deck(deck_id)

            if not deck:
                return {"message": "Deck not found."}, 404

            data = Deck.get_public_deck_words(deck_id)

            words = [{'card_id': card.Card.id, 'word': word_schema.dump(card.Word)} for card in data]

            return words, 200

        except Exception as e:
            return {"message": str(e)}, 500