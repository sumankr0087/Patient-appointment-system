import React, { useEffect, useState } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentDateTime, setAppointmentDateTime] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

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

    useEffect(() => {
        fetchPatientList();
    }, []);

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
            console.log('response', response);
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
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td className="px-6 py-4 text-sm">{patient.name}</td>
                            <td className="px-6 py-4 text-sm">{patient.email}</td>
                            <td className="px-6 py-4 text-sm">{patient.age}</td>
                            <td className="px-6 py-4 text-sm">{patient.phone}</td>
                            <td className="px-6 py-4 text-sm">{patient.gender}</td>
                            <td className="px-6 py-4 text-sm">{patient.address}</td>
                            <td className="px-6 py-4 text-sm">
                                <button className='border border-green-500 bg-green-500 rounded text-white px-2 py-2' onClick={() => handleAppointmentClick(patient)}>Appointment</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md">
                        <div className="text-lg font-semibold mb-4">Schedule Appointment for-
                            <span className='ml-2'>{selectedPatient && selectedPatient.name}</span> </div>
                        <div className='flex flex-col'>
                            <input
                                type="datetime-local"
                                value={appointmentDateTime}
                                onChange={e => setAppointmentDateTime(e.target.value)}
                                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
                            />
                            <div className='flex justify-center gap-4'>
                                <ReactStripeCheckout
                                    token={handleAppointmentSubmit}
                                    amount={1000}
                                    description="Appointment Payment"
                                    currency="INR"
                                    stripeKey="pk_test_51PDyeXSApJKw7IbTpgfC77GWybNZzoAkNr5xd8Ghdo0O23yZ3WwASnSM7h5MXrcSOyjw4Ul5m1gSxfUKbI9ShAht00f9CigVCi"
                                >
                                    <button
                                        className='border border-gray-600 bg-gray-600 rounded text-white px-4 py-2'
                                    >
                                        Book
                                    </button>
                                </ReactStripeCheckout>
                                <button onClick={() => setModalOpen(false)}
                                    className='border border-gray-600 rounded  px-4 py-2'
                                >
                                    Close
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientList;
