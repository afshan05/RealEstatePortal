import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/errorApi";
import { propertyApi } from "../../features/property/propertyApi";
import { properySlice } from "../../features/property/propertySlice";
import { favoriteApi } from "../../features/favorite/favoriteApi";
import { accountApi } from "../../features/account/accountApi";
import authSlice from "../../features/account/authSlice";



export const store = configureStore({
    reducer: {
        [propertyApi.reducerPath]: propertyApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [favoriteApi.reducerPath]:favoriteApi.reducer,
          [accountApi.reducerPath]: accountApi.reducer,
       
       
        ui: uiSlice.reducer,
        property: properySlice.reducer,
        auth:authSlice
        
,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            propertyApi.middleware,
            errorApi.middleware,
            favoriteApi.middleware,
             accountApi.middleware,
          
        )
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()