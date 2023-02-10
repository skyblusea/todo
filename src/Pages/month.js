import React, {useState} from "react";
import styled from 'styled-components';
import MenuToggle from "../Component/MenuToggle";

const MonthContainer = styled.section`
    display: flex;
    height: 100%;
    animation: moveFromTop .7s ease both;
    @keyframes moveFromTop {
     from { -webkit-transform: translateY(100%); transform: translateY(100%); }
    }
`





const Month = ({backFromToday}) => {
    return (
        <>
            <MonthContainer className={backFromToday ?"closeMotion" :null}>
                <MenuToggle/>              
            </MonthContainer>

        </>
    );
  };
  
export default Month;