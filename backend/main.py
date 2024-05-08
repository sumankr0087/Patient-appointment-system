from fastapi import FastAPI, Depends, HTTPException
from models import Base
from database import engine,SessionLocal
from sqlalchemy.orm import Session

from schemas import PatientCreate, Patient
from models import Patient as PatientModel

Base.metadata.create_all(bind=engine)


# Initialize FastAPI app
app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to create a new patient
@app.post("/patients/", response_model=Patient)
async def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = PatientModel(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.get("/patients/", response_model=list[Patient])
async def list_patients(db: Session = Depends(get_db)):
    patients = db.query(PatientModel).all()
    return patients

# Endpoint to get a patient by ID
@app.get("/patients/{patient_id}", response_model=Patient)
async def read_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient
