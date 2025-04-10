import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    error:null
}


export const getallexpo = createAsyncThunk("/exhibitor/expo/getallexpo", async () => {
    const data = await axios.get("http://localhost:5000/api/exhibitor/expo/getallexpo");
    return data.data.expos;
  });
  
  export const createxpo = createAsyncThunk("/exhibitor/expo/createxpo", async (formData) => {
    const data = await axios.post("http://localhost:5000/api/exhibitor/expo/createxpo", formData);
    return data.data;
  });
  
  const exposlicer = createSlice({
    name: "exposlice",
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
        // Handling getallhalls
    },
  });


export default exposlicer.reducer