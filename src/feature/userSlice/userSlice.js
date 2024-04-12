import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        isLoggedIn: true,
        id: '1',
        name: 'Jens',
        tasks: [/*filtrerade taskSlice staten för vilka som är 'responsible' */],
}]

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // addUser(),
        // removeUser(),
        // chooseUser:,
    }
})

export const {/* funktionerna i userslice */} = userSlice.actions;
export default userSlice.reducer;