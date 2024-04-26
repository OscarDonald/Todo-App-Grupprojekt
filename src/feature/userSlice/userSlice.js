import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [
    {
        isLoggedIn: true,
        id: nanoid(),
        name: 'Jens Bengtsson',
        initials: "JB",
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    },
    {
        isLoggedIn: false,
        id: nanoid(),
        name: 'Emil Winberg',
        initials: "EW",
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    },
    {
        isLoggedIn: false,
        id: nanoid(),
        name: 'Oscar Donaldson',
        initials: "OD",
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    },
    {
        isLoggedIn: false,
        id: nanoid(),
        name: 'Nyat Ghirmazion',
        initials: "NG",
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    },
    {
        isLoggedIn: false,
        id: nanoid(),
        name: 'David Heidari',
        initials: "DH",
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
    },
    {
        isLoggedIn: false,
        id: nanoid(),
        name: 'Toleen Alrifai',
        initials: "TA",
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
            // Array med alla isLoggedIn = false
            const deactivatedState = state.users.map(user => ({...user, isLoggedIn: false}));
            // Hitta användaren som valts
            // Uppdatera vald user till isLoggedIn = true
            state.users = deactivatedState.map(user => user.id == action.payload ? ({...user, isLoggedIn: true}) : (user));
            localStorage.setItem('users', JSON.stringify(state.users));
        },  
    }
})

export const {addUser, removeUser, chooseUser} = userSlice.actions;
export default userSlice.reducer;