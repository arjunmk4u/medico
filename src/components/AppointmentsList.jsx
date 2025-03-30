import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Spinner, Badge, Alert } from "flowbite-react";
import { FaCalendarAlt, FaSearch, FaFilter } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    doctor: ""
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = `${API_BASE_URL}/api/appointments`;
        if (filters.status || filters.date || filters.doctor) {
          url += `?status=${filters.status}&date=${filters.date}&doctor=${filters.doctor}`;
        }
        
        const response = await axios.get(url);
        setAppointments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <Alert color="failure">{error}</Alert>;
  }

  return (
    <div className="p-6 py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Appointments</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-500" />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border rounded p-2"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="border rounded p-2"
            />
          </div>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Patient</Table.HeadCell>
          <Table.HeadCell>Doctor</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {appointments.map((appt) => (
            <Table.Row key={appt._id}>
              <Table.Cell>{appt.patientId?.name || "N/A"}</Table.Cell>
              <Table.Cell>{appt.doctorId?.name || "N/A"}</Table.Cell>
              <Table.Cell>
                {appt.appointmentDate ? format(new Date(appt.appointmentDate), "MMM dd, yyyy") : "N/A"}
              </Table.Cell>
              <Table.Cell>{appt.appointmentTime || "N/A"}</Table.Cell>
              <Table.Cell>
                <Badge
                  color={
                    appt.status === "confirmed"
                      ? "success"
                      : appt.status === "pending"
                      ? "warning"
                      : "failure"
                  }
                >
                  {appt.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button as={Link} to={`/appointments/${appt._id}`} size="xs" color="light">
                  <FaSearch className="mr-1" /> View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AppointmentsList;