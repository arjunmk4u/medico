import { useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.age}</td>
              <td className="border p-2">{patient.gender}</td>
              <td className="border p-2">{patient.phone}</td>
              <td className="border p-2">{patient.diagnosis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
