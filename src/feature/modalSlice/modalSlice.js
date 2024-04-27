import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    availableUsers: [],
    responsibles: [],
    taskTitle: '',
    taskDescription: '',
    doDate: '',
    deadline: '',
}


export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // Setter functions
        setAvailableUsers: (state, action) => {
            state.availableUsers = action.payload;
        },
        setResponsibles: (state, action) => {
            state.responsibles = action.payload;
        },
        setTaskTitle: (state, action) => {
            state.taskTitle = action.payload;
        },
        setTaskDescription: (state, action) => {
            state.taskDescription = action.payload;
        },
        setDoDate: (state, action) => {
            state.doDate = action.payload;
        },
        setDeadline: (state, action) => {
            state.deadline = action.payload;
        },
        setStates: (state, action) => {
            state.taskTitle = action.payload.title;
            state.taskDescription = action.payload.taskDescription;
            state.doDate = action.payload.doDate;
            state.deadline = action.payload.deadline;
            state.responsibles = action.payload.responsibles;
        },
        // resets all local states to its inizial values
        resetLocalStates: (state) => {
            state.availableUsers = [];
            state.responsibles = [];
            state.taskTitle = '';
            state.taskDescription = '';
            state.doDate = '';
            state.deadline = '';
        },
        // Finds the user in the availableUsers array whose name matches the targetUser.
        // Adds the found user to the responsibles array
        // Remove the user from the list of available users.
        // Update the list of available users.
        handleResponsibles: (state, action) => {
            console.log(state.availableUsers)
            console.log(state.responsibles)
            console.log(state.taskTitle)
            console.log(state.taskDescription)
            console.log(state.doDate)
            console.log(state.deadline)
            const newUser = state.availableUsers.find((user) => user.name === action.payload);
            state.responsibles.push(newUser);
            const updatedAvailableUsers = state.availableUsers.filter((user) => user.name !== action.payload);
            state.availableUsers = updatedAvailableUsers;
        },
        // Get the user's name from the event target.
        // Find the responsible user with this name.
        // Add this user to the available users list.
        // Remove the user from the responsibles list.
        // Update the responsibles list.
        handleRemoveResponsibleUser: (state, action) => {
            const targetUser = state.responsibles.find((user) => user.name === action.payload);
            state.availableUsers.push(targetUser);
            const upadatedResponsibles = state.responsibles.filter((user) => user.name !== action.payload);
            state.responsibles = upadatedResponsibles;
        },
    }
})

export const {setAvailableUsers, setResponsibles, setTaskTitle, setTaskDescription, setDoDate, setDeadline, handleResponsibles, handleRemoveResponsibleUser, resetLocalStates, setStates} = modalSlice.actions; // reducer funcionerna i taskSlice som expoteras
export default modalSlice.reducer;