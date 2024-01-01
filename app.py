from flask import Flask
from model.models import db
from instance.config import Config
from flask_restful import Api
from resources.user_resource import AddUser

app = Flask(__name__)
api = Api(app)

app.config.from_object(Config)
db.init_app(app)

api.add_resource(AddUser, '/add_user')