import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../feature/taskSlice/taskSlice';
import userSlice from '../feature/userSlice/userSlice';

export const store = configureStore({
    reducer: {
        taskSlice, userSlice
    },
});