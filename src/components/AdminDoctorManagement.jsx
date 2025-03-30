import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Modal,
  TextInput,
  Textarea,
  Spinner,
} from "flowbite-react";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi";

const AdminDoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    description: "",
    image: "",
    password: "", // 🔹 New: Password field
    role: "doctor", // 🔹 Default role
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
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
          password: "", // Reset password field
        });
        setEditingId(null);
        setIsModalOpen(false);
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

  // Open modal for adding a new doctor (reset form)
  const handleOpenAddModal = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      description: "",
      image: "",
      password: "",
      role: "doctor",
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing doctor (populate form)
  const handleEdit = (doctor) => {
    setForm({ ...doctor, password: "" }); // Don't pre-fill password
    setEditingId(doctor._id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manage Doctors
      </h2>

      {/* Add Doctor Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-green-500"
        >
          <HiOutlinePlus className="text-lg " />
          Add Doctor
        </Button>
      </div>

      {/* Doctor List */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Doctor List</h3>

        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner size="xl" />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-gray-500 text-center">No doctors available.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Specialty</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {doctors.map((doctor) => (
                  <Table.Row key={doctor._id} className="hover:bg-gray-100">
                    <Table.Cell className="font-semibold">
                      {doctor.name}
                    </Table.Cell>
                    <Table.Cell>{doctor.email}</Table.Cell>
                    <Table.Cell>{doctor.specialty}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <Button
                          size="xs"
                          color="yellow"
                          onClick={() => handleEdit(doctor)}
                        >
                          <HiOutlinePencilAlt className="text-lg" />
                        </Button>

                        <Button
                          size="xs"
                          color="red"
                          onClick={() => handleDelete(doctor._id)}
                        >
                          <HiOutlineTrash className="text-lg" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>

      {/* Doctor Form Modal */}
      <Modal show={isModalOpen} size="md" onClose={() => setIsModalOpen(false)}>
        <Modal.Header>{editingId ? "Edit Doctor" : "Add Doctor"}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <TextInput
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <TextInput
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <TextInput
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              placeholder="Specialty"
              required
            />
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <TextInput
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <TextInput
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required={!editingId} // Only required for new doctors
            />

            <div className="flex justify-end gap-2">
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="blue">
                {editingId ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDoctorManagement;
