import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    expos:[],
    halls:[],
    error:null
}


export const getallhalls = createAsyncThunk("/admin/halls" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/expo/gethalldetails");
    return data.data.data.halls
})


export const getallexpos = createAsyncThunk("/admin/expos" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/expo/getallexpo");
    return data.data.data.expos
    
})

export const updatehalls = createAsyncThunk("/admin/halls" , async({id , formData})=>{
    const data = await axios.put(`http://localhost:5000/api/admin/expo/updatehall/${id}` , formData);
    console.log(data)
     return data.data
})

export const updatexpo = createAsyncThunk("/admin/expos" , async({id , formData})=>{
    const data = await axios.put(`http://localhost:5000/api/admin/expo/updatexpo/${id}` , formData);
    return data.data
})



export const deletexpo = createAsyncThunk("/admin/expos" , async(id)=>{
    const data = await axios.delete(`http://localhost:5000/api/admin/expo/deletexpo/${id}`);
    return data.data
})


const adminexposlicer = createSlice({
  name:"adminexpo",
  initialState:initialState,
  reducers:{},
  extraReducers : (builder) => {
    builder.addCase(getallhalls.pending , (state) => {
        state.isloading = true
    }).addCase(getallhalls.fulfilled , (state , action) =>{
        state.isloading = false,
        state.halls = action.payload && action.payload,
        state.error = null
    }).addCase(getallhalls.rejected , (state , action) =>{
        state.isloading = false,
        state.halls = []
        state.error = action.error.message
    }).addCase(getallexpos.pending, (state , action) =>{
        state.isloading = true
    }).addCase(getallexpos.fulfilled, (state , action) =>{
        state.isloading = false,
        state.expos = action.payload && action.payload
    }).addCase(getallexpos.rejected, (state , action) =>{
        state.isloading = false,
        state.expos = []
        state.error = action.error.message
    })
  }  
})


export default adminexposlicer.reducer