import { createSlice, nanoid } from '@reduxjs/toolkit';

// dummy data
const initialState = {
    tasks: [
        {
            id: '1',
            title: 'vatta blommorna',
            description: 'ta alla blommor i ditt hem',
            doDate: 'idag',
            deadline: 'idag',
            responible: [],
            column: 0
        },
        {
            id: '2',
            title: 'träna',
            description: 'cardio',
            doDate: '2024',
            deadline: '2025',
            responible: [],
            column: 1
        },
        {
            id: '3',
            title: 'äta',
            description: 'frukost',
            doDate: '',
            deadline: '',
            responible: [],
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
        editTask: (state, action) => {
            
        }
    }
})



export const { addTask, removeTask } = taskSlice.actions; // reducer funcionerna i taskSlice som expoteras
export default taskSlice.reducer;