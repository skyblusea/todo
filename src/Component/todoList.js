import React, {useState} from "react";
import styled from 'styled-components';
import { faTimes, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  >input[type=text]{
    width: 100%;
    background-color: transparent;
    border: transparent;
    font-size: 1.4rem;
    /* line-height: 1.4rem; */
  }
  .todoContent{
    width: 100%;
    padding: 0 3px 0 3px;
    cursor:pointer;
    position:relative;
    :after{
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 0.1rem;
      background: rgba(150, 150, 150);
    }
    &.done{
      color : rgba(150, 150, 150);
      transition: color 0.4s ease;
      :after{
        width: 100%;
        transition: all 0.4s ease;
      }
    }
  }
  .todoContent + div {
    width: 100%;
    /* 수정 삭제 아이콘 정렬을 위해 */
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
  /* 체크박스는 숨기고 라벨로 꾸미기 */
  input[type="checkbox"]{
    visibility: hidden;
    display: none;
  }
  >label{
    display: flex;
    width: 1rem;
    height: 1rem;
    margin-right: 6px;
    border: 0.1rem solid #c8ccd4;
    border-radius: 50%;
    cursor: pointer;
  }
  input:checked + label{
    border-color: transparent;
  }
  .svg{
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 0.1rem;
    transform: scale(0);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  input:checked + label svg{
    /* input:checked 와 같은 부모를 공유하고 있는 label 의 자식요소 svg */
    transform: scale(1);
    transition: all 0.4s ease;
    transition-delay: 0.1s;
  }
  polyline{
    stroke: #18cda6;
    stroke-width: 2;
    fill:none;
  }

`


const TodoList = ({todoLists, setTodoLists, list, idx}) => {
  const setIsDoneHandler = (e, key) => {
    const selectedTodo = todoLists.filter((ele)=> ele.id === list.id)[0]
    const idx = todoLists.indexOf(selectedTodo);
    const changedIsDone = {...selectedTodo,isDone: !selectedTodo.isDone }
    setTodoLists([...todoLists.slice(0,idx),changedIsDone,...todoLists.slice(idx+1)]) //!
  }
  const eraseList = (key) => {
    let filtered = todoLists.filter((ele)=> ele.id !== key)
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
    const selectedTodo = todoLists.filter((ele)=> ele.id === list.id)[0]
    const idx = todoLists.indexOf(selectedTodo);
    const changedTodo = {
      ...selectedTodo,
      content: changedContent
    }
    setTodoLists([...todoLists.slice(0,idx),changedTodo,...todoLists.slice(idx+1)])
    setEditMode(!editMode)
  }

  return(
    <>
      <List>
        <Checkbox>
          <input id={list.id} type='checkbox' checked={list.isDone} onChange={(e)=>setIsDoneHandler(e, list.id)} />
          <label for={list.id}>
            <svg className="svg">
              <polyline points="1 7.6 5 11 13 1"/>
            </svg>
          </label>
        </Checkbox>

        {editMode
        ? <input 
            type="text"
            value={changedContent}
            placeholder={changedContent}
            onChange={changeContentHandler}  
          />
        : <label for={list.id} className={`todoContent${list.isDone ?" done":""}`}>{list.content}</label>
        }
        <div />
        {editMode
        ? <button onClick={()=>changeTaskHandler(list)}><FontAwesomeIcon icon={faCheck} size="lg" /></button>
        : <button onClick={editModeHandler}><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button>
        }
        <button onClick={()=>eraseList(list.id)}><FontAwesomeIcon icon={faTimes} size="lg" /></button>
      </List>
    </>

  )
}


export default TodoList;