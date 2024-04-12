import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        isLoggedIn: true,
        id: '1',
        title: 'vatta blommorna',
        description: 'ta alla blommor i ditt hem',
        doDate: 'idag',
        deadline: 'idag',
        responible: [],
},
{
    isLoggedIn: false,
    id: '2',
    title: 'träna',
    description: 'cardio',
    doDate: '2024',
    deadline: '2025',
    responible: [],
},
{
    isLoggedIn: false,
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
        // addtask(),
        // removeTask(),
    }
})

export const {/* funktionerna i taskslice */} = taskSlice.actions;
export default taskSlice.reducer;