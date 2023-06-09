import React, { useCallback } from 'react';
import {Row, Col, Button, Space, Tooltip} from 'antd'
import { UserOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import { authService } from '../firebaseSetting';

type userObjType = {
  displayName : string | null,
  uid : string,
}

type PropsType = {
  isLoggedIn : boolean,
  userObj : userObjType | null,
}

const Header : React.FC<PropsType> = ({isLoggedIn, userObj}) => {
  const navigate = useNavigate();

  //로그인, 회원가입 버튼 클릭
  const onClickButton = useCallback((text : string) => {
    if(text === 'signin') navigate("/signin")
    else if(text === 'signup') navigate("/signup")
    else if(text ==='signout') {
      authService.signOut();
    }
  }, [navigate])

  return(
    <>
      {isLoggedIn ? 
        <Row>
          <Col offset={4}></Col>
          <Col span={16}>오늘</Col>
          <Col span={4} style={{textAlign:'right'}}>
            <span style={{marginRight:'12px'}}>{userObj?.displayName}</span>
             
            <Space align='center'>
              <Tooltip title="로그아웃">
                <Button size='large' 
                        icon={<UserDeleteOutlined />} 
                        onClick={() => onClickButton('signout')}/>
              </Tooltip>
            </Space>
          </Col>
        </Row>
        :
        <Row>
          <Col offset={4}></Col>
          <Col span={16}>오늘</Col>
          <Col span={4} style={{textAlign:'right'}}>
            <Space align='center'>
              <Tooltip title="로그인">
                <Button size='large' 
                        icon={<UserOutlined />} 
                        onClick={() => onClickButton('signin')}/>
              </Tooltip>
              <Tooltip title="회원가입">
                <Button size='large' 
                        icon={<UserAddOutlined />} 
                        onClick={() => onClickButton('signup')}/>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      }
    </>
    
  )
}

export default Header;