import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    users :[
    {
        isLoggedIn: true,
        id: '1',
        name: 'Jens',
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    }]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                isLoggedIn: false,
                id: nanoid(),
                name: action.payload,
                tasks: []
            }
            state.users.push(newUser);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        chooseUser: (state, action) => {
            // Array med alla isLoggedIn = false
            const deactivatedState = state.users.map(user => ({...user, isLoggedIn: false}));
            // Hitta användaren som valts
            // Uppdatera vald user till isLoggedIn = true
            state.users = deactivatedState.map(user => user.id == action.payload ? ({...user, isLoggedIn: true}) : (user));
        },  
    }
})

export const {addUser, removeUser, chooseUser} = userSlice.actions;
export default userSlice.reducer;