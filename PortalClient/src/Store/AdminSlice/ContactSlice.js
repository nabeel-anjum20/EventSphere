import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    contacts:[],
    error:null
}


export const getallcontacts = createAsyncThunk("/admin/contact" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/contact/getallcontacts");
    //console.log(data.data.data.contacts)
    return data.data.data.contacts
})




export const deletecontact = createAsyncThunk("/admin/contact" , async(id)=>{
    const data = await axios.delete(`http://localhost:5000/api/admin/contact/deletecontact/${id}`);
     return data.data
})



const admincontactSlice = createSlice({
  name:"admincontact",
  initialState:initialState,
  reducers:{},
  extraReducers : (builder) => {
    builder.addCase(getallcontacts.pending , (state) => {
        state.isloading = true
    }).addCase(getallcontacts.fulfilled , (state , action) =>{
        state.isloading = false,
        state.contacts = action.payload && action.payload,
        state.error = null
    }).addCase(getallcontacts.rejected , (state , action) =>{
        state.isloading = false,
        state.contacts = []
        state.error = action.error.message
    })
  }  
})


export default admincontactSlice.reducer