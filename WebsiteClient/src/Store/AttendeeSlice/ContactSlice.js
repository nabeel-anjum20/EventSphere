import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    error:null
}


export const createcontact = createAsyncThunk("/attendee/contact/createcontact", async (formData) => {
    const data = await axios.post("http://localhost:5000/api/attendee/contact/createcontact" , formData);
    console.log(data) 
    return data.data
 });
  
  
  const attendeecontactslicer = createSlice({
    name: "attendeecontactslice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createcontact.pending, (state) => {
          state.isloading = true;
        })
        .addCase(createcontact.fulfilled, (state, action) => {
          state.isloading = false;
          state.error = null;
        })
        .addCase(createcontact.rejected, (state, action) => {
          state.isloading = false;
          state.error = action.error.message;
        })
    },
  });


export default attendeecontactslicer.reducer