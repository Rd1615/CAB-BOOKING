import { create } from "zustand";
import axiosInstance from "../lib/axios";                                                              

export const useBookingStore = create((set) => ({
  bookingDetail: null,

  setBookingDetail: (data) => {
    try {
      set({ bookingDetail: data }); 
      console.log("Booking Details set successfully");
    } catch (error) {
      console.log(error?.response?.data?.message || "Booking details set failed");
    }
  },
}));
