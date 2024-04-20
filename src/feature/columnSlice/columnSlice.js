import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    columns: [
        { 
            id: 1, 
            title: 'Todo',
            tasks: [],
        },
        { 
            id: 2, 
            title: 'Doing',
            tasks: [],
        },
        { 
            id: 3, 
            title: 'Done',
            tasks: [],
        },
    ],
}

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        // Creates a new column object and adds it to the columns state
        addColumn: (state) => {
            const column = {
                title: 'New List',
                id: nanoid(),
                tasks: [],
            }
            state.columns.push(column);
        },
        // Filters the columns state to remove chosen column by ID
        removeColumn: (state, action) => {
            state.columns = state.columns.filter((column) => column.id !== action.payload);
        },
        //Copies column name and tasks but has unique ID
        copyColumn: (state, action) => {
            const columnToCopy = state.columns.find(column => column.id === action.payload);
            state.columns.push({...columnToCopy, id: nanoid()});
        },
        // Creates new columns array
        // Finds chosen column object and index
        // If-statement to determine whether to move column left or right with check to make sure next index is valid
        // Insert chosen column at prev/next index
        // Set state
        moveColumn: (state, action) => {
            const newColumns = [...state.columns];
            const columnIndex = state.columns.findIndex(column => column.id === action.payload.id);
            const columnToMove = newColumns.splice(columnIndex, 1)[0];

            if (action.payload.direction === 'left' && columnIndex !== 0) {
                newColumns.splice(columnIndex - 1, 0, columnToMove);
            } else if (action.payload.direction === 'right' && columnIndex !== state.columns.length - 1) {
                newColumns.splice(columnIndex + 1, 0, columnToMove);
            }
            else return
            state.columns = newColumns;
        },
        // Go through columns-array and swap updated object
        // Set state
        updateTitle: (state, action) => {
            const updatedColumns = state.columns.map(column => (
                column.id === action.payload.id ? {...column, title: action.payload.title } : column
            ));
            state.columns = updatedColumns;
        }
    }
})

export const { addColumn, removeColumn, copyColumn, moveColumn, updateTitle } = columnSlice.actions; // reducer funcionerna i taskSlice som expoteras
export default columnSlice.reducer;