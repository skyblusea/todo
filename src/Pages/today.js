import React, {useState} from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AddNewTask from '../Component/addnewtask' 
import TodoList from "../Component/todoList";
import WeekCalendar from "../Component/WeekCalendar";
import { initialState } from "../Data/Dummydata";

const TodayContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; 
`
const TodoLists = styled.ul`
  font-size: 1.4rem;
  padding: 0 40px 0 40px;
  list-style: none;
`
const ModalBtn = styled.button`
  background-color: transparent;
  text-decoration: none;
  border: none;
  color: black;
  border-radius: 50%;
  cursor: grab;
  position: fixed;
  right: 84px;
  bottom: 52px;
`;
const TodayString = styled.div`
  font-family: "Lato";
  font-size: 2rem;
  margin: 10px 0 30px;
`

const Today = () => {
  const [todoLists, setTodoLists] = useState(initialState.todos)
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen)
  };
  const [selectedDate, setDate] = useState(new Date().toISOString().substring(0,10));
  const today= new Date(selectedDate);
  const todayString = new Intl.DateTimeFormat('en-US',{month: "short", day: "numeric"}).format(today);

  return (
    <>
      <TodayContainer>
        <WeekCalendar selectedDate={selectedDate} setDate={setDate} today={today}/>
        
        <TodoLists>
        <TodayString>{todayString}</TodayString>
          {/* filter로 오늘 날짜 */}
            {todoLists.filter((list)=>
              list.date === selectedDate
            ).map((list, idx)=>{
              return <div><TodoList 
                idx={idx} 
                list={list} 
                setTodoLists={setTodoLists}
                todoLists={todoLists} /></div>
              })}
        </TodoLists>
        <ModalBtn onClick={openModalHandler}><FontAwesomeIcon icon={faPlus} size="2xl" /></ModalBtn>
        {isOpen 
        ? <AddNewTask selectedDate={selectedDate} todoLists={todoLists} setTodoLists={setTodoLists} isOpen={isOpen} setIsOpen={setIsOpen} openModalHandler={openModalHandler} />
        :null}
      </TodayContainer>
    </>
  )
}

export default Today;

  