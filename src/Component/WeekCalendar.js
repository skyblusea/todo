import React from 'react';
import styled from 'styled-components';


const WeekContainer = styled.section`
  padding: 0 40px 0 40px;
  font-family:'Lato';
  margin: 30px 0 30px 0;
`
const Days = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: rgba(150, 150, 150);
  >div{
    width:2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >div:nth-child(1){
    color: rgba(250, 150, 150);
  }
  >div:nth-child(7){
    color: rgba(100, 150, 250);
  }
`
const Scroll = styled.div`
/* 상위 absolute 후 자식 relative 해야 내가 원하는 방식으로 된다 */
  position: absolute;
  margin: 0 40px 0 40px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  >div{
    position: relative;
    flex: 0 0 100%;    
    width : 100%;
    display: flex;
    justify-content: space-between;
    scroll-snap-align: center;
  }
  .selectedDay{
    color:white;
    background-color: black;
  }
`
const Ele = styled.div`
    height: 2.5rem;
    line-height: 2.5rem; //약간 미묘하게 아래로 쳐져있는 text 를 가운데 정렬
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: grab;
`


const WeekCalendar = ({selectedDate, setDate}) => {
  const day= new Date(selectedDate);
  const currentDate=new Intl.DateTimeFormat('en-GB', {day: "numeric"}).format(day);
  const currentDay=day.getDay();
  const lastDate=new Date(selectedDate.substring(0,4),selectedDate.substring(5,7),0).getDate()
  const lastMonthLastDate=new Date(selectedDate.substring(0,4),Number(selectedDate.substring(5,7))+1,0).getDate()
  const monthNums=[...new Array(lastDate)].map((ele,idx)=>{return idx+1})
  const firstDay=new Date(selectedDate.substring(0,4),selectedDate.substring(5,7),1).getDay()
  const lastDay=new Date(selectedDate.substring(0,4),selectedDate.substring(5,7),lastDate).getDay()
  if(firstDay !== 7){
    for(let n=0; n<firstDay; n++){
      monthNums.unshift(lastMonthLastDate-n)
    }
  }
  if(lastDay !== 6){
    for(let n=1; n<7-lastDay; n++){
      monthNums.push(n)
    }
  }
  const seperatedNums = []
  for(let n=0; n<monthNums.length/7; n++){
    seperatedNums.push(monthNums.slice(n*7,n*7+7))
  }
  // let before =[]
  // let after = []
  let cD = Number(currentDate)
  // if(currentDay !== 7){
  //   for(let n=1; n<=currentDay; n++){
  //     before.unshift(cD-n)
  //   }
  // }
  // if(currentDay !== 6){
  //   for(let n=1; n<7-currentDay; n++){
  //     after.push(cD+n)
  //   }
  // }
  // const currentWeek=[...before,cD,...after]
  const moveDateHandler = (date) => {
    //숫자를 1자리 수로 표시했더니 ㅠㅠㅠㅠㅠ toLocalstring 으로 2자리 수가 되게 변환하자
    setDate(selectedDate.substring(0,8)+date.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    }))
  }
  // const currentMonth = new Intl.DateTimeFormat('en-GB', {month: 'long'}).format(day)
  return (
    <>
      <WeekContainer>
        <Days><div>s</div><div>m</div><div>t</div><div>w</div><div>t</div><div>f</div><div>s</div></Days>
        <Scroll>
          {seperatedNums.map((arr)=>{
            return <div>{arr.map((date)=>{
              return <Ele className={date===cD ?"selectedDay" :null} onClick={()=>moveDateHandler(date)}>{date}</Ele>
            })}</div>
          })}
        </Scroll>
      </WeekContainer>
    </>
  );
};

export default WeekCalendar;