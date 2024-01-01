from flask import request
from flask_restful import Resource
from model.models import db, User
from schema.schemas import UserSchema

user_schema = UserSchema()

class AddUser(Resource):
    def post(self):
        data = request.get_json()

        username = data['username']
        email = data["email"]
        pw = data["pw"]

        user = User.add_user(username, email, pw)

        return user_schema.dump(user)
    