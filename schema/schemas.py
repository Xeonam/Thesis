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
