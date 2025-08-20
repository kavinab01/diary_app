from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, Date, Text, TIMESTAMP, text

Base = declarative_base()

class DiaryNote(Base):
    __tablename__ = "diary_notes"

    id = Column(Integer, primary_key=True, index=True)
    note_date = Column(Date, nullable=False, index=True)
    note_text = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
