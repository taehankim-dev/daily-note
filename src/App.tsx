import React, {useEffect, useState} from 'react';
import { Layout, Space } from 'antd';
import { authService } from './firebaseSetting';

import PagesRouters from './pages/PagesRouter';
import HeaderComponets from "./components/Header";
import MenuCompoents from './components/Menu';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;
// BREAK_POINT_MOBILE = 768;
// BREAK_POINT_TABLET = 992;
// BREAK_POINT_PC = 1200;

const LayoutWrapper = styled.div`
  display: flex;
  height : 94vh;

  @media screen and (min-width : 768px){
    width : 100vw;
  }
  
  @media screen and (min-width : 1200px){
    width: 70vw;
    margin : auto;
    box-shadow : 0px 0px 1px gray;
  }
`

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
            <LayoutWrapper>
              <Layout hasSider>
                <Sider theme='light'>
                  <MenuCompoents />
                </Sider>
                <Content>
                  <PagesRouters/>
                </Content>
              </Layout>
            </LayoutWrapper>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Space>
  )
}

export default App;