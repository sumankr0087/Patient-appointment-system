const API_URL = process.env.REACT_APP_API_KEY;

export const fetchPatientList = async () => {
    try {
        const response = await fetch(`${API_URL}/patients/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch patient list');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching patient list:', error);
        return [];
    }
};

export const fetchPatientDetails = async (name) => {
    try {
        if (name) {
            const response = await fetch(`${API_URL}/patients/${name}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch patient details');
            }
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching patient details:', error);
    }
    return null;
};


// Add Patient api
export const addPatient = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/patients/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};


export const addAppointmentSubmit = async (selectedPatient, appointmentDateTime, handleAppointmentSuccess) => {
    const appointmentData = {
        patient_id: selectedPatient.id,
        datetime: appointmentDateTime,
    };

    try {
        const response = await fetch(`${API_URL}/patients/${selectedPatient.id}/appointments/`, {
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

