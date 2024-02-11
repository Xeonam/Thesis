from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String()
    email = fields.String()

class WordSchema(Schema):
    word_id = fields.Integer(dump_only=True)
    english_word = fields.String()
    hungarian_meaning = fields.String()
    custom_meaning = fields.Boolean()

class CardSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer()
    word_id = fields.Integer()
    due = fields.DateTime()
    stability = fields.Float()
    difficulty = fields.Float()
    elapsed_days = fields.Integer()
    scheduled_days = fields.Integer()
    reps = fields.Integer()
    lapses = fields.Integer()
    state = fields.Integer()
    last_review = fields.DateTime()

class DeckSchema(Schema):
    deck_id = fields.Integer(dump_only=True)
    name = fields.String()
    user_id = fields.Integer()

class StatisticSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer()
    deck_name = fields.String()
    practice_duration = fields.Integer()
    practice_date = fields.DateTime()
