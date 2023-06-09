import React, {useEffect, useState} from 'react';
import { Layout, Space } from 'antd';
import { authService } from './firebaseSetting';

import PagesRouters from './pages/PagesRouter';
import HeaderComponets from "./components/Header";
import MenuCompoents from './components/Menu';

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

type userObjType = {
  displayName : string | null,
  uid : string,
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<userObjType | null>(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
        })
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
    })
  }, [])

  return (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout style={{minHeight : '100vh'}}>
      <Header style={headerStyle}>
        <HeaderComponets isLoggedIn={isLoggedIn} userObj={userObj}/>
      </Header>
      <Layout hasSider>
        <Sider theme='light'>
          <MenuCompoents />
        </Sider>
        <Content>
          <PagesRouters/>
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  </Space>
  )
}

export default App;