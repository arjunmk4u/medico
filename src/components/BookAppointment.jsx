import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; 

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await fetch("http://localhost:5000/api/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors.");
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch available time slots when doctor or date changes
  useEffect(() => {
    if (doctorId && appointmentDate) {
      fetchAvailableTimes();
    }
  }, [doctorId, appointmentDate]);

  const fetchAvailableTimes = async () => {
    try {
      setLoadingSlots(true);
      const response = await fetch(`http://localhost:5000/api/appointments/times/${doctorId}/${appointmentDate}`);

      if (!response.ok) throw new Error("Failed to fetch available slots");

      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load time slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        toast.error("User not logged in!");
        return;
      }

      if (!doctorId) {
        toast.warning("Please select a doctor.");
        return;
      }

      if (!appointmentDate) {
        toast.warning("Please select a date.");
        return;
      }

      if (!selectedSlot) {
        toast.warning("Please select a time slot.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          appointmentDate,
          appointmentTime: selectedSlot,
          patientId: user.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to book appointment");

      toast.success("Appointment booked successfully!");
      setDoctorId("");
      setAppointmentDate("");
      setSelectedSlot("");
      setAvailableSlots([]);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      <div className="bg-white p-4 rounded shadow">
        {/* Doctor Selection */}
        <label className="block font-bold">Select Doctor:</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="border p-2 w-full"
          disabled={loadingDoctors}
        >
          <option value="">{loadingDoctors ? "Loading doctors..." : "Select a doctor"}</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>

        {/* Date Selection */}
        <label className="block font-bold mt-4">Select Date:</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="border p-2 w-full"
          min={new Date().toISOString().split("T")[0]} // Prevents past dates
        />

        {/* Time Slot Selection */}
        <label className="block font-bold mt-4">Select Time Slot:</label>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="border p-2 w-full"
          disabled={!availableSlots.length || loadingSlots}
        >
          <option value="">
            {loadingSlots ? "Loading slots..." : "Select a time slot"}
          </option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>

        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
          disabled={!doctorId || !appointmentDate || !selectedSlot}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
