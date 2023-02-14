import React, {useState} from "react";
import styled from 'styled-components';
import { faTimes, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &.done{
    color : rgba(100,100,100);
    text-decoration: line-through rgba(100,100,100);
  }
  >input[type=text]{
    width: 100%;
    background-color: transparent;
    border: transparent;
    font-size: 1.4rem;
    /* line-height: 1.4rem; */
  }
  .todoContent{
    width:100%;
  }
  >button{
    font-size: 1.2rem;
    background-color: transparent;
    border-color: transparent;
    width: 1rem;
    margin-left: 1rem;
  }
`
const Checkbox = styled.div`

`


const TodoList = ({todoLists, setTodoLists, list, idx}) => {
  const setIsDoneHandler = (e, key) => {
    let selectedData = todoLists[key]
    selectedData = {...selectedData,isDone: !selectedData.isDone }
    setTodoLists([...todoLists.slice(0,key),selectedData,...todoLists.slice(key+1)]) //!
  }
  const eraseList = (key) => {
    let filtered = todoLists.filter((list,idx)=> idx !== key)
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
  const changeTaskHandler = (list) => {
    const seletedTodo = todoLists.filter((ele)=> ele.id === list.id)[0]
    const idx = todoLists.indexOf(seletedTodo);
    const changedTodo = {
      id: list.id,
      content: changedContent,
      isDone: list.isDone,
      date: list.date,
      tag: list.tag
    }
    setTodoLists([...todoLists.slice(0,idx),changedTodo,...todoLists.slice(idx+1)])
    setEditMode(!editMode)
  }

  return(
    <>
      <List className={list.isDone ?"done" :null}>
        <Checkbox>
          <input id={list.id} type='checkbox' checked={list.isDone} onChange={(e)=>setIsDoneHandler(e, idx)} />
          <label for={list.id}>
            <span>
              <svg width="14px" height="12px" viewBox="0 0 14 12">
                <polyline points="1 7.6 5 11 13 1" fill="none" stroke="black" strokeWidth="2" />
              </svg>

            </span>
          </label>
        </Checkbox>

        {editMode === true
        ? <input 
            type="text"
            value={changedContent}
            placeholder={changedContent}
            onChange={changeContentHandler}  
          />
        : <div className="todoContent">{list.content}</div>
        }
        {editMode === true
        ? <button onClick={()=>changeTaskHandler(list)}><FontAwesomeIcon icon={faCheck} size="lg" /></button>
        : <button onClick={editModeHandler}><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button>
        }
        <button onClick={()=>eraseList(idx)}><FontAwesomeIcon icon={faTimes} size="lg" /></button>
      </List>
    </>

  )
}


export default TodoList;