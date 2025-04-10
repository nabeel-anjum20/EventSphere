import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  };


export const loginuser = createAsyncThunk(
    "/website/login",
    async(formData)=>{
        const responce = await axios.post("http://localhost:5000/api/websiteauth/login" , formData , {
            withCredentials:true
        })

        return responce.data
})



export const registerAttendee = createAsyncThunk(
    "/website/attendee/register",
    async (formData) => {
        const response = await axios.post("http://localhost:5000/api/websiteauth/attendee/register", formData, {
            withCredentials: true
        });
        return response.data;
    }
);



export const registerExhibitor = createAsyncThunk(
    "/website/exhibitor/register",
    async (formData) => {
        const response = await axios.post("http://localhost:5000/api/websiteauth/exhibitor/register", formData, {
            withCredentials: true
        });
        return response.data;
    }
);

export const logoutuser = createAsyncThunk("/website/logout", async () => {
    const response = await axios.post("http://localhost:5000/api/websiteauth/logout", {}, {
        withCredentials: true
    });
    return response.data;
});

export const checkauthuser = createAsyncThunk(
    "/website/check-auth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/websiteauth/check-auth", {
                withCredentials: true,
                headers: { "Cache-Control": "no-cache" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Authentication failed");
        }
    }
);


const authSlicer = createSlice({
    name:"websiteauth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(registerAttendee.pending , (state)=>{
            state.isLoading = true
        }).addCase(registerAttendee.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
        }).addCase(registerAttendee.rejected , (state , action)=>{
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null            
        }).addCase(registerExhibitor.pending , (state)=>{
            state.isLoading = true
        }).addCase(registerExhibitor.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
        }).addCase(registerExhibitor.rejected , (state , action)=>{
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null            
        })
        .addCase(loginuser.pending , (state)=>{
            state.isLoading = true;
        }).addCase(loginuser.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.isAuthenticated = action.payload.user ? true :null;
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(loginuser.rejected , (state , action)=>{
            state.isLoading = false;
            state.isAuthenticated = false
            state.user =  null
        }).addCase(checkauthuser.pending , (state)=>{
            state.isLoading = true;
        }).addCase(checkauthuser.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.isAuthenticated = action.payload.user ? true :false;
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkauthuser.rejected , (state , action)=>{
            state.isLoading = false;
            state.isAuthenticated = false
            state.user =  null
        }).addCase(logoutuser.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.isAuthenticated = false
            state.user =  null
        })
    }
})

export default authSlicer.reducer