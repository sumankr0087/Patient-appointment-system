import React, { useState } from 'react';
import { addPatient } from '../api/apiService';

function AddPatient() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        has_appointment: false,
    });

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isSuccess = await addPatient(formData);
        if (isSuccess) {
            closeModal();
            window.location.reload();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return (
        <div>
            <div className='flex justify-center mt-2 gap-4'>
                <button className='border border-green-500 bg-green-500 rounded text-white px-2 py-2' onClick={openModal}>Add Patient</button>
            </div>
                    { showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="flex justify-center text-lg font-semibold mb-4">Enter Patient Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label className='text-lg' htmlFor="name">Patient Name</label>
                                <input placeholder='Enter Name' type="text" id="name" name="name" value={formData.name} onChange={handleChange} className='border-2 border-gray-300 w-[20rem] h-[2.5rem] rounded' />
                            </div>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label htmlFor="email">Patient Email</label>
                                <input placeholder='Enter email' type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='border-2 border-gray-300 w-[20rem] h-[2.5rem] rounded' />
                            </div>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label htmlFor="phone">Patient Phone No.</label>
                                <input placeholder='Enter Phone No.' type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} className='border-2 border-gray-300 w-[20rem] h-[2.5rem] rounded' />
                            </div>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label htmlFor="age">Patient Age</label>
                                <input placeholder='Enter Age' type="number" id="age" name="age" value={formData.age} onChange={handleChange} className='border-2 border-gray-300 w-[20rem] h-[2.5rem] rounded' />
                            </div>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label htmlFor="gender">Patient Gender</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className='border-2 border-gray-300 w-[20rem] h-[2.5rem] rounded'>
                                    <option value="male">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4 gap-1 flex flex-col">
                                <label htmlFor="address">Patient Address</label>
                                <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" className='border-2 border-gray-300 w-[20rem] rounded'></textarea>
                            </div>
                            <div className="flex justify-center gap-4">
                                <button type="submit" className='border border-green-500 bg-green-500 rounded text-white px-3 py-2' >Submit</button>
                                <button type="button" className='border border-gray-400 rounded text-gray-600 px-3 py-2' onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    );
}

export default AddPatient;
