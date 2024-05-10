import React from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';

function AppointmentModal({ selectedPatient, modalOpen, setModalOpen, setAppointmentDateTime, handleAppointmentSubmit, appointmentDateTime }) {
    return (
        modalOpen && (
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
        )
    );
}

export default AppointmentModal;
