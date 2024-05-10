import React from 'react';

function PatientDetailsModal({ selectedPatientDetails, modalPatientDetails, setmodalPatientDetails }) {
    return (
        modalPatientDetails && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-8 rounded-md">
                    <div className="text-lg font-semibold mb-4 flex justify-center">Patient Details</div>
                    <div className='flex flex-col'>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'>
                            <span className='text-lg font-medium'> Name: </span>
                            <span >{selectedPatientDetails && selectedPatientDetails.name}</span></div>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'><span className='text-lg font-medium'> Email: </span>
                            <span>{selectedPatientDetails && selectedPatientDetails.email}</span></div>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'><span className='text-lg font-medium'> Phone: </span>
                            <span>{selectedPatientDetails && selectedPatientDetails.phone}</span></div>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'><span className='text-lg font-medium'> Age: </span>
                            <span>{selectedPatientDetails && selectedPatientDetails.age}</span></div>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'><span className='text-lg font-medium'> Gender: </span>
                            <span>{selectedPatientDetails && selectedPatientDetails.gender}</span></div>
                        <div className='grid grid-cols-2 py-2 border-b border-gray-200'><span className='text-lg font-medium'> Address: </span>
                            <span>{selectedPatientDetails && selectedPatientDetails.address}</span></div>
                        <button onClick={() => setmodalPatientDetails(false)}
                            className='border border-gray-600 rounded  px-4 py-2 mt-2'>Close</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default PatientDetailsModal;
