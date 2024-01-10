from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from fsrs import FSRS, Rating
from argon2 import PasswordHasher, exceptions
from flask_jwt_extended import get_jwt_identity
from flask_restful import abort


db = SQLAlchemy()
ph = PasswordHasher()
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pw = db.Column(db.String(255), nullable=False)
    cards = db.relationship('Card', back_populates='user', lazy=True)

    @classmethod
    def add_user(cls, username: str, email: str, pw: str):
        hashed_pw = ph.hash(pw)
        user = cls(username=username, email=email, pw=hashed_pw)
        db.session.add(user)
        db.session.commit()
        return user
    
    @classmethod
    def find_by_email(cls, email: str):
        return cls.query.filter_by(email=email).first()
    
    def verify_password(self, password) -> bool:
        try:
            return ph.verify(self.pw, password)
        except exceptions.VerifyMismatchError:
            return False
   

    @classmethod
    def get_user_words(cls, user_id: int):
        user_cards = (
            db.session.query(User, Card, Word)
            .join(Card, User.user_id == Card.user_id)
            .join(Word, Card.word_id == Word.word_id)
            .filter(User.user_id == user_id)
            .all()
        )
        return user_cards
    
    #a function that return the user's cards where the due date is less than the current date
    @classmethod
    def get_due_cards(cls, user_id: int):
        user_cards = (
            db.session.query(User, Card, Word)
            .join(Card, User.user_id == Card.user_id)
            .join(Word, Card.word_id == Word.word_id)
            .filter(User.user_id == user_id)
            .filter(Card.due < datetime.utcnow())
            .all()
        )
        return user_cards


class Word(db.Model):
    word_id = db.Column(db.Integer, primary_key=True)
    english_word = db.Column(db.String(255), nullable=False)
    hungarian_meaning = db.Column(db.String(255), nullable=False)
    cards = db.relationship('Card', back_populates='word', lazy=True)

    @classmethod
    def exists(cls, english_word) -> bool:
        return cls.query.filter_by(english_word=english_word).first() is not None

    @classmethod
    def add_word(cls, english_word: str, hungarian_meaning: str) -> "Word":
        word = cls(english_word=english_word, hungarian_meaning=hungarian_meaning)
        db.session.add(word)
        db.session.commit()
        return word

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    word_id = db.Column(db.Integer, db.ForeignKey('word.word_id'), nullable=False)
    due = db.Column(db.DateTime, default=datetime.utcnow)
    stability = db.Column(db.Float, default=0)
    difficulty = db.Column(db.Float, default=0)
    elapsed_days = db.Column(db.Integer, default=0)
    scheduled_days = db.Column(db.Integer, default=0)
    reps = db.Column(db.Integer, default=0)
    lapses = db.Column(db.Integer, default=0)
    state = db.Column(db.Integer, default=0)
    last_review = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='cards')
    word = db.relationship('Word', back_populates='cards')


    def do_repeat(self, user_rating: Rating) -> None:
        now = datetime.utcnow()
        scheduling_card = FSRS().repeat(self, now)

        scheduling_card_user_rating = scheduling_card[user_rating].card

        self.last_review = now
        self.due = scheduling_card_user_rating.due
        self.stability = scheduling_card_user_rating.stability
        self.difficulty = scheduling_card_user_rating.difficulty
        self.elapsed_days = scheduling_card_user_rating.elapsed_days
        self.scheduled_days = scheduling_card_user_rating.scheduled_days
        self.reps = scheduling_card_user_rating.reps
        self.lapses = scheduling_card_user_rating.lapses
        self.state = scheduling_card_user_rating.state
        self.last_review = scheduling_card_user_rating.last_review
    
    #a function that invokes the do_repeat function and commits the changes to the database
    @classmethod
    def repeat(self, card_id, user_rating: Rating) -> None:
        card = self.get_card(card_id)
        card.do_repeat(Rating(user_rating))
        db.session.commit()
        return card


    @classmethod
    def exists(self, user_id, word_id) -> bool:
        return self.query.filter_by(user_id=user_id, word_id=word_id).first() is not None

    @classmethod
    def add_card(cls, user_id: int, word_id: int) -> "Card":
        card = cls(user_id=user_id, word_id=word_id)
        db.session.add(card)
        db.session.commit()
        return card
    
    @classmethod
    def get_card(cls, card_id: int):
        return cls.query.filter_by(id=card_id).first()
    
    @classmethod
    def verify_card_ownership(cls, card_id):
        current_user_id = get_jwt_identity()
        card = Card.get_card(card_id)
        if not card:
            abort(404, message="Card not found.")
        if card.user_id != current_user_id:
            abort(403, message="Not your card.")
        return card
