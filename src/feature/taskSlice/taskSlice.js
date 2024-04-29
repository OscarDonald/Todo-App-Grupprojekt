import { createSlice, nanoid } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

// dummy data
const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [
        {
            id: '1',
            title: 'Vattna blommorna',
            description: 'ta alla blommor i ditt hem',
            doDate: '2026-09-16',
            deadline: '2027-10-12',
            responsible: [],
            columnId: 1
        },
        {
            id: '2',
            title: 'Träna',
            description: 'cardio',
            doDate: '2024-03-17',
            deadline: '2025-07-28',
            responsible: [],
            columnId: 2
        },
        {
            id: '3',
            title: 'Äta',
            description: 'frukost',
            doDate: '2024-04-27',
            deadline: '2024-06-07',
            responsible: [],
            columnId: 3
        }],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        // Creates a new task object and adds it task state
        addTask: (state, action) => {
            const task = {
                ...action.payload,
                id: nanoid()
            }
            state.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        // Filters tasks state to remove chosen task by id
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));

        },
        // update columnId for DnD
        updateTask: (state, action) => {
            state.tasks = action.payload
            localStorage.setItem('tasks', JSON.stringify(state.tasks));  
        },
        editTask: (state, action) => {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    }
});

// reducer funcionerna i taskSlice som expoteras
export const { addTask, removeTask, updateTask, editTask } = taskSlice.actions; 
export default taskSlice.reducer;