import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from './Slice/LayoutSlice';

const Store = configureStore({
    reducer: {
        layout: layoutReducer,
    },
});

export default Store;

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
