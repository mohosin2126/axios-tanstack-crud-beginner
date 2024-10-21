// Inside your component
const { bookings, refetch } = useGetBookings();

// Creating a new booking
const newBooking = {
  title: "New Booking Title",
  price: 100,
};
handleCreateBooking(newBooking, refetch);

// Updating an existing booking
const updatedBooking = {
  title: "Updated Booking Title",
  price: 150,
};
handleUpdateBooking(existingBookingId, updatedBooking, refetch);

// Cancel a booking
handleCancelBooking(existingBookingId, refetch);
