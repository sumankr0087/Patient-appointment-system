import React, { useEffect, useState } from 'react';
import AddPatient from './AddPatient';

function PatientList() {
    const [patients, setPatients] = useState([]);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientList;
