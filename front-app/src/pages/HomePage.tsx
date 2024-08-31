import { useBattle } from '../hooks';
import { BattleResumen } from './component/BattleResumen';

export const HomePage = () => {
    const {
        battles
    } = useBattle();
    return (
        <div>
            <BattleResumen  battles={battles}/>
        </div>
    )
}
