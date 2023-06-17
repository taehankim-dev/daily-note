import React, { useCallback } from 'react';
import styled from 'styled-components'

import { Form, Input, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';

import {dbService, addDoc, collection} from '../../firebaseSetting'
import { useNavigate } from 'react-router';

const DiaryFormWrap = styled.div`
  max-width : 1200px;
  min-width : 300px;
  height : 60%;
  margin : auto;
  transform : translate(0, 30%);
  background : white;
  border-radius : 7px;
  padding : 1rem 12px 12px 12px;
  box-shadow : 0px 0px 1px black;
  @media screen and (max-width:500px) {
    height:100%;
    transform:translate(0,0);
  }
`


/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required : "'${label}'은 필수사항입니다!",
}
/* eslint-disable no-template-curly-in-string */

const { TextArea } = Input

const DailyWrite : React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  //일기 작성 기본
  const diaryValues = {
    date : dayjs(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`, 'YYYY-MM-DD'),
    name : "",
    weather : "",
    mood : "",
    title : "",
    body : "",
  }

  console.log("here : ",dayjs(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`, 'YYYY-MM-DD'))

  //작성 완료!
  const onFinishWrite = useCallback( async(formValues : any) => {
    const docObj = {
      date : new Date(formValues.date.$d).getTime(),
      weather : formValues.weather,
      mood : formValues.mood,
      title : formValues.title,
      body : formValues.body,
      createdAt : Date.now(),
    }

    try{
      await addDoc(collection(dbService, 'diary'), docObj);
      alert("작성이 완료되었습니다.");

      navigate("/diarylist");
    } catch (err) {
      console.log(err)
    }
  }, [navigate])

  return(
    <DiaryFormWrap>
      <Form form={form}
            labelCol={{span : 4}}
            initialValues={diaryValues}
            validateMessages={validateMessages}
            onFinish={onFinishWrite}>
        <Form.Item name={'date'} label='날짜' rules={[{required : true}]}>
          <DatePicker locale={locale} format={'YYYY-MM-DD'}/>
        </Form.Item>
        <Form.Item name={'weather'} label='날씨'>
          <Input placeholder='맑음, 비, 눈, 흐림...'/>
        </Form.Item>
        <Form.Item name={'mood'} label='기분'>
          <Input placeholder='행복, 슬픔, 우울...'/>
        </Form.Item>
        <Form.Item name={'title'} label='제목' rules={[{required : true}]}>
          <Input placeholder='일기 제목'/>
        </Form.Item>
        <Form.Item name={'body'} label='일기 내용' rules={[{required : true}]}>
          <TextArea rows={12}/>
        </Form.Item>
        <Form.Item style={{textAlign:'right'}}>
          <Button type='primary' htmlType='submit'>일기 작성</Button>
        </Form.Item>
      </Form>
    </DiaryFormWrap>
  )
}

export default DailyWrite;