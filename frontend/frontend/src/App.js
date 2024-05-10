import Addpatient from "./components/AddPatient";
import PatientList from "./PatientList";
function App() {
  return (
    <div>
      <div className="flex justify-center bg-slate-500">
        <h1 className='text-5xl font-normal py-4 text-white'>Patient Appointment System</h1>
        <div className="mt-4 absolute right-5">
          <Addpatient />
        </div>
      </div>
      <PatientList/>
    </div>
  );
}

export default App;
