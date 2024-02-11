from flask import request
from flask_restful import Resource
from model.models import Statistic, Deck
from schema.schemas import StatisticSchema
from flask_jwt_extended import jwt_required, get_jwt_identity

practice_session_schema = StatisticSchema()

class AddPracticeSession(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        deck_id = data['deck_id']
        practice_duration = data['practice_duration']
        practice_date = data['practice_date']

        deck_name = Deck.get_deck(deck_id).name

        practice_session = Statistic.add_session(user_id, deck_name, practice_duration, practice_date)

        return practice_session_schema.dump(practice_session)

class GetPracticeSessions(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        practice_sessions = Statistic.get_user_sessions(user_id)

        return practice_session_schema.dump(practice_sessions, many=True)