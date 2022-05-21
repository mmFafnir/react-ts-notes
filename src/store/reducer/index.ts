
import { combineReducers } from 'redux';
import { noteReducer } from './NoteReducer/reducer'
import { tasksReducer } from './TaskReducer/reducer';

export const rootReducer = combineReducers({
    notes: noteReducer,
    tasks: tasksReducer,
})

export type RootState = ReturnType<typeof rootReducer>