import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  isAuth: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/signup', formData);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/signin', formData);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const googleSignIn = createAsyncThunk(
  'user/googleSignIn',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/google-signin', formData);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const getMe = createAsyncThunk('user/getMe', async () => {
  try {
    const { data } = await axios.get('/api/auth/me');

    return data;
  } catch (error) {
    const message = error.response.data.message;
    return message;
  }
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const { data } = await axios.get('/api/auth/signout');

    return data;
  } catch (error) {
    const message = error.response.data.message;
    return message;
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (formData, { rejectWithValue, getState }) => {
    const userId = getState().user.user?._id;
    try {
      const { data } = await axios.post(`/api/user/update/${userId}`, formData);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = getState().user.user?._id;
      const { data } = await axios.delete(`/api/user/delete/${userId}`);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.user?.user;
export const selectIsLoading = (state) => state.user?.isLoading;
export const selectIsAuth = (state) => state.user?.isAuth;
export const selectError = (state) => state.user?.error;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
