from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app import crud, models, schemas

app = FastAPI(title="Diary API", openapi_url="/api/openapi.json")

# CORS: allow frontend through ingress (any origin in dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/notes", response_model=list[schemas.Note])
def list_notes(date: date, db: Session = Depends(get_db)):
    # Return notes for the given date
    return crud.get_notes_by_date(db, date)

@app.post("/api/notes", response_model=schemas.Note, status_code=201)
def add_note(payload: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db, payload)

@app.delete("/api/notes/{note_id}", status_code=204)
def remove_note(note_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_note(db, note_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Note not found")
