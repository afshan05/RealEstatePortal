import { createSlice } from "@reduxjs/toolkit";
import type { PropertyParams } from "../../app/models/PropertyParams";

const initialState: PropertyParams = {
    pageNumber: 1,
    pageSize: 6,
    listingType: [],
    city: [],
    searchTerm: '',
    orderBy: 'title'
}

export const properySlice = createSlice({
    name:'propertySlice',
    initialState,
    reducers: {
            setPageNumber(state, action) {
                state.pageNumber = action.payload
            },
            setPageSize(state, action) {
                state.pageSize = action.payload
            },
            setOrderBy(state, action) {
                state.orderBy = action.payload
                state.pageNumber = 1;
            },
            setListingTypes(state, action) {
                state.listingType = action.payload
                state.pageNumber = 1;
            },
            setCity(state, action) {
                state.city = action.payload
                state.pageNumber = 1;
            },
            setSearchTerm(state, action) {
                state.searchTerm = action.payload
                state.pageNumber = 1;
            },
            resetParams() {
                return initialState;
            }
        }

});

export const {setCity,setOrderBy, setPageNumber, setPageSize, 
    setSearchTerm, setListingTypes, resetParams}= properySlice.actions;