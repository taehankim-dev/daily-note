import React, { useCallback, useEffect, useState } from "react";
import { Menu } from 'antd';
import {authService} from "../firebaseSetting"

import type {MenuProps} from 'antd';
import { useLocation, useNavigate } from "react-router";
type MenuItem = Required<MenuProps>['items'][number];


// 메뉴 목록
const menuItems : MenuItem[] = [
  getItem('일기', 'sub1', '',[
    getItem('일기 목록', '1', '/diarylist'),
    getItem('일기 작성', '2', '/diarywrite'),
  ]),
  // getItem('가계부', 'sub2', '', [
  //   getItem('가계부 목록', '3', '/accountlist'),
  //   getItem('가계부 작성', '4', '/accountwrite'),
  // ]),
]

// 메뉴 타입
function getItem(
  label: React.ReactNode,
  key: React.Key,
  link : string,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    link,
    children,
    label,
    type,
  } as MenuItem;
}

const MenuCompoents : React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(['1']);

  useEffect(() => {
    switch(location.pathname){
      case "/diarylist":
        setSelectedKey(['1']);
        break;
    }
  }, [location.pathname])

  const onMenuClick : MenuProps['onClick'] = useCallback((e : any) => {
    const userInfo = authService.currentUser;

    if(!userInfo){
      alert("로그인을 먼저 해주세요.")
      navigate("/signin")
      return;
    }

    let link = e.domEvent.currentTarget.getAttribute('link')
    navigate(`${link}`);
  }, [navigate])

  return (
    <Menu 
      defaultOpenKeys={['sub1']}
      defaultSelectedKeys={selectedKey}  
      mode="inline"
      items={menuItems} 
      onClick={(e) => onMenuClick(e)}/>
  )
}

export default MenuCompoents;