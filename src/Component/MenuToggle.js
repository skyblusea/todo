import React,{useState} from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


export const MenuPannel = styled.div`
  overflow: hidden; //! 자식 position:fixed 이면 안먹힘
  padding: 2vh 1vw 0 3vw;
  background-color: rgba(220,220,220);
  width: 100%;
  height: 100%;
  &.notClicked{
      /* transition: all 2s ease-in-out 0s; */
      animation: moveFromRight .7s ease both;
  }
  &.isClicked{
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

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const Profile = styled.div`
    margin-bottom: 15%;
    display: flex;
    align-items: flex-end;
    font-size: 1.3rem;
    >p{
     margin-left: 5px;
    }
    >img{
     width: 4rem;
     border-radius: 50%;
    }
`

const MenuLi = styled.li`
    list-style: none;
    font-size: 1.3rem;
    margin-bottom: 3vh;
    >a{
      text-decoration: none;
      color: black
    }
    //!Link는 a태그 선택자로 설정
`


const MenuToggle = ({openTodayHandler, isClick}) => {

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
              <MenuLi><Link to="/today">할일</Link></MenuLi>
              <MenuLi><Link to="/">달력</Link></MenuLi>
              <MenuLi>습관</MenuLi>
              <MenuLi>일정</MenuLi>
              </ul>
          </MenuContainer>
          :null}         
      </MenuPannel>

    </>
  )
}

export default MenuToggle;