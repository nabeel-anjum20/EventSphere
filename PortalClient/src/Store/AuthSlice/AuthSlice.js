import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialstates = {
  isloading: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false, 
  user: JSON.parse(localStorage.getItem("user")) || null, 
};

export const loginuser = createAsyncThunk(
  "/portalauth/login",
  async (formData) => {
    const response = await axios.post("http://localhost:5000/api/portalauth/login", formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const checkauthuser = createAsyncThunk(
  "/portalauth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/portalauth/check-auth", {
        withCredentials: true,
        headers: { "Cache-Control": "no-cache" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Authentication failed");
    }
  }
);

export const logoutuser = createAsyncThunk("/portalauth/logout", async () => {
  const response = await axios.post("http://localhost:5000/api/portalauth/logout", {}, {
    withCredentials: true,
  });
  return response.data;
});

const authSlicer = createSlice({
  name: "adminauth",
  initialState: initialstates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginuser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.isloading = false;
        state.isAuthenticated = action.payload.user ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
        if (state.isAuthenticated) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(loginuser.rejected, (state) => {
        state.isloading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      })
      .addCase(checkauthuser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(checkauthuser.fulfilled, (state, action) => {
        state.isloading = false;
        state.isAuthenticated = action.payload.user ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
        if (state.isAuthenticated) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(checkauthuser.rejected, (state) => {
        state.isloading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.isloading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      });
  },
});

export default authSlicer.reducer;
