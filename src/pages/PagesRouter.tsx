import React from 'react';
import { Route, Routes } from 'react-router';
import DiaryList from './diary/DiaryList';
import SignIn from './sign/SignIn';
import SignUp from './sign/SignUp';

const PagesRouters : React.FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/diarylist" element={<DiaryList />} />
    </Routes>
  )
}

export default PagesRouters;