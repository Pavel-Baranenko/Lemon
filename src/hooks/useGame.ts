import { useFlyingStore,GameStage } from '../components/stores/flyingStore'

export {GameStage}

export default () => {
    const { stage, setStage,outcomeEvent,setOutcomeEvent } = useFlyingStore();
    const {flyingTime, setFlyingTime } = useFlyingStore();
    const isStartAvailable: boolean = stage === GameStage.SCHEDULED || stage === GameStage.COMPLETED
    return {
        flyingTime,
        setFlyingTime,
        stage,
        setStage: (stage:GameStage) => {
            setStage(stage)
            if(stage !==GameStage.COMPLETED)
                setFlyingTime(0)
        },
        isStartAvailable,
        outcomeEvent,
        setOutcomeEvent

    }
}
