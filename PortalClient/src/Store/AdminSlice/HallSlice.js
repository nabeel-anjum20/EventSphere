import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isloading:false,
    halls:[],
    error:null
}


export const getallhalls = createAsyncThunk("/admin/halls" , async()=>{
    const data = await axios.get("http://localhost:5000/api/admin/hall/allhalls");
    return data.data.data.halls
})

export const createhalls = createAsyncThunk("/admin/halls" , async(formData)=>{
    const data = await axios.post("http://localhost:5000/api/admin/hall/createhall" , formData);
     return data.data
})



export const deletehalls = createAsyncThunk("/admin/halls" , async(id)=>{
    const data = await axios.delete(`http://localhost:5000/api/admin/hall/delete/${id}`);
     return data.data
})

export const updatehalls = createAsyncThunk("/admin/halls" , async({id , formData})=>{
    const data = await axios.put(`http://localhost:5000/api/admin/hall/update/${id}` , formData);
    console.log(data)
     return data.data
})


const hallSlice = createSlice({
  name:"halls",
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
        state.exhibitors = []
        state.error = action.error.message
    })
  }  
})


export default hallSlice.reducer