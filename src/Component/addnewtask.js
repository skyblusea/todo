import React, { useState } from 'react';
import styled from 'styled-components';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  position: absolute;
  /* 왼쪽이 0인데 오른쪽도 0? 쫙 늘어남 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99; // 토글이 보여서
  /* background-color: rgba(0,0,0,0.1); */
`;

const AddTodoWindow = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute; // 위치잡기 너무 어렵 ㅠㅠ
  bottom: 0px;
  height: 35vh;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: rgba(220,220,220);
  border-radius: 15px 15px 0 0;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 100;
  animation: moveFromBottom .7s ease both;
  @keyframes moveFromBottom {
    from { -webkit-transform: translateY(100%); transform: translateY(100%); }
  }
  >input[type=text]{
    height: 3rem;
    border: none;
    background-color: transparent;
    user-select: none;
    font-size: 2rem;
    margin-bottom: 5px;
  }
  >input[type=text]::placeholder{
    font-size: 2rem;
  }
  >input[type=date]{
    height: 30px;
    border: none;
    background-color: transparent;
    user-select: none;
    font-size: 1.5rem;
    position:relative; //이거 없으면 창 전체가 날짜선택 활성화 됨
    margin-bottom: 10px;
  }
  >input[type=date]::-webkit-calendar-picker-indicator{
    position:absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
  >input:focus{
    outline: none;
  }    
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
>button{
    user-select: none;
    border: 0px solid transparent;
    background-color: transparent;
    width: 20px;
    height: 20px;
    font-size: 1.5rem; 
    margin: 0px;
    padding: 0px;
    background-color: transparent;
    cursor: grab;
  }
`
const Options = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
`
const Option = styled.div`
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid black;
  &.selectedOption{
    background-color: black;
    color: white;
  }
`

const AddNewTask = ({setTodoLists, todoLists, openModalHandler, setIsOpen, selectedDate}) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState(selectedDate)
  //const [date, setDate] = useState(new Date().toLocaleString('ko-KR')) 로 하면 디폴드값이 설정이 안됨 2022-11-23 이런형식이어야함
  //날짜 이동시 기본 날짜도 해당 날짜로 하기 위해 new Date().toISOString().substring(0,10) 에서 수정함
  const [tag, setTag] = useState('할일')
  const [checkOption, setCheckOption] = useState({
    todo: true,
    habbit: false,
    event: false,
  })
  const addTaskHandler = () => {
    const newTask = {
      id: date+todoLists.length,
      date: date,
      content: content,
      isDone: false
    }
    setTodoLists([...todoLists, newTask])
    setIsOpen(false)
    setContent('')
    setDate(selectedDate)
  }
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleDateChange = (e) => {
    setDate(e.target.value)
  }
  const handleCheckChange = (tag) => {
    let options={
      todo: false,
      habbit: false,
      event: false,
    }
    options[tag]=true
    setCheckOption(options)
  }
  //삽질했네 checkbox 말고 Radio하면 되는데
  return (
    <>
      <AddTodoWindow onClick={e => e.stopPropagation()}>
        <Buttons>
          <button onClick={openModalHandler}><FontAwesomeIcon icon={faTimes}/></button>
          <button onClick={addTaskHandler}><FontAwesomeIcon icon={faCheck}/></button>    
        </Buttons>    
        <input 
          type="text"
          value={content}
          placeholder="내용을 입력하세요"
          onChange={handleContentChange}
        />
        <input type="date" value={date} onChange={handleDateChange}/>
        <Options>
          <Option className={checkOption.todo ?"selectedOption" :null} onClick={()=>handleCheckChange("todo")}>할일</Option>
          <Option className={checkOption.habbit ?"selectedOption" :null} onClick={()=>handleCheckChange("habbit")}>습관</Option>
          <Option className={checkOption.event ?"selectedOption" :null} onClick={()=>handleCheckChange("event")}>일정</Option>
          {/* div는 value 속성 안씀 */}
        </Options>
      </AddTodoWindow>
      <ModalBackdrop onClick={openModalHandler} />
    </>
  );
};

export default AddNewTask;
