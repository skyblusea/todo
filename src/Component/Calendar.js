import React from "react";
import styled from 'styled-components';


const MonthName = styled.h1`
  position: absolute;
  top: 10%;
  width: 100%;
  
`


const Calendar = () => {
  let now = new Date();
  let aaa= new Intl.DateTimeFormat('en-US',{month: "short", day: "numeric"}).format(now);

  return (
  <>
    
    <MonthName></MonthName>
  </>
  );
};

export default Calendar;