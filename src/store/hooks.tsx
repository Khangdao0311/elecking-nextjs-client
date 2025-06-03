import { useContext } from 'react';
import Context from './Context';

function useStore() {
    return useContext(Context);
}

export { useStore };
