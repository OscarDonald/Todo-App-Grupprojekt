import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../feature/taskSlice/taskSlice';
import userSlice from '../feature/userSlice/userSlice';
import columnSlice from '../feature/columnSlice/columnSlice';

export const store = configureStore({
    reducer: {
        tasks: taskSlice, 
        users: userSlice,
        columns: columnSlice,
    },
});