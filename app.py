from flask import Flask
from model.models import db
from instance.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/')
def index():
    return {'message': 'Hello, World!'}