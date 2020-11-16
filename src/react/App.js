import './App.css';
import  React from 'react';
import { channels } from '../shared/constants';
import { Layout, Button , Row, Col } from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
const { ipcRenderer } = window; 
const { Header, Content } = Layout;



const App = () => {
  const exit = () => {
    ipcRenderer.send(channels.QUIT);
  }
  return (
    <Layout className="App">
      <Header className="App-header">
      <Row justify="space-around">
        <Col span={20}>
          <h2 style={{color:'white'}}>Pomodoro Timer</h2>
          </Col>
          &nbsp;
          <Col span={2} offset={0.5}>
          <Button type="danger" shape="circle" icon={<CloseCircleOutlined />} onClick={exit}></Button>
          </Col>
      </Row>
      </Header>
      <Content>
        <PomodoroTimer />
      </Content>
     
      </Layout>
  );
}

export default App;
