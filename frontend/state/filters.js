import { createSlice } from '@reduxjs/toolkit'

const filters = createSlice({
    name: 'filters',
    initialState: {
        currentSize: 'All'
    },
    reducers: {
        selectSizeFilter(state, action) {
        const size = action.payload 
        state.currentSize = size
        },
        
    }
})

export default filters.reducer

export const {
    selectSizeFilter,
} = filters.actions