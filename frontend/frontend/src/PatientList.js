import React, { useEffect, useState } from 'react';
import AppointmentModal from './components/AppointmentModal';
import PatientDetailsModal from './components/PatientDetailsModal';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentDateTime, setAppointmentDateTime] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPatientDetails, setmodalPatientDetails] = useState(false);
    const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchPatientList = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/patients/', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch patient list');
            }
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patient list:', error);
        }
    };

    const fetchPatientDetails = async (name) => {
        try {
            if (name) {
                const response = await fetch(`http://127.0.0.1:8000/patients/${name}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch patient details');
            }
            const data = await response.json();
            setSelectedPatientDetails(data);
            setmodalPatientDetails(true);
            }
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    useEffect(() => {
        fetchPatientList();
    }, []);

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleClear = () => {
        setSearchName('');
        setSearchResults([]);
        fetchPatientList();
    };

    const handleSearchSubmit = async () => {
        if (searchName.trim() !== '') {
            try {
                const response = await fetch(`http://127.0.0.1:8000/patients/${searchName}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSearchResults([data]);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handlePatientClick = (patient) => {
        fetchPatientDetails(patient.name);
    };

    const handleAppointmentClick = (patient) => {
        setSelectedPatient(patient);
        setModalOpen(true);
    };

    const handleAppointmentSuccess = () => {
        window.location.reload();
        setModalOpen(false);
    };

    const handleAppointmentSubmit = async () => {
        const appointmentData = {
            patient_id: selectedPatient.id,
            datetime: appointmentDateTime,
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/patients/${selectedPatient.id}/appointments/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
            handleAppointmentSuccess();
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold mb-4 mt-2">Patient List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={searchName}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <button onClick={handleSearchSubmit} className="px-4 ml-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Search</button>
                <button onClick={handleClear} className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-blue-600">Clear</button>
            </div>
            <div>
                <div className='grid grid-cols-4 border-b border-gray-200'>
                    <div className='col-span-3'>
                        <div className='grid grid-cols-3'>
                            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</div>
                            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</div>
                            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</div>
                        </div>
                    </div>
                    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</div>
                </div>
            </div>
            <div>
                {(searchName.trim() !== '' && searchResults.length > 0 ? searchResults : patients).map(patient => (
                    <div key={patient.id} className='grid grid-cols-4 border-b border-gray-200 hover:bg-gray-200 cursor-pointer'>
                        <div className='col-span-3'>
                            <div className='grid grid-cols-3' onClick={() => handlePatientClick(patient)}>
                                <div className="px-6 py-4 text-sm">{patient.name}</div>
                                <div className="px-6 py-4 text-sm">{patient.email}</div>
                                <div className="px-6 py-4 text-sm">{patient.phone}</div>
                            </div>
                        </div>
                        <div className="px-6 py-4 text-sm">
                            {patient.has_appointment ? (
                                <div className='text-sm text-red-600'>Booked</div>
                            ) : (
                                <button className='border border-green-500 bg-green-500 rounded text-white px-2 py-2' onClick={() => handleAppointmentClick(patient)}>Appointment</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <AppointmentModal
                selectedPatient={selectedPatient}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setAppointmentDateTime={setAppointmentDateTime}
                handleAppointmentSubmit={handleAppointmentSubmit}
                appointmentDateTime={appointmentDateTime}
            />
            <PatientDetailsModal
                selectedPatientDetails={selectedPatientDetails}
                modalPatientDetails={modalPatientDetails}
                setmodalPatientDetails={setmodalPatientDetails}
            />
        </div>
    );
}

export default PatientList;
