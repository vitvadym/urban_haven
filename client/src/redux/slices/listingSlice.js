import axios from '../../config/axios.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  listing: [],
  error: null,
  isLoading: false,
};

export const getMyListings = createAsyncThunk(
  'listing/getMyListings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = getState().user.user?._id;
      const { data } = await axios.get(`/api/user/listing/${userId}`);

      return data;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  },
);

export const deleteListing = createAsyncThunk(
  'listing/deleteListing',
  async (listingId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/listing/delete/${listingId}`);
    } catch (error) {
      const message = error.response.data.message;
      console.log(error);
      return rejectWithValue(message);
    }
  },
);

export const listingsSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    appendListing: (state, action) => {
      const isListingIn = state.listing.some(
        (listing) => listing._id === action.payload._id,
      );

      if (isListingIn) {
        state.listing.push(...action.payload);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getMyListings.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMyListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyListings.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.error = null;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }),
});

export const selectListings = (state) => state.listing?.listing;
export const selectIsLoading = (state) => state.listing?.isLoading;
export const selectError = (state) => state.listing?.error;

export const { appendListing } = listingsSlice.actions;
export default listingsSlice.reducer;
