import React, { useCallback, useEffect, useState } from 'react';
import { collection, dbService, onSnapshot, query } from '../../firebaseSetting';
import {styled} from 'styled-components'

const DiaryListWrap = styled.div`
  max-width : 100%;
  min-width : 300px;
  height : 100%;
  margin : auto;
  background : white;
  padding : 1rem 12px 12px 12px;
`

const DiaryList = styled.ul`
  width:100%;
`

const DiaryListItem = styled.li`
  width:100%;
  padding : 1rem;
  margin-top : 12px;
  border: 1px solid #daf8fa;
  border-radius : 12px;
  background : #e5f6f7;
  transition : all 0.3s;
  cursor:pointer;
  &:hover{
    background : #d2e5fa;
  }

  &:first-child{
    margin:0;
  }
`

const DiaryListInfoWrap = styled.div`
  margin : 4px 0px;
`

const DiaryListInfoItem = styled.span`
  display : inline-flex;
  margin : 0px 0px 0px 6px;
  &:first-child{
    margin : 0px;
  }
`

const DiaryListTitleWrap = styled.div`
  height : 20px;
  margin-top : 12px;
  font-weight : bold;
  font-size : 1.25rem;
`

const DiaryListBodyWrap = styled.div`
  margin-top : 12px;
  padding : 0.25rem;
  border: 1px solid #cfd7da;
  border-radius : 4px;
`

const DailyList : React.FC = () => {
  const [contents, setContents] = useState<any[]>([])
  const [contentsVisiable, setContentsVisiale] = useState<any[]>([]);

  //일기 목록 가져오기.
  useEffect(() => {
    const getBoardList = async() => {
      const q = query(
        collection(dbService, 'diary')
      )

      onSnapshot(q, (collections) => {
        const contensArr = collections.docs.map((doc) => (
          {
            id : doc.id,
            ...doc.data(),
          }
        ))

        setContents(contensArr)
      })
    }

    getBoardList();
  }, [])

  useEffect(() => {
    const length = contents.length;

    const visibleArr = new Array(length).fill(false);
    setContentsVisiale(visibleArr);

  }, [contents.length])

  //일기 날짜 timestamp 형식에서 년월일 형식으로 변경.
  const changeTimeStampToDate = useCallback((time : Date) => {
    const day = new Date(time);
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();

    return <span> {year}년 {month}월 {date}일</span>
  }, [])

  //일기 리스트 클릭 시,
  const diaryClick = (diaryItem : any, idx : number) => {
    const newContents = contentsVisiable.map((item, index) => index === idx ? true : false);
    setContentsVisiale(newContents);
  }

  return(
    <DiaryListWrap>
      <DiaryList>
        {contents.map((item, idx) => {
          return (
            <DiaryListItem key={item.id} onClick={() => diaryClick(item, idx)}>
              <DiaryListInfoWrap>
                <DiaryListInfoItem>{changeTimeStampToDate(item.date)}</DiaryListInfoItem> 
                <DiaryListInfoItem>{item.weather}</DiaryListInfoItem>
                <DiaryListInfoItem>{item.mood}</DiaryListInfoItem>
              </DiaryListInfoWrap>
              <DiaryListTitleWrap>
                {item.title}
              </DiaryListTitleWrap>
              {contentsVisiable[idx]
                ?
                <DiaryListBodyWrap>
                  {item.body}
                </DiaryListBodyWrap>
                :
                <></>
              }
              
            </DiaryListItem>
          )
        })}
      </DiaryList>
    </DiaryListWrap>
  )
}

export default DailyList;