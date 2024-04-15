import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        title: 'vatta blommorna',
        description: 'ta alla blommor i ditt hem',
        doDate: 'idag',
        deadline: 'idag',
        responible: [],
},
{
    id: '2',
    title: 'träna',
    description: 'cardio',
    doDate: '2024',
    deadline: '2025',
    responible: [],
},
{
    id: '3',
    title: 'äta',
    description: 'frukost',
    doDate: '',
    deadline: '',
    responible: [],
},];

export const taskSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // storeTask(),
        // removeTask(),
    }
})

export const {/* storeTask, removeTask (reducer funcionerna i taskSlice)*/} = taskSlice.actions;
export default taskSlice.reducer;