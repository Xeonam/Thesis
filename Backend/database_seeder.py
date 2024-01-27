from model.models import db, DeckCard, Card, Word, Deck, User
from app import app


def add_deck_to_database(deck_name: str, cards: [(str, str)]):
    deck = Deck.add_deck(deck_name)
    for english, hungarian in cards:
        word = Word.add_word(english_word=english, hungarian_meaning=hungarian)
        card = Card.add_card(word.word_id)
        DeckCard.add_to_deck(deck_id=deck.deck_id, card_id=card.id)
    return deck

def seed_database():
    with app.app_context():
        db.session.query(DeckCard).delete()
        db.session.query(Card).delete()
        db.session.query(Word).delete()
        db.session.query(Deck).delete()
        db.session.query(User).delete()
        db.session.commit()
        
        db.session.commit()


if __name__ == '__main__':
    seed_database()