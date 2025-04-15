import { useState, useEffect } from "react";
import { Modal, Button, Label, Select, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const BookAppointmentModal = ({ showModal, onClose, onAppointmentBooked, doctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch doctors from backend
  useEffect(() => {
    if (doctor?._id) {
      setDoctorId(doctor._id);
    }
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await fetch(`${API_BASE_URL}/api/doctors`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors. Please try again later.");
      } finally {
        setLoadingDoctors(false);
      }
    };
    
    if (showModal) {
      fetchDoctors();
      resetForm();
    }
  }, [showModal]);

  // Fetch available time slots when doctor or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (doctorId && appointmentDate) {
        try {
          setLoadingSlots(true);
          setSelectedSlot("");

          const formattedDate = format(appointmentDate, "yyyy-MM-dd");

          const response = await fetch(
            `${API_BASE_URL}/api/appointments/times/${doctorId}/${formattedDate}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setAvailableSlots(data || []);

          if (data.length === 0) {
            toast.info("No available slots for selected date");
          }
        } catch (error) {
          console.error("Error fetching time slots:", error);
          toast.error("Failed to load available time slots");
          setAvailableSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      } else {
        setAvailableSlots([]);
      }
    };

    const debounceTimer = setTimeout(fetchSlots, 300);
    return () => clearTimeout(debounceTimer);
  }, [doctorId, appointmentDate]);

  const handleBooking = async () => {
    try {
      setIsBooking(true);
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user?.id) {
        toast.error("Please login to book an appointment");
        return;
      }

      if (!doctorId || !appointmentDate || !selectedSlot) {
        toast.warning("Please select doctor, date, and time slot");
        return;
      }

      const formattedDate = format(appointmentDate, "yyyy-MM-dd");
      
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          doctorId,
          appointmentDate: formattedDate,
          appointmentTime: selectedSlot,
          patientId: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed");
      }

      toast.success(`Appointment booked for ${formattedDate} at ${selectedSlot}`);
      const doctor = doctors.find((doc) => doc._id === doctorId)?.name || "Unknown Doctor";

      const newAppointment = {
        // doctor: doctors.find((doc) => doc._id === doctorId)?.name || "Unknown Doctor",
        // doctor: {
        //   _id: doctorId,
        //   name: doctors.find((doc) => doc._id === doctorId)?.name || "Unknown Doctor",
        // },
        doctorId : doctor,
        appointmentDate: formattedDate,
        appointmentTime: selectedSlot,
        status: "pending",
      };
      
      if (onAppointmentBooked) {
        await onAppointmentBooked(newAppointment);
      }
      
      resetForm();
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setIsBooking(false);
    }
  };

  const resetForm = () => {
    setDoctorId("");
    setAppointmentDate(null);
    setSelectedSlot("");
    setAvailableSlots([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal show={showModal} onClose={handleClose} size="xl">
      <Modal.Header>Book Appointment</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* Doctor Selection */}
          <div>
            <Label htmlFor="doctor" value="Select Doctor" className="mb-2 block" />
            <Select
              id="doctor"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              disabled={loadingDoctors}
              required
              className="w-full"
            >
              <option value="">{loadingDoctors ? "Loading doctors..." : "Select a doctor"}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} ({doctor.specialty})
                </option>
              ))}
            </Select>
          </div>

          {/* Date Selection */}
          <div>
            <Label htmlFor="appointmentDate" value="Select Date" className="mb-2 block" />
            <DatePicker
              id="appointmentDate"
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              minDate={new Date()} // Prevent past dates
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              wrapperClassName="w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Time Slot Selection */}
          <div>
            <Label htmlFor="timeSlot" value="Select Time Slot" className="mb-2 block" />
            <Select
              id="timeSlot"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={!availableSlots.length || loadingSlots}
              required
              className="w-full"
            >
              <option value="">
                {loadingSlots 
                  ? "Loading available slots..." 
                  : availableSlots.length 
                    ? "Select a time slot" 
                    : appointmentDate 
                      ? "No slots available" 
                      : "Select date first"}
              </option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button color="gray" onClick={handleClose} className="mr-2">
          Cancel
        </Button>
        <Button
          onClick={handleBooking}
          disabled={!doctorId || !appointmentDate || !selectedSlot || isBooking}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isBooking ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Booking...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookAppointmentModal;
