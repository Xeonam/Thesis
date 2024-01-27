from model.models import db, DeckCard, Card, Word, Deck, User
from app import app

FAMILY = [
    ("family", "család"),
    ("mother", "anya"),
    ("father", "apa"),
    ("sister", "lánytestvér"),
    ("brother", "fiútestvér"),
    ("grandmother", "nagymama"),
    ("grandfather", "nagypapa"),
    ("daughter", "lánya"),
    ("son", "fia"),
    ("wife", "feleség"),
    ("husband", "férj"),
    ("parent", "szülő"),
    ("child", "gyermek"),
    ("cousin", "unokatestvér"),
    ("aunt", "nagynéni"),
    ("uncle", "nagybácsi"),
    ("niece", "unokahúg"),
    ("nephew", "unokaöccs"),
    ("grandchild", "unoka"),
    ("sibling", "testvér"),
    ("stepmother", "mostohaanya"),
    ("stepfather", "mostohaapa"),
    ("stepdaughter", "mostohalánya"),
    ("stepson", "mostohafia"),
    ("mother-in-law", "anyós"),
    ("father-in-law", "após"),
    ("daughter-in-law", "meny"),
    ("son-in-law", "vej"),
    ("half-sister", "féltestvér (lány)"),
    ("half-brother", "féltestvér (fiú)"),
    ("godmother", "keresztesanya"),
    ("godfather", "keresztesapa"),
    ("godson", "keresztgyermek (fiú)"),
    ("goddaughter", "keresztgyermek (lány)"),
    ("foster parents", "nevelőszülők"),
    ("foster child", "nevelt gyermek"),
    ("twin brother", "iker fiútestvér"),
    ("twin sister", "iker lánytestvér"),
    ("elder brother", "báty"),
    ("younger brother", "öcs"),
    ("elder sister", "nővér"),
    ("younger sister", "húg"),
    ("great-grandmother", "dédnagymama"),
    ("great-grandfather", "dédnagypapa"),
    ("relatives", "rokonok"),
    ("ancestor", "ős, előd"),
    ("descendant", "leszármazott"),
    ("single mother", "egyedülálló anya"),
    ("single father", "egyedülálló apa"),
    ("orphan", "árvagyermek")
]

EMOTIONS = [
    ("happy", "boldog"),
    ("sad", "szomorú"),
    ("angry", "mérges"),
    ("excited", "izgatott"),
    ("bored", "unalmas"),
    ("scared", "ijedt"),
    ("nervous", "ideges"),
    ("relaxed", "lazult"),
    ("surprised", "meglepett"),
    ("tired", "fáradt"),
    ("worried", "aggódó"),
    ("confident", "magabiztos"),
    ("curious", "kíváncsi"),
    ("frustrated", "frusztrált"),
    ("grateful", "hálás"),
    ("hopeful", "reménykedő"),
    ("jealous", "féltékeny"),
    ("lonely", "magányos"),
    ("proud", "büszke"),
    ("shy", "szégyenlős"),
    ("calm", "nyugodt"),
    ("disappointed", "csalódott"),
    ("embarrassed", "zavarban"),
    ("guilty", "bűnös"),
    ("amused", "szórakozott"),
    ("anxious", "aggódó"),
    ("delighted", "elragadtatott"),
    ("envious", "irigy"),
    ("impressed", "lenyűgözött"),
    ("overwhelmed", "elárasztott"),
    ("relieved", "megkönnyebbült"),
    ("stressed", "stresszes"),
    ("suspicious", "gyanakvó"),
    ("thrilled", "izgatott")
]


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
        
        add_deck_to_database("Family", FAMILY)
        add_deck_to_database("Emotions", EMOTIONS)

        db.session.commit()


if __name__ == '__main__':
    seed_database()