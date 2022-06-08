import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useTypeSelector } from './hooks/useTypeSelector';

import { fetchNotes } from './store/action-creators/notes';
import { fetchTasks } from './store/action-creators/tasks';
import {ContentActionType} from './store/reducer/ContentReducer/contentInterface'

import ITaskNote from './types/task';
import INote from './types/note';

import CreateNote, { types } from './components/FormCreateNote';
import Header from './components/Header';
import Note from './components/Note';
import Sidebar from './components/Sidebar';
import Loading from './components/UI/Loading';
import Board from './components/Board';
import Main from './components/Main';
 

import checkDevice, { device } from './script/checkDevice';

import './App.scss';
import './scss/animation.scss';



function App() {

  const dispatch = useDispatch<any>()

  const notes = useTypeSelector(state => state.notes);
  const tasks = useTypeSelector(state => state.tasks);

  const [checkedNotes, setCheckedNotes] = useState<string[]>([]);

  const [currentDivice, setCurrentDivice] = useState<string>('')
  const [openSidebar, setOpenSidebar] = useState<boolean>((currentDivice === device.DESKTOP) ? true : false);
  
  
  useEffect(() => {
    dispatch({
      type: ContentActionType.INITIAL_CONTENT,
      payload: {tasks: tasks.data, notes: notes.data}
    })
  }, [notes.data, tasks.data])
  
  useEffect(() => {
    setCurrentDivice(checkDevice())
    dispatch(fetchNotes());
    dispatch(fetchTasks());
  }, [])
  
  return (
    <div className={`App notes ${checkDevice()}`}>
      <Board 
        checkedNodes={checkedNotes}  
        setCheckedNotes={ (items) => setCheckedNotes(items)}
      />
      <Header 
        loading={notes.loading || tasks.loading ? true : false}
        handlerOpenSidebar={() => setOpenSidebar(!openSidebar)}
      />  
      <div className="App__wrapper">
        <Sidebar open={openSidebar}/>
        <Main  
          checkedNotes={checkedNotes}
          setCheckedNotes={setCheckedNotes}
        />
      </div>
      
      
    </div>
  );
}

export default App;
