import UseStateNotesDefault from './useState/Notes';
import UseStateExamplesDefault from './useState/Examples';

import UseEffectNotesDefault from './useEffect/Notes';
import UseEffectExamplesDefault from './useEffect/Examples';

import UseCallbackNotesDefault from './useCallback/Notes';
import UseCallbackExamplesDefault from './useCallback/Examples';

import UseMemoNotesDefault from './useMemo/Notes';
import UseMemoExamplesDefault from './useMemo/Examples';


const HooksMaster = () => {

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', background: '#f9f9f9', minHeight: '100vh', padding: '20px' }}>
            <UseStateNotesDefault />
            <UseStateExamplesDefault />
            <UseEffectNotesDefault />
            <UseEffectExamplesDefault />
            <UseCallbackNotesDefault />
            <UseCallbackExamplesDefault />
            <UseMemoNotesDefault />
            <UseMemoExamplesDefault />
        </div>
    );
};

export default HooksMaster;
