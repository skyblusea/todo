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
`;

const AddTodoWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 800px;
  padding: 20px;
  text-align: center;
  background-color: pink;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 100;
  animation: moveFromBottom .7s ease both;
  >div{
    margin-top: 20px;
    height: 100%;
    font-size: 20px;
  }
  @keyframes moveFromBottom {
    from { -webkit-transform: translateY(100%); transform: translateY(100%); }
  }  
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
>button{
    user-select: none;
    border: 0px solid transparent;
    background-color: transparent;
    width: 20px;
    height: 20px;
    font-size: 15px; 
    margin: 0px;
    padding: 0px;
    background-color: transparent;
    cursor: grab;
  }
`


const AddNewTask = ({setTodoLists, todoLists, openModalHandler, isOpen, setIsOpen}) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toLocaleString('ko-KR'))
  const [tag, setTag] = useState('할일')
  const [checkOption, setCheckOption] = useState({
    todo: true,
    habbit: false,
    event: false,
  })

  const addTaskHandler = () => {
    const newTask = {
      date: date,
      content: content,
      isDone: false
    }
    setTodoLists([...todoLists, newTask])
    setIsOpen(false)
    setContent('')
  }
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleDateChange = (e) => {
    setDate(e.target.value)
  }
  const handleCheckChange = (e) => {
    let options={
      todo: false,
      habbit: false,
      event: false,
    }
    options[e.target.value]=true
    setCheckOption(options)
  }
  // useEffect(() => {
  // }, [checkOption]);


  return (
    <>
      <AddTodoWindow onClick={e => e.stopPropagation()}>
        <Buttons>
          <button onClick={openModalHandler}><FontAwesomeIcon icon={faTimes} size="lg" /></button>
          <button onClick={addTaskHandler}><FontAwesomeIcon icon={faCheck} size="lg" /></button>    
        </Buttons>    
        <input 
          type="text"
          value={content}
          placeholder="할일을 입력하세요"
          onChange={handleContentChange}
        />
        <input type="date" value={date} onChange={handleDateChange}/>
        <input value="todo" type="checkbox" onChange={handleCheckChange} checked={checkOption.todo}/> 할일
        <input value="habbit" type="checkbox" onChange={handleCheckChange} checked={checkOption.habbit}/> 습관
        <input value="event" type="checkbox" onChange={handleCheckChange} checked={checkOption.event}/> 일정
      </AddTodoWindow>
      <ModalBackdrop onClick={openModalHandler} />
    </>
  );
};

export default AddNewTask;
