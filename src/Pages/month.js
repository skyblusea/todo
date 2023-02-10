import React, {useState} from "react";
import styled from 'styled-components';
import MenuToggle from "../Component/MenuToggle";

const MonthContainer = styled.section`
    display: flex;
    height: 100%;
`

const MenuBtn = styled.button`
  position: absolute;
  display: block;
  float: left;
  width: 25px;
  border: 0px solid transparent;
  background-color: transparent;
  white-space: nowrap;
  cursor: pointer; 
  z-index: 100;
  /* margin: 1% 0 1% 1.6%; */
  &.active{
    right: 20px; //absolute 에서 transition 을 주려면 notActive 도 right 값이 존재해야함. left right 따로 쓰면 안나옴 
    top: 20px;
    transition: all 0.7s ease;
    /* animation: moveFromLeft 3s ease both;으로 하면 trasnlateX(-1000%)정도는 해야함... */
  }
  &.notActive{
    right: calc(100% - 40px);
    top: 20px;
    transition: all 0.7s ease;
  }
  div{
    height: 3.5px;
    background-color: #3c3c60;
    transition: all 0.2s ease-in-out 0s;
  }
  .menu_line{
    margin-bottom: 4px;
  }
  .menu_line_active_t{
    transform: translateY(3px) rotate(45deg);
    transition: all 0.2s ease-in-out 0s;
  }
  .menu_line_active_m{
    opacity: 0;
  }
  .menu_line_active_b{
    transform: translateY(-3px) rotate(-45deg);
    transition: all 0.2s ease-in-out 0s;   
  }
`



const Month = ({openTodayHandler}) => {
    const [isClick, setIsClick] = useState(false);
    const menuHandler = () => {
        setIsClick(!isClick)
    }
    return (
    <>
    <MonthContainer>
        <MenuBtn onClick={menuHandler} className={isClick ?"active" :"notActive"}>
            <div className={isClick ?"menu_line_active_t" :"menu_line"}></div>
            <div className={isClick ?"menu_line_active_m" :"menu_line"}></div>
            <div className={isClick ?"menu_line_active_b" :"menu_line_b"}></div>
        </MenuBtn>
        {isClick 
        ?<MenuToggle openTodayHandler={openTodayHandler} isClick={isClick}/>
        :null
        }
    </MonthContainer>
    </>
    );
  };
  
export default Month;