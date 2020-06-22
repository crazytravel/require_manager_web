import React, {
    createContext,
    useState,
    useContext,
} from 'react';
import { Button } from 'antd';
import { Stage } from 'models/kanban';
import CardContainer from './card-container';
import DragCard from './drag-card';
import styled from 'styled-components';

const emptyStage: Stage = {
    id: '',
    text: '新列表',
    tasks: [],
}

const initStage: Stage[] = [{
    id: '1',
    text: 'todo',
    tasks: [{
        id: '1',
        text: 'task1 这是一句话，很长很长，你看看怎么处理下吧，我真的不知道怎么处理了，最好不要这样了。这样真的好吗',
        stageId: '1',
    }],
}, {
    id: '2',
    text: 'doing',
    tasks: [{
        id: '2',
        text: 'task2',
        stageId: '2',
    }],
}];


export const StageContext = createContext<[Stage[], (stages: Stage[]) => void]>([initStage, () => { }]);

export const useStage = () => {
    const [stages, setStages] = useContext(StageContext);
    return { stages, setStages };
}

interface StageContextProviderProps {
    scroll: Function
}

const StageContextProvider: React.FC<StageContextProviderProps> = props => {

    const [stages, setStages] = useState(initStage);
    return (
        <StageContext.Provider value={[stages, setStages]}  >
            {stages.map(stage => {
                return (
                    <CardContainer id={stage.id} key={stage.id} title={stage.text}>
                        {stage.tasks?.map(task => <DragCard task={{...task, stageId: stage.id}} key={task.id} />)}
                    </CardContainer>
                )
            })}
            <StyledButton type="dashed" onClick={event => {
                stages.push(emptyStage);
                setStages([...stages]);
                event.currentTarget.scrollIntoView(true);
            }}> + 创建新列表</StyledButton>
        </StageContext.Provider>
    );
}

const StyledButton = styled(Button)`
    width: 250px;
    height: 40px;
    margin: 0 20px 0 10px;
    flex: 0 0 auto;
`;

export default StageContextProvider;