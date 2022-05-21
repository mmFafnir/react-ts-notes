import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useTypeSelector } from './hooks/useTypeSelector';

import { fetchNotes } from './store/action-creators/notes';
import { fetchTasks } from './store/action-creators/tasks';

import ITaskNote from './types/task';
import INote from './types/note';

import CreateNote, { types } from './components/CreateNote';
import Header from './components/Header';
import Note from './components/Note';
import Sidebar from './components/Sidebar';
import Loading from './components/UI/Loading';

import './App.scss';
import './scss/animation.scss';
import Board from './components/Board';




function App() {

  const dispatch = useDispatch<any>()

  const notes = useTypeSelector(state => state.notes);
  const tasks = useTypeSelector(state => state.tasks);

  // console.log(notes.data)
  // console.log(tasks.data)

  const [content, setContent] = useState<any[]>([]);

  const [checkedNotes, setCheckedNotes] = useState<string[]>([]);

  useEffect(() => {
      setContent([
      ...notes.data, ...tasks.data
    ])
  }, [notes.data, tasks.data])
  console.log('1')
  useEffect(() => {
    dispatch(fetchNotes())
    dispatch(fetchTasks())
     
  }, [])
  return (
    <div className="App notes">
      <Board 
        checkedNodes={checkedNotes}  
        setCheckedNotes={(items) => setCheckedNotes(items)}
        content={content} 
        setContent={(notes) => setContent(notes)}
      />
      <Header />  
      <div className="App__wrapper">
        <Sidebar />
        <main style={{margin: '20px auto', flex: "1 1 auto"}}>
          <CreateNote />  
          <div className="notes__body">
            {
              content.sort((a, b) => a.id - b.id).map((item, index) => {
                if(item.type === types.NOTE) {
                  return (
                    <Note 
                      key={item.id}
                      id={item.id} 
                      title={item.title}
                      text={item.text}
                      time={item.time}
                      color={item.color}
                      type={item.type}
                      setCheckedNotes={(note) => setCheckedNotes(note)}
                      checkedNotes={checkedNotes}
                    />
                  ) 
                }
                if(item.type === types.TASK){
                  return (
                    <Note 
                      key={item.id + 'tasks'}
                      id={item.id} 
                      title={item.title}
                      tasks={item.tasks}
                      time={item.time}
                      color={item.color}
                      type={item.type}
                      setCheckedNotes={(note) => setCheckedNotes(note)}
                      checkedNotes={checkedNotes}
                    />
                  )
                }
              })

            }
          </div>
        </main>
      </div>
      {
        (tasks.loading || notes.loading) ? <Loading /> : null 
      }
      
    </div>
  );
}

export default App;
