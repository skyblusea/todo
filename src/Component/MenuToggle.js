import React,{useState} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


export const MenuPannel = styled.div`
  overflow: hidden; //! 자식 position:fixed 이면 안먹힘
  padding: 2vh 1vw 0 3vw;
  &.notClicked{
      visibility: visible;
      width: 100%;
      height: 100%;
      background-color: pink;
      /* transition: all 2s ease-in-out 0s; */
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
      animation: moveFromRight .7s ease both;
  }
  &.isClicked{
      visibility: visible; 
      background-color: pink;
      width: 100%;
      height: 100%;
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
      animation: moveFromLeft .7s ease both;
  }
  @keyframes moveFromLeft {
    from { -webkit-transform: translateX(-100%); transform: translateX(-100%); }
  }
  @keyframes moveFromRight {
    from {}
    to {-webkit-transform: translateX(-100%); transform: translateX(-100%);}
  };
`
export const MenuBtn = styled.button`
  position: absolute;
  &.active{
    width: 20px;
    user-select: none;
    border: 0px solid transparent;
    background-color: transparent;
    display: inline-block;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer; 
    /* transform: translateX(300px); */
    right: 20px;
    top: 20px;
    animation: moveFromLeft .8s ease both;
  }
  &.notActive{
    width: 20px;
    user-select: none;
    border: 0px solid transparent;
    background-color:transparent;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    left: 80px;
    top: 20px;
    animation: moveFromRight .8s ease both;
  }
  div{
    height: 0.15rem;
    background-color: #3c3c60;
    transition: all 0.2s ease-in-out 0s;
  }
  .menu_line{
    margin-bottom: 5px;
  }
  .menu_line_active_t{
    transform: translateY(2px) rotate(45deg);
    transition: all 0.2s ease-in-out 0s;
  }
  .menu_line_active_m{
    opacity: 0;
  }
  .menu_line_active_b{
    transform: translateY(-2.5px) rotate(-45deg);
    transition: all 0.2s ease-in-out 0s;   
  }
  @keyframes moveFromLeft {
    from { -webkit-transform: translateX(-300%); transform: translateX(-300%); }
  }
  @keyframes moveFromRight {
    from {}
    to {-webkit-transform: translateX(-300%); transform: translateX(-300%);}
  };
`
const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const Profile = styled.div`
    margin-bottom: 15%;
    display: flex;
    align-items: row;
    align-items: flex-end;
    >p{
     margin-left: 5px;
    }
    >img{
     width: 3.5rem;
     border-radius: 50%;
    }
`

const MenuLi = styled.li`
    list-style: none;
    font-size: 1.3rem;
    margin-bottom: 2vh;
    a{
        text-decoration: none;
    }
    //!Link는 a태그 선택자로 설정
`


const MenuToggle = () => {
  const [isClick, setIsClick] = useState(false);
  const onClickHandler = () => {
  setIsClick(!isClick)
  }
  return (
    <>
      <MenuPannel className={isClick ?"isClicked" :"notClicked"}>
          {isClick 
          ?
          <MenuContainer>
              <Profile>
                  <img src='https://randomuser.me/api/portraits/women/13.jpg' alt="me"/>
                  <p>안녕하세요, 민지님!</p>
              </Profile>
              <ul>
              <MenuLi><Link to="/today">오늘 할일</Link></MenuLi>
              <MenuLi><Link to="/">달력</Link></MenuLi>
              <MenuLi>습관</MenuLi>
              <MenuLi>일정</MenuLi>
              </ul>
          </MenuContainer>
          :null}         
      </MenuPannel>
      <MenuBtn onClick={onClickHandler} className={isClick ?"active" :"notActive"}>
          <div className={isClick ?"menu_line_active_t" :"menu_line"}></div>
          <div className={isClick ?"menu_line_active_m" :"menu_line"}></div>
          <div className={isClick ?"menu_line_active_b" :"menu_line_b"}></div>
      </MenuBtn>
    </>
  )
}

export default MenuToggle;