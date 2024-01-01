from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.String()
    email = fields.String()
    pw = fields.String()

class WordSchema(Schema):
    id = fields.Int(dump_only=True)
    english_word = fields.String()
    hungarian_meaning = fields.String()

class CardSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int()
    word_id = fields.Int()
    due = fields.DateTime()
    stability = fields.Float()
    difficulty = fields.Float()
    elapsed_days = fields.Int()
    scheduled_days = fields.Int()
    reps = fields.Int()
    lapses = fields.Int()
    state = fields.Int()
    last_review = fields.DateTime()