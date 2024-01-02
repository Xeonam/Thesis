from flask import request, jsonify
from flask_restful import Resource
from model.models import db, User, Card
from schema.schemas import UserSchema, WordSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


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
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        words = User.get_user_words(user_id=current_user_id)
        words = [{'card_id': user_card.Card.id, 'word': word_schema.dump(user_card.Word)} for user_card in words]

        return words

class GetDueCards(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        cards = User.get_due_cards(current_user_id)
        cards = [{'card_id': user_card.Card.id, 'word': word_schema.dump(user_card.Word)} for user_card in cards]

        return cards
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('pw')

        user = User.find_by_email(email)

        if user and user.verify_password(password):
            access_token = create_access_token(identity=user.user_id)
            return {'access_token': access_token}, 200
        else:
            return {'message': 'Invalid credentials'}, 401

