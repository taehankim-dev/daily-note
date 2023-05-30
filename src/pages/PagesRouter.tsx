import React from 'react';
import { Route, Routes } from 'react-router';
import DiaryList from './diary/DiaryList';

const PagesRouters : React.FC = () => {
  return (
    <Routes>
      <Route path="/diarylist" element={<DiaryList />} />
    </Routes>
  )
}

export default PagesRouters;