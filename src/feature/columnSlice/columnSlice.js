import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    columns: [
        { id: 1, title: 'To Do' },
        { id: 2, title: 'Doing' },
        { id: 3, title: 'Done' }
    ],
}

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        addColumn: (state, action) => {
            const column = {
                title: 'New List',
                id: nanoid(),
            }
            state.columns.push(column);
        },
        removeColumn: (state, action) => {
            state.columns = state.columns.filter((column) => column.id !== action.payload);
        },
        copyColumn: (state, action) => {
            const columnToCopy = state.columns.find(column => column.id === action.payload);
            state.columns.push({ id: nanoid(), title: columnToCopy.title });
        },
        moveColumn: (state, action) => {
            const columnIndex = state.columns.findIndex(column => column.id === action.payload.id);
            const columnToMove = state.columns.find(column => column.id === action.payload.id);
            const newColumns = [...state.columns];
            // const columnToMove = newColumns.splice(columnIndex, 1);
            console.log(columnToMove)
            if (action.payload.direction === 'left' && columnIndex === 0) {
                newColumns.splice(columnIndex - 1, 0, columnToMove);
            } else if (action.payload.direction === 'right' && columnIndex === state.columns.length - 1) {
                newColumns.splice(columnIndex + 1, 0, columnToMove);
            }
            console.log(newColumns)
            state.columns = newColumns;
        }

    }
})

export const { addColumn, removeColumn, copyColumn, moveColumn } = columnSlice.actions; // reducer funcionerna i taskSlice som expoteras
export default columnSlice.reducer;