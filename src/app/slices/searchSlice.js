
import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      criteria: ""
    },
    reducers: {
      updateCriteria: (action) => {
        return {
          criteria: action.payload
        }
      },
    }
    
});

export const { updateCriteria } = searchSlice.actions;

export const searchData = (state) => state.search;

export default searchSlice.reducer;