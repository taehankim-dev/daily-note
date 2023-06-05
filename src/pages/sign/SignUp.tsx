import { Button, Form, Input } from "antd";
import React from "react";

const FormWrapStyle = {
  display : "flex",
  height:"90%",
  margin:"auto",
}

const FormStyle = {
  maxWidth : "500px",
  minWidth : "500px",
  margin: "auto",
  background:"white",
  padding:"12px",
  borderRadius : "7px",
  boxShadow:"0px 0px 3px skyblue"
}

const FormTitleStyle = {
  display:"flex",
  height:"50px",
  lineHeight: "50px",
  marginBottom : "12px",
  fontSize : "1.2rem",
  fontWeight:'bold',
  borderBottom:"1px solid #ddd"
}

const FormButtonStyle = {
  display : 'flex',
  margin : 'auto'
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required : "'${label}'은 필수사항입니다!",
}
/* eslint-disable no-template-curly-in-string */

const SignUp : React.FC = () => {
  const onFinish = (values : any) => {

    /* values = user : {email, emailCheck, password, passwordCheck}
      1. 이메일 형식 확인
      2. 이메일 일치 확인
      3. 비밀번호 일치 확인
    */

  }

  return (
    <div style={FormWrapStyle}>
      <Form labelCol={{span : 6}} 
            name="signup" 
            style={FormStyle}
            validateMessages={validateMessages}
            onFinish={onFinish}>
        <div style={FormTitleStyle}>
          <p style={{margin:'auto'}}>회원가입</p>
        </div>
        <Form.Item name={['user', 'email']} label="이메일" rules={[{required : true}]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'emailCheck']} label="이메일 확인" rules={[{required : true}]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'password']} label="비밀번호" rules={[{required : true}]}>
          <Input type="password"/>
        </Form.Item>
        <Form.Item name={['user', 'passwordCheck']} label="비밀번호 확인" rules={[{required : true}]}>
          <Input type="password"/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" style={FormButtonStyle}>
            회원가입
          </Button>
        </Form.Item>
      </Form> 
    </div>
  )
}

export default SignUp;