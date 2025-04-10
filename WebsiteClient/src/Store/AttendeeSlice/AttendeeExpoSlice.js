import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    expos:[],
    error:null
}


export const getallexpo = createAsyncThunk("/attendee/expo/getallexpo", async () => {
    const data = await axios.get("http://localhost:5000/api/attendee/expo/getallexpos");
    return data.data.data.expos
     });
  
  
  const attendeeexposlicer = createSlice({
    name: "attendeeexposlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getallexpo.pending, (state) => {
          state.isloading = true;
        })
        .addCase(getallexpo.fulfilled, (state, action) => {
          state.isloading = false;
          state.expos = action.payload;
          state.error = null;
        })
        .addCase(getallexpo.rejected, (state, action) => {
          state.isloading = false;
          state.expos = [];
          state.error = action.error.message;
        })
    },
  });


export default attendeeexposlicer.reducer