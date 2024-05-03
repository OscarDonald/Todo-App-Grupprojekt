import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [
    {
        isLoggedIn: true,
        id: "1",
        name: 'Jens Bengtsson',
        initials: "JB",
    },
    {
        isLoggedIn: false,
        id: "2",
        name: 'Emil Winberg',
        initials: "EW",
    },
    {
        isLoggedIn: false,
        id: "3",
        name: 'Oscar Donaldson',
        initials: "OD",
    },
    {
        isLoggedIn: false,
        id: "4",
        name: 'Nyat Ghirmazion',
        initials: "NG",
    },
    {
        isLoggedIn: false,
        id: "5",
        name: 'David Heidari',
        initials: "DH",
    },
    {
        isLoggedIn: false,
        id: "6",
        name: 'Toleen Alrifai',
        initials: "TA",
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
                name: action.payload.name,
                initials: action.payload.initials,
                tasks: []
            }
            state.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        chooseUser: (state, action) => {
            // Array with all isLoggedIn = false
            const deactivatedState = state.users.map(user => ({...user, isLoggedIn: false}));
            // Find chosen user
            // Uodate chosen user to isLoggedIn = true
            state.users = deactivatedState.map(user => user.id == action.payload ? ({...user, isLoggedIn: true}) : (user));
            localStorage.setItem('users', JSON.stringify(state.users));
        },  
    }
})

export const {addUser, removeUser, chooseUser} = userSlice.actions;
export default userSlice.reducer;