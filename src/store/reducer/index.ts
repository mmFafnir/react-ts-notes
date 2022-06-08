
import { combineReducers } from 'redux';
import { contentReducer } from './ContentReducer/reducer';
import { noteReducer } from './NoteReducer/reducer'
import { tasksReducer } from './TaskReducer/reducer';

export const rootReducer = combineReducers({
    notes: noteReducer,
    tasks: tasksReducer,
    content: contentReducer
})

export type RootState = ReturnType<typeof rootReducer>