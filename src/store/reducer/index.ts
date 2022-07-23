
import { combineReducers } from 'redux';
import { checkedNotesReducer } from './CheckedNotesReducer/reducer';
import { contentReducer } from './ContentReducer/reducer';
import { currentNoteReducer } from './CurrentNoteReducer/reducer';
import { labelReducer } from './LabelReducer/reducer';
import { listStyleReducer } from './ListStyleReducer/reducer';
import { modalsReducer } from './ModalsReducer/reducer';
import { noteReducer } from './NoteReducer/reducer'
import { sidebarReducer } from './SidebarReducer/reducer';
import { tasksReducer } from './TaskReducer/reducer';
import { trashReducer } from './TrashReducer/reducer';


export const rootReducer = combineReducers({
    notes: noteReducer,
    tasks: tasksReducer,
    content: contentReducer,
    trash: trashReducer,
    label: labelReducer ,
    modals: modalsReducer,
    listStyle: listStyleReducer,
    sidebarOpen: sidebarReducer, 
    currentNote: currentNoteReducer,
    checkedNotes: checkedNotesReducer, 
})

export type RootState = ReturnType<typeof rootReducer>