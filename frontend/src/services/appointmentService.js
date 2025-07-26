const BASE_URL = "http://localhost:8001/api/v1";

export const appointmentService = {
  bookAppointment: async (appointmentData) => {
    const res = await fetch(`${BASE_URL}/booking/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to book appointment");
    }

    return data;
  },
};
