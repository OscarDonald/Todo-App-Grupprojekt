import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../feature/taskSlice/taskSlice';

export const store = configureStore({
    reducer: {
        taskSlice, user
    },
});