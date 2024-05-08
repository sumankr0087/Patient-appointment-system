from pydantic import BaseModel
from datetime import datetime

# Schema for creating a new patient
class PatientCreate(BaseModel):
    name: str
    email: str
    phone: int
    age: int
    gender: str
    address: str

# Schema for returning patient data
class Patient(BaseModel):
    id: int
    name: str
    email: str
    phone: int
    age: int
    gender: str
    address: str

# Schema for creating a new appointment
class AppointmentCreate(BaseModel):
    patient_id: int
    datetime: datetime

# Schema for returning appointment data
class Appointment(BaseModel):
    id: int
    patient_id: int
    datetime: datetime
