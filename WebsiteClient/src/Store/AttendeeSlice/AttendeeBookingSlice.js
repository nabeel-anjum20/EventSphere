import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  bookings: [],
  error: null,
};


export const createBookExpo = createAsyncThunk(
  "/attendee/booking/createbooking",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/attendee/booking/createbooking",
      formData
    );
    console.log(response)
    return response.data;
  }
);



export const getallbooking = createAsyncThunk(
    "/attendee/booking/getallbooking",
    async () => {
      const response = await axios.get(
        "http://localhost:5000/api/attendee/booking/getallbooking"
      );
     
      console.log(response)
    }
  );

const attendeeBookSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getallbooking.pending , (state , action)=>{
        state.isLoading = true
    }).addCase(getallbooking.fulfilled , (state , action)=>{
        state.isLoading = false,
        state.bookings = action.payload && action.payload
    }).addCase(getallbooking.rejected , (state , action)=>{
        state.isLoading = false,
        state.bookings = [],
        state.error = null
    })
  },
});

export default attendeeBookSlice.reducer;
