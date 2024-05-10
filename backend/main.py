from fastapi import FastAPI, Depends, HTTPException
from models import Base
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from schemas import PatientCreate, Patient, AppointmentCreate, Appointment
from models import Patient as PatientModel, Appointment as AppointmentModel
from fastapi.middleware.cors import CORSMiddleware
import stripe

stripe.api_key = "sk_test_51PDyeXSApJKw7IbTTljrbZzIXdhRyKoSN9lhq073zZKJaDTBSLsfisEZKAFpaTCMVUmWyfcWVyleVhzsG7lBQ1a0005ZbEQeix"
app = FastAPI()

# Adding CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

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

# Endpoint to list all patients
@app.get("/patients/", response_model=list[Patient])
async def list_patients(db: Session = Depends(get_db)):
    patients = db.query(PatientModel).all()
    return patients

# Endpoint to get a patient by ID
@app.get("/patients/{patient_name}", response_model=Patient)
async def read_patient(patient_name: str, db: Session = Depends(get_db)):
    db_patient = db.query(PatientModel).filter(PatientModel.name == patient_name).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

# Endpoint to create an appointment for a patient
@app.post("/patients/{patient_id}/appointments/", response_model=Appointment)
async def create_appointment_for_patient(
    patient_id: int, 
    appointment: AppointmentCreate, 
    db: Session = Depends(get_db)
):
    # Create the appointment in the database
    db_appointment = AppointmentModel(
        patient_id=patient_id,
        datetime=appointment.datetime
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)

    patient = db.query(PatientModel).get(patient_id)
    patient.has_appointment = True
    db.commit()
    
    # Generate payment link using Stripe API
    payment_intent = stripe.PaymentIntent.create(
        amount=1000,  # Specify the amount for the appointment
        currency="inr",
        description="Appointment Payment",
        payment_method_types=["card"],
    )
    payment_client_secret = payment_intent.client_secret
    print("xxxxx",payment_intent)
    
    return {
        "id": db_appointment.id,
        "patient_id": db_appointment.patient_id,
        "datetime": db_appointment.datetime,
        "payment_client_secret": payment_client_secret
    }