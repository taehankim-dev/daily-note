import React from "react";
import { Button, Form, Input } from "antd";
import { authService } from "../../firebaseSetting";
import { useNavigate } from "react-router";

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
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values : any) => {
    const signUpUserInfo = values.user;

    if(signUpUserInfo.email.toLowerCase() !== signUpUserInfo.emailCheck.toLowerCase()){
      alert("이메일을 확인해주세요.");
      return;
    }

    if(signUpUserInfo.password.length < 8){
      alert("비밀번호는 8자리 이상으로 설정해주세요.");
      return;
    }

    if(signUpUserInfo.password.toLowerCase() !== signUpUserInfo.passwordCheck.toLowerCase()){
      alert("비밀번호를 확인해주세요.");
      return;
    }


    try{
      await authService.createUserWithEmailAndPassword(
        signUpUserInfo.email, signUpUserInfo.password
      )

      await authService.currentUser?.updateProfile({displayName : signUpUserInfo.displayName})
      
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div style={FormWrapStyle}>
      <Form form={form}
            labelCol={{span : 6}} 
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
        <Form.Item name={['user', 'displayName']} label="닉네임" rules={[{required : true}]}>
          <Input type="text"/>
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