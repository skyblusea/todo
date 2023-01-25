import React from "react";
import styled from 'styled-components';
import MenuToggle from "../Component/MenuToggle";

const MonthContainer = styled.section`
    display: flex;
    height: 100%;
`





const Month = () => {


    return (
        <>
            <MonthContainer>
                <MenuToggle/>

                
            </MonthContainer>

        </>
    );
  };
  
export default Month;