import React from "react";
import { Menu } from 'antd';

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('일기', 'sub1', '' ,[
    getItem('일기 목록', '1'),
    getItem('일기 작성', '2'),
  ]),
  getItem('가계부', 'sub2', '' , [
    getItem('가계부 목록', '3'),
    getItem('가계부 작성', '4'),
  ]),
];

const MenuCompoents : React.FC = () => {
  return (
    <Menu 
      defaultOpenKeys={['sub1']}
      defaultSelectedKeys={['1']}  
      mode="inline"
      items={items} />
  )
}

export default MenuCompoents;