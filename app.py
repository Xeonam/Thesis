from flask import Flask
from model.models import db
from instance.config import Config
from flask_restful import Api
from resources.user_resource import AddUser, GetWords
from resources.word_resource import AddWord
from resources.card_resource import AddCard, RepeatCard, GetCard

app = Flask(__name__)
api = Api(app)

app.config.from_object(Config)
db.init_app(app)

api.add_resource(AddUser, '/add_user')
api.add_resource(AddWord, '/add_word')
api.add_resource(AddCard, '/add_card')
api.add_resource(RepeatCard, '/repeat_card/<int:card_id>')
api.add_resource(GetWords, '/get_words/<int:user_id>')
api.add_resource(GetCard, '/get_card/<int:card_id>')