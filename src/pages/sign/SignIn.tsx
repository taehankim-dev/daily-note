import React from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input } from "antd";
import styled from 'styled-components'
import { authService, getAuth, browserSessionPersistence, setPersistence } from "../../firebaseSetting";

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

const FormButtonStyle = {
  display : 'flex',
  margin : 'auto'
}

const FormTitleStyle = styled.div`
  display : flex;
  height : 50px;
  lineHeight : 50px;
  marginBottom : 12px;
  fontSize : 1.2rem;
  fontWeight : bold;
  borderBottom : 1px solid #ddd;
`

const SignIn : React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values : any) => {
    const signInfo = values.user;
    const auth = getAuth();

    await setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return authService.signInWithEmailAndPassword(signInfo.email, signInfo.password);
          })
          .then(() => {
            alert("로그인 되었습니다.")
            navigate("/");
          })
          .catch((error) => {
            let msg = "";
            switch (error.code) {
              case "auth/user-not-found" || "auth/wrong-password":
                msg = "이메일 혹은 비밀번호가 일치하지 않습니다.";
                break;
              case "auth/email-already-in-use":
                msg = "이미 사용 중인 이메일입니다.";
                break;
              case "auth/weak-password":
                msg = "비밀번호는 6글자 이상이어야 합니다.";
                break;
              case "auth/network-request-failed":
                msg = "네트워크 연결에 실패 하였습니다.";
                break;
              case "auth/invalid-email":
                msg = "잘못된 이메일 형식입니다.";
                break;
              case "auth/internal-error":
                msg = "잘못된 요청입니다.";
                break;
              default:
                msg = "로그인에 실패 하였습니다.";
                break;
            }

            alert(msg);
          })
  }

  return (
    <div style={FormWrapStyle}>
      <Form form={form}
            style={FormStyle}
            name="signin"
            onFinish={onFinish}>
        <FormTitleStyle>
          <p style={{margin:'auto'}}>로그인</p>
        </FormTitleStyle>
        <Form.Item name={['user', 'email']} label="이메일" rules={[{required : true}]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'password']} label="비밀번호" rules={[{required : true}]}>
          <Input type="password"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit' style={FormButtonStyle}>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn;