import React, {useState, useEffect} from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AddNewTask from '../Component/addnewtask' 
import TodoList from "../Component/todoList";

const TodayContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; 
`

const DayCalendar = styled.section`
  height: 100px;
`
const Days=styled.div`
  display: flex;
  flex-direction: row;
`
const SelectedDay= styled.div`

`

const TodoLists = styled.ul`
  height: 100%;
`
const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  color: black;
  border-radius: 50%;
  cursor: grab;
  position: fixed;
  right: 84px;
  bottom: 52px;
`;

const Today = () => {
  const [todoLists, setTodoLists] = useState([{
      content: '병원 예약하기',
      isDone: false,
      date: '2023-01-10T16:17:47.000Z',
      tag: '할일'
      }])

  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen)
  };

  return (
    <TodayContainer>
    <DayCalendar>
      <Days><div>s</div><div>m</div><div>t</div><div>w</div><div>t</div><div>f</div><div>s</div></Days>
      
      {new Date().toLocaleDateString('ko-KR')}</DayCalendar>
    <TodoLists>
        {todoLists.map((list, idx)=>{
        return <div><TodoList 
          idx={idx} 
          list={list} 
          setTodoLists={setTodoLists}
          todoLists={todoLists} /></div>
        })}
    </TodoLists>
    <ModalBtn onClick={openModalHandler}><FontAwesomeIcon icon={faPlus} size="2xl" /></ModalBtn>
    {isOpen 
    ? <AddNewTask todoLists={todoLists} setTodoLists={setTodoLists} isOpen={isOpen} setIsOpen={setIsOpen} openModalHandler={openModalHandler} />
    :null}
    </TodayContainer>
  )
}

export default Today;

  