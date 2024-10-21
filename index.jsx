import { useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";

// Axios Public Instance
const axiosPublic = axios.create({
  baseURL: 'https://y-gold-two.vercel.app/',
});

// Custom Hook to fetch booking data
const useGetBookings = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/bookings?email=${user.email}`);
      return response.data;
    },
    enabled: !!user?.email, 
  });

  return [bookings, refetch];
};

// Function to handle booking cancellation
const handleCancelBooking = (id, refetch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Cancel it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosPublic.delete(`/guidebookings/${id}`);
        if (response.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been cancelled.",
            icon: "success"
          });
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an issue cancelling your booking.",
          icon: "error"
        });
      }
    }
  });
};

// Function to add item to wishlist
const handleAddToWishlist = async (place, user, axiosSecure) => {
  const { _id, image, category, title, price } = place;

  const wishlistItem = {
    categoryId: _id,
    email: user.email,
    title,
    image,
    price,
  };

  try {
    const response = await axiosSecure.post("/wishlist", wishlistItem);
    if (response.data.insertedId) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Added To Wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    Swal.fire({
      title: "Error!",
      text: "There was an issue adding to your wishlist.",
      icon: "error",
    });
  }
};

// Function to create a new booking
const handleCreateBooking = async (bookingData, refetch) => {
  try {
    const response = await axiosPublic.post("/bookings", bookingData);
    if (response.data.insertedId) {
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Booking created successfully.",
        icon: "success"
      });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    Swal.fire({
      title: "Error!",
      text: "There was an issue creating your booking.",
      icon: "error"
    });
  }
};

// Function to update an existing booking
const handleUpdateBooking = async (id, bookingData, refetch) => {
  try {
    const response = await axiosPublic.put(`/bookings/${id}`, bookingData);
    if (response.data.modifiedCount > 0) {
      refetch(); 
      Swal.fire({
        title: "Updated!",
        text: "Booking updated successfully.",
        icon: "success"
      });
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    Swal.fire({
      title: "Error!",
      text: "There was an issue updating your booking.",
      icon: "error"
    });
  }
};

export {
  useGetBookings,
  handleCancelBooking,
  handleAddToWishlist,
  handleCreateBooking,
  handleUpdateBooking
};


