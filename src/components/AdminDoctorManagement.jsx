import { useState, useEffect } from "react";

const AdminDoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "", // ✅ Fixed field name
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/doctors/${editingId}`
      : "http://localhost:5000/api/doctors";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        fetchDoctors();
        setForm({
          name: "",
          email: "",
          phone: "",
          specialty: "",
          description: "",
          image: "",
        });
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  // Delete Doctor
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // Set editing mode
  const handleEdit = (doctor) => {
    setForm(doctor);
    setEditingId(doctor._id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>

      {/* Doctor Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="Specialty"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2"
        ></textarea>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full mb-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      {/* Doctors List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-3">Doctor List</h3>
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <ul>
            {doctors.map((doctor) => (
              <li
                key={doctor._id}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>
                  {doctor.name} - {doctor.specialty}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doctor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDoctorManagement;
