from flask import Flask
from model.models import db
from instance.config import Config
from flask_restful import Api
from resources.user_resource import AddUser, GetWords, GetDueCards, Login, GetDecks
from resources.word_resource import AddWord, GetWord, FileUpload
from resources.card_resource import AddCard, RepeatCard, GetCard
from resources.deck_resource import CreateDeck, AddCardToDeck, GetDeckWords
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)
cors = CORS(app, origins=["http://localhost:5000"])

app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)

api.add_resource(AddUser, '/add-user')
api.add_resource(AddWord, '/add-word')
api.add_resource(AddCard, '/add-card')
api.add_resource(RepeatCard, '/repeat-card/<int:card_id>')
api.add_resource(GetWords, '/get-words')
api.add_resource(GetCard, '/get-card/<int:card_id>')
api.add_resource(GetDueCards, '/get-due-cards')
api.add_resource(Login, '/login')
api.add_resource(GetWord, '/get-word/<string:english_word>')
api.add_resource(FileUpload, '/upload-file')
api.add_resource(CreateDeck, '/create-deck')
api.add_resource(GetDecks, '/get-decks')
api.add_resource(AddCardToDeck, '/add-card-to-deck')
api.add_resource(GetDeckWords, '/get-deck-words')