import React from 'react';
import HeaderComponets from "./components/Header";
import MenuCompoents from './components/Menu';
import { Layout, Space } from 'antd';
import PagesRouters from './pages/PagesRouter';

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout style={{minHeight : '100vh'}}>
      <Header style={headerStyle}>
        <HeaderComponets />
      </Header>
      <Layout hasSider>
        <Sider theme='light'>
          <MenuCompoents />
        </Sider>
        <Content>
          <PagesRouters />
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  </Space>
);

export default App;