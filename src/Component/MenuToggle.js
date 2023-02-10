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
export const MenuBtn = styled.button`
  position: absolute;
  display: block;
  float: left;
  width: 25px;
  border: 0px solid transparent;
  background-color: transparent;
  white-space: nowrap;
  cursor: pointer; 
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


const MenuToggle = () => {
  const [isClick, setIsClick] = useState(false);
  const menuHandler = () => {
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
              <MenuLi><Link to="/today">할일</Link></MenuLi>
              <MenuLi><Link to="/">달력</Link></MenuLi>
              <MenuLi>습관</MenuLi>
              <MenuLi>일정</MenuLi>
              </ul>
          </MenuContainer>
          :null}         
      </MenuPannel>
      <MenuBtn onClick={menuHandler} className={isClick ?"active" :"notActive"}>
          <div className={isClick ?"menu_line_active_t" :"menu_line"}></div>
          <div className={isClick ?"menu_line_active_m" :"menu_line"}></div>
          <div className={isClick ?"menu_line_active_b" :"menu_line_b"}></div>
      </MenuBtn>
    </>
  )
}

export default MenuToggle;