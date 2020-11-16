import React,{useState} from 'react';
import { Card , Button , Space, Input , Progress} from 'antd';
import {PlayCircleOutlined,PauseCircleOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import Timer from 'react-compound-timer';
import { channels } from '../../../shared/constants';
const { ipcRenderer } = window; 

const TIME = 25 * 60 * 1000; //25 minutes



const PomodoroTimer = () => {
    const [percent,setPercent] = useState(0);
    const [taskName,setTaskName] = useState('');
    const [editing,setEditing] = useState(true);
    
    return (
        <Card title={editing?<Input placeholder={taskName?taskName:"Name of the task"} default={taskName} bordered={false} onPressEnter={(e) => {setTaskName(e.target.value); setEditing(false)}}/>: <div onClick={()=> setEditing(true)}>{taskName}</div>}>
            <Timer
                initialTime={TIME}
                direction="backward"
                startImmediately={false}
                checkpoints={[
                    {
                        time:0,
                        callback: () => ipcRenderer.send(channels.FIN),
                    }
                ]}>
                {({ start, resume, pause, stop, reset, timerState }) => (
                    <React.Fragment>
                        <div>
                            <Progress type="circle" percent={percent} />
                        </div>
                        <div>

                            <Timer.Days /> D &nbsp;
                            <Timer.Hours /> H &nbsp;
                            <Timer.Minutes formatValue={value => {
                                setPercent(parseInt((25-value)/25 * 100));
                                return `${value}`;
                            }}/> M &nbsp;
                            <Timer.Seconds /> S &nbsp;
                        </div>
                        <br />
                        <div>
                            <Space>
                                <Button onClick={start} type="primary" shape="circle" icon={<PlayCircleOutlined />} />
                                
                                <Button onClick={pause} type="primary" shape="circle" icon={<PauseCircleOutlined />} />
                                
                                <Button onClick={stop} type="danger" shape="circle" icon={<StopOutlined />} />
                                
                                <Button onClick={reset} type="primary" shape="circle" icon={<RollbackOutlined />} />
                            </Space>
                        </div>
                    </React.Fragment>
                )}
            </Timer>
        </Card>
    )
}
export default PomodoroTimer;