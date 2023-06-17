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

const DiaryListBodyWrap = styled.div`
  
`

const DailyList : React.FC = () => {
  const [contents, setContents] = useState<any[]>([])

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

  const changeTimeStampToDate = useCallback((time : Date) => {
    const day = new Date(time);
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();

    return <span> {year}년 {month}월 {date}일</span>
  }, [])

  console.log(contents)

  return(
    <DiaryListWrap>
      <DiaryList>
        {contents.map(item => {
          return (
            <DiaryListItem key={item.id}>
              <DiaryListInfoWrap>
                <DiaryListInfoItem>{changeTimeStampToDate(item.date)}</DiaryListInfoItem> 
                <DiaryListInfoItem>{item.weather}</DiaryListInfoItem>
                <DiaryListInfoItem>{item.mood}</DiaryListInfoItem>
              </DiaryListInfoWrap>
              <DiaryListBodyWrap>
                내용
                {item.body}
              </DiaryListBodyWrap>
            </DiaryListItem>
          )
        })}
      </DiaryList>
    </DiaryListWrap>
  )
}

export default DailyList;