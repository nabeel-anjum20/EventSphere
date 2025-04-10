import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    exhibitors:[],
    error:null
}


export const getallexhibitors = createAsyncThunk("/admin/exhibitors" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/exhibitors/allexhibitors");
    //console.log(data)
    return data.data.data.exhibitors 
})

export const createxhibitors = createAsyncThunk("/admin/exhibitors" , async(formData)=>{
    const data = await axios.post("http://localhost:5000/api/admin/exhibitors/create" , formData);
    console.log(data)
     return data.data
})



export const deletexhibitors = createAsyncThunk("/admin/exhibitors" , async(id)=>{
    const data = await axios.delete(`http://localhost:5000/api/admin/exhibitors/delete/${id}`);
     return data.data
})

export const updatexhibitors = createAsyncThunk("/admin/exhibitors" , async({id , formData})=>{
    const data = await axios.put(`http://localhost:5000/api/admin/exhibitors/update/${id}` , formData);
    console.log(data)
     return data.data
})


const exhibitorSlice = createSlice({
  name:"exhibitors",
  initialState:initialState,
  reducers:{},
  extraReducers : (builder) => {
    builder.addCase(getallexhibitors.pending , (state) => {
        state.isloading = true
    }).addCase(getallexhibitors.fulfilled , (state , action) =>{
        state.isloading = false,
        state.exhibitors = action.payload && action.payload,
        state.error = null
    }).addCase(getallexhibitors.rejected , (state , action) =>{
        state.isloading = false,
        state.exhibitors = []
        state.error = action.error.message
    })
  }  
})


export default exhibitorSlice.reducer