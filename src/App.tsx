import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypeSelector } from './hooks/useTypeSelector';

import { fetchNotes } from './store/action-creators/notes';
import { fetchTasks } from './store/action-creators/tasks';
import {ContentActionType} from './store/reducer/ContentReducer/contentInterface'
import { fetchLabel } from './store/action-creators/label';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import ModalLabel from './components/ModalLabel';
import FormEditingNotes from './components/FormEditingNotes';

import Main from './pages/Main';
import SearchBlock from './pages/Search';
import Archive from './pages/Archive';
import Trash from './pages/Trash';
import Label from './pages/Label';

import checkDevice from './script/checkDevice';

import './App.scss';
import './scss/animation.scss';

export enum RoutePaths {
  MAIN = '/',
  ARCHIVE = 'archive',
  TRASH = 'trash'
}

function App() {
  // localStorage.clear()
  const dispatch = useDispatch<any>()

  const notes = useTypeSelector(state => state.notes);
  const tasks = useTypeSelector(state => state.tasks);

  const currentNote = useTypeSelector(state => state.currentNote);

  const sidebarOpen = useTypeSelector(state => state.sidebarOpen);
  

  const [checkedNotes, setCheckedNotes] = useState<string[]>([]);

  
  const [modalLabel, setModalLabel] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch({
      type: ContentActionType.INITIAL_CONTENT,
      payload: {tasks: tasks.data, notes: notes.data}
    })
  }, [notes.data, tasks.data])

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchTasks());
    dispatch(fetchLabel())
  }, [])
  return (
    <div className={`App notes ${checkDevice()}`}>
      <Board />
      <Header 
        loading={notes.loading || tasks.loading ? true : false}
        
      />  
      <Sidebar  setModalLabel={setModalLabel}/>
      <div className={`App__wrapper ${sidebarOpen ? 'mob' : ''}`}>
        
        <Routes>
          <Route path='/' element={
            <Main />
          } />
          <Route path='search' element={
            <SearchBlock />
          }/>
          <Route path='archive' element={
            <Archive />
          }/> 
          <Route path='trash' element={
            <Trash />
          } />

          <Route path='label/:id' element={
            <Label />
          }/>

        </Routes>

      </div>
      {
        currentNote ? ( 
           <FormEditingNotes 
               note={currentNote}
           />) : null 
      }
      {modalLabel ? <ModalLabel setModalLabel={setModalLabel}/> : null}
      
    </div>
  );
}

export default App;
