import UseStateNotesDefault from './useState/Notes';
import UseStateExamplesDefault from './useState/Examples';

import UseEffectNotesDefault from './useEffect/Notes';
import UseEffectExamplesDefault from './useEffect/Examples';


const HooksMaster = () => {

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', background: '#f9f9f9', minHeight: '100vh', padding: '20px' }}>
            <UseStateNotesDefault />
            <UseStateExamplesDefault />
            <UseEffectNotesDefault />
            <UseEffectExamplesDefault />
        </div>
    );
};

export default HooksMaster;
