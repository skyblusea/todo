import React, {useState} from "react";
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AddNewTask from '../Component/addnewtask' 
import TodoList from "../Component/todoList";
import WeekCalendar from "../Component/WeekCalendar";
import { initialState } from "../Data/Dummydata";
import { useNavigate } from "react-router-dom";


const TodayContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; 
  .closeTodayButton{
    display: flex;
    justify-content: center;
    font-size: 1rem;
    margin-top: 10px;
    text-decoration: none;
    color: black;
  }
  &.openToday{
    animation: moveFromBottom .7s ease both;
  }
  &.closeToday{
    animation: moveFromTop .7s ease both;
  }
  @keyframes moveFromBottom {
    from { -webkit-transform: translateY(100%); transform: translateY(100%); }
  }
  @keyframes moveFromTop {
    from {}
    to {-webkit-transform: translateY(100%); transform: translateY(100%);}
  };
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
  right: 2rem;
  bottom: 2rem;
`;
const TodayString = styled.div`
  font-family: "Lato";
  font-size: 2rem;
  margin: 10px 0 30px;
`

const Today = () => {
  const navigate = useNavigate();
  const [todoLists, setTodoLists] = useState(initialState.todos)
  const [isOpen, setIsOpen] = useState(false);
  const [closeToday, setcloseToday] = useState(false)

  const openModalHandler = () => {
    setIsOpen(!isOpen)
  };
  const [selectedDate, setDate] = useState(new Date().toISOString().substring(0,10));

  const today= new Date(selectedDate);
  const todayString = new Intl.DateTimeFormat('en-US',{month: "short", day: "numeric"}).format(today);
  const closeTodayHandler = () => {
    setcloseToday(!closeToday)
    setTimeout(()=>{
      //openTodayHandler();//함수가 끝나기 전이라 closeToday의 상태가 아직 안바뀌어있음 위와 같은 상태 
      setcloseToday(false) //false 로 고정 
      navigate("/");
    }, 300)//today 닫는 애니메이션을 위한 딜레
  }

  return (
    <>
      <TodayContainer className={closeToday ?"closeToday" :"openToday"}>
        {/* link로 하면 바로 이동하기 때문에 애니메이션이 나오지 않는다 onclick 에 settimeout 해주고 usenavigate로 이동시키자 */}
        <div className="closeTodayButton" onClick={closeTodayHandler}><FontAwesomeIcon icon={faChevronDown} /></div>
        <WeekCalendar selectedDate={selectedDate} setDate={setDate} today={today}/>
        <TodoLists>
        <TodayString>{todayString}</TodayString>
          {/* filter로 오늘 날짜 */}
            {todoLists.filter((list)=>
              list.date === selectedDate
            ).map((list, idx)=>{
              return <TodoList 
                key={list.id}
                idx={idx} 
                list={list} 
                setTodoLists={setTodoLists}
                todoLists={todoLists} />
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

  