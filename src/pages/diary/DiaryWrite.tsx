import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components'

import { Form, Input, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';

import {dbService, addDoc, collection, getDocs, getAuth} from '../../firebaseSetting'

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

const { TextArea } = Input

const DailyWrite : React.FC = () => {
  const [form] = Form.useForm();
  
  //일기 작성 기본
  const diaryValues = {
    date : dayjs(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`, 'YYYY-MM-DD'),
    name : "",
    weather : "",
    mood : "",
    title : "",
    body : "",
  }

  //작성 완료!
  const onFinishWrite = useCallback( async(formValues : any) => {
    const docObj = {
      date : formValues.date.$d,
      weather : formValues.weather,
      mood : formValues.mood,
      title : formValues.title,
      body : formValues.body,
    }

    try{
      // const userUid = getAuth().currentUser?.uid;
      
      await addDoc(collection(dbService, 'diary'), docObj);
      // const res = await addDoc(collection(dbService, 'diary'), "")
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    const data = getDocs(collection(dbService, "diary"));
    console.log(data)
  }, [])

  return(
    <DiaryFormWrap>
      <Form form={form}
            labelCol={{span : 4}}
            initialValues={diaryValues}
            onFinish={onFinishWrite}>
        <Form.Item name={'date'} label='날짜'>
          <DatePicker locale={locale} format={'YYYY-MM-DD'}/>
        </Form.Item>
        <Form.Item name={'weather'} label='날씨'>
          <Input placeholder='맑음, 비, 눈, 흐림...'/>
        </Form.Item>
        <Form.Item name={'mood'} label='기분'>
          <Input placeholder='행복, 슬픔, 우울...'/>
        </Form.Item>
        <Form.Item name={'title'} label='제목'>
          <Input placeholder='일기 제목'/>
        </Form.Item>
        <Form.Item name={'body'} label='일기 내용'>
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