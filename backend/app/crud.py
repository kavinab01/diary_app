from sqlalchemy.orm import Session
from datetime import date
from . import models, schemas

def get_notes_by_date(db: Session, d: date):
    return (
        db.query(models.DiaryNote)
        .filter(models.DiaryNote.note_date == d)
        .order_by(models.DiaryNote.id.desc())
        .all()
    )

def create_note(db: Session, note: schemas.NoteCreate):
    db_note = models.DiaryNote(note_date=note.note_date, note_text=note.note_text)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def delete_note(db: Session, note_id: int):
    obj = db.query(models.DiaryNote).get(note_id)
    if obj:
        db.delete(obj)
        db.commit()
        return True
    return False
