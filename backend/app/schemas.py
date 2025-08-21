from pydantic import BaseModel
from datetime import date

class NoteBase(BaseModel):
    note_date: date

class NoteCreate(NoteBase):
    note_text: str

class Note(NoteBase):
    id: int
    note_text: str
    created_at: datetime   

    class Config:
        from_attributes = True
