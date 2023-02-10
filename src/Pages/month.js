import React, {useState} from "react";
import styled from 'styled-components';
import MenuToggle from "../Component/MenuToggle";

const MonthContainer = styled.section`
    display: flex;
    height: 100%;
`





const Month = ({closeToday, setcloseToday}) => {
    const openTodayHandler = () => {
        setcloseToday(!closeToday)
      }
    return (
        <>
            <MonthContainer>
                <MenuToggle openTodayHandler={openTodayHandler}/>              
            </MonthContainer>

        </>
    );
  };
  
export default Month;