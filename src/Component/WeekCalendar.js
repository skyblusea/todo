import React from 'react';
import styled from 'styled-components';


const WeekContainer = styled.section`
  padding: 0 40px 0 40px;
  font-family:'Lato';
  margin: 30px 0 90px 0;
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
  .IamNotThisMonth{
    color: rgba(200, 200, 200);
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


const WeekCalendar = ({selectedDate, setDate, today}) => {
  const currentDate=new Intl.DateTimeFormat('en-GB', {day: "numeric"}).format(today);
  const currentMonth = today.getMonth()+1;
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
  const moveDateHandler = (date, idx) => {
    //? 숫자를 1자리 수로 표시했더니 2022-02-1로 입력됨... toLocalstring 으로 2자리 수가 되게 변환하자
    //해당 월에 속하지 않으면 월도 다시 설정
    let year = selectedDate.substring(0,4)
    let month = currentMonth
    if(date>=20 && idx<=1){
      month = currentMonth-1
    } else if(date<=7 && idx>=3){
      month = currentMonth+1
    }
    let day = date.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    let fullDate=`${year}-${month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${day}`
    setDate(fullDate)
  }
  //? 해당 달에 속하지 않는 날짜는 그레이색으로 표시해보자
  // 23 - 31  인데 첫번째 그룹에 있거나 1-7인데 마지막쯤 그룹에 있으면 해당 달 날짜가 아니라고 하기
  const ruThisMonth = (date, idx) => {
    if((date>=20 && idx<=1) || (date<=7 && idx>=3)){
      return "IamNotThisMonth"
    }
  }

  return (
    <>
      <WeekContainer>
        <Days><div>s</div><div>m</div><div>t</div><div>w</div><div>t</div><div>f</div><div>s</div></Days>
        <Scroll>
          {seperatedNums.map((arr,idx)=>{ 
            return <div>{arr.map((date)=>{
              return <Ele className={date===cD ?`selectedDay ${ruThisMonth(date,idx)}` :`${ruThisMonth(date,idx)}`} onClick={()=>moveDateHandler(date, idx)}>{date}</Ele>
            })}</div>
          })}
        </Scroll>
      </WeekContainer>
    </>
  );
};

export default WeekCalendar;