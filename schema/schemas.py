from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String()
    email = fields.String()
    pw = fields.String()

class WordSchema(Schema):
    id = fields.Integer(dump_only=True)
    english_word = fields.String()
    hungarian_meaning = fields.String()

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