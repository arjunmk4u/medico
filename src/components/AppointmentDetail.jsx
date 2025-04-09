import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Spinner, Alert, Badge } from "flowbite-react";
import { FaCalendarAlt, FaUserMd, FaUser, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/appointments/${id}`);
        setAppointment(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointment details");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

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

  if (!appointment) {
    return <Alert color="failure">Appointment not found</Alert>;
  }

  return (
    <div className="p-6">
      <Button as={Link} to="/appointments" color="light" className="mb-6">
        <FaArrowLeft className="mr-2" /> Back to Appointments
      </Button>

      <Card className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <FaUserMd className="mr-2 text-blue-500" /> Doctor Information
              </h3>
              <p className="mt-2">
                <span className="font-medium">Name:</span> {appointment.doctorId?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Specialty:</span> {appointment.doctorId?.specialty || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <FaUser className="mr-2 text-green-500" /> Patient Information
              </h3>
              <p className="mt-2">
                <span className="font-medium">Name:</span> {appointment.patientId?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Email:</span> {appointment.patientId?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-500" /> Appointment Details
              </h3>
              <p className="mt-2">
                <span className="font-medium">Date:</span>{" "}
                {appointment.appointmentDate ? format(new Date(appointment.appointmentDate), "MMM dd, yyyy") : "N/A"}
              </p>
              <p>
                <span className="font-medium">Time:</span> {appointment.appointmentTime || "N/A"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <Badge
                  color={
                    appointment.status === "confirmed"
                      ? "success"
                      : appointment.status === "pending"
                      ? "warning"
                      : "failure"
                  }
                >
                  {appointment.status}
                </Badge>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button color="failure">Cancel Appointment</Button>
          {/* <Button color="warning">Reschedule</Button> */}
        </div>
      </Card>
    </div>
  );
};

export default AppointmentDetail;