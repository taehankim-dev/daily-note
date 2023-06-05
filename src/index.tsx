import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import SignIn from './pages/sign/SignIn';
import SignUp from './pages/sign/SignUp';

import DiaryList from './pages/diary/DiaryList';
import DiaryWrite from './pages/diary/DiaryWrite';
import './cssReset.css';

const router = createBrowserRouter([
  {
    path : "/*",
    element : <App />,
    children : [
      {
        //로그인
        path : "signin",
        element : <SignIn />,
      },
      {
        //회원가입
        path : "signup",
        element : <SignUp />,
      },
      {
        //일기목록
        path : "diarylist",
        element : <DiaryList />,
      },
      {
        //일기작성
        path : "diarywrite",
        element : <DiaryWrite />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);