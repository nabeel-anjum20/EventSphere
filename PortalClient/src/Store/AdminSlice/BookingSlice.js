import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    bookings:[],
    error:null
}


export const getallbookings = createAsyncThunk("/admin/booking" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/booking/getallbookings");
    return data.data.data.bookings
    
})




export const deletebooking = createAsyncThunk("/admin/booking" , async(id)=>{
    const data = await axios.delete(`http://localhost:5000/api/admin/booking/deletebooking/${id}`);
     return data.data
})


export const updatebooking = createAsyncThunk("/admin/booking" , async({id , bookingStatus})=>{
    const data = await axios.put(`http://localhost:5000/api/admin/booking/updatebooking/${id}` , {bookingStatus});
     return data.data
})


const adminbookingSlice = createSlice({
  name:"adminbooking",
  initialState:initialState,
  reducers:{},
  extraReducers : (builder) => {
    builder.addCase(getallbookings.pending , (state) => {
        state.isloading = true
    }).addCase(getallbookings.fulfilled , (state , action) =>{
        state.isloading = false,
        state.bookings = action.payload && action.payload,
        state.error = null
    }).addCase(getallbookings.rejected , (state , action) =>{
        state.isloading = false,
        state.bookings = []
        state.error = action.error.message
    })
  }  
})


export default adminbookingSlice.reducer