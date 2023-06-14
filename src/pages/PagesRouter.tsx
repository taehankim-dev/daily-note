import React from 'react';
import { Route, Routes } from 'react-router';

import SignIn from './sign/SignIn';
import SignUp from './sign/SignUp';
import DiaryList from './diary/DiaryList';
import DiaryWrite from './diary/DiaryWrite';

const PagesRouters : React.FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/diarylist" element={<DiaryList />} />
      <Route path="/diarywrite" element={<DiaryWrite />} />
    </Routes>
  )
}

export default PagesRouters;