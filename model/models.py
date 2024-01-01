from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pw = db.Column(db.String(255), nullable=False)
    cards = db.relationship('Card', back_populates='user', lazy=True)