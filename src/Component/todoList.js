import React, {useState} from "react";
import styled from 'styled-components';
import { faTimes, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const TodoList = ({todoLists, setTodoLists, list, idx}) => {
  const setIsDoneHandler = (e, key) => {
    let selectedData = todoLists[key]
    selectedData = {...selectedData,isDone: !selectedData.isDone }
    setTodoLists([...todoLists.slice(0,key),selectedData,...todoLists.slice(key+1)]) //!
  }
  const eraseList = (key) => {
    let filtered = todoLists.filter((list, idx)=> idx !== key)
    setTodoLists(filtered)
  }
  const [editMode, setEditMode] = useState(false);
  const editModeHandler = () => {
    setEditMode(!editMode)
  }

  const [changedContent, setChangedContent] = useState(list.content)
  const changeContentHandler = (e) => {
    setChangedContent(e.target.value)
  }
  const changeTaskHandler = (key) => {
    const changedTask = {
      date: list.date,
      content: changedContent,
      isDone: list.isDone
    }
    setTodoLists([...todoLists.slice(0,key),changedTask,...todoLists.slice(key+1)])
    setEditMode(!editMode)
  }


  return(
    <>
      <li key={idx}>
      <input type='checkbox' checked={list.isDone} onChange={(e)=>setIsDoneHandler(e, idx)} />
      {editMode === true
      ? <input 
          type="text"
          value={changedContent}
          placeholder={changedContent}
          onChange={changeContentHandler}  
        />
      : list.content
      }
      {editMode === true
      ? <button onClick={()=>changeTaskHandler(idx)}><FontAwesomeIcon icon={faCheck} size="lg" /></button>
      : <button onClick={editModeHandler}><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button>
      }
      <button onClick={()=>eraseList(idx)}><FontAwesomeIcon icon={faTimes} size="lg" /></button>
      </li>
    </>

  )
}


export default TodoList;