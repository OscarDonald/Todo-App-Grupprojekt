import { createSlice, nanoid } from '@reduxjs/toolkit';

// dummy data
const initialState = {
    tasks: [
        {
            id: '1',
            title: 'Vattna blommorna',
            description: 'ta alla blommor i ditt hem',
            doDate: '2026-09-16',
            deadline: '2027-10-12',
            responsible: [],
            column: 0
        },
        {
            id: '2',
            title: 'Träna',
            description: 'cardio',
            doDate: '2024-03-17',
            deadline: '2025-07-28',
            responsible: [],
            column: 1
        },
        {
            id: '3',
            title: 'äta',
            description: 'frukost',
            doDate: '2024-04-27',
            deadline: '2024-06-07',
            responsible: [],
            column: 2
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
        },
        // Filters tasks state to remove chosen task by id
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { addTask, removeTask, updateTask } = taskSlice.actions; // reducer funcionerna i taskSlice som expoteras
export default taskSlice.reducer;