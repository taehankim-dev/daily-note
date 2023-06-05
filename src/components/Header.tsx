import React, { useCallback } from 'react';
import {Row, Col, Button, Space, Tooltip} from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const Header : React.FC = () => {
  const navigate = useNavigate();

  //로그인, 회원가입 버튼 클릭
  const onClickButton = useCallback((text : string) => {
    if(text === 'signin') navigate("/signin")
    else if(text === 'signup') navigate("/signup")
  }, [navigate])

  return(
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
  )
}

export default Header;