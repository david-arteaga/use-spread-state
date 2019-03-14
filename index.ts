import { useState, useCallback } from 'react';

export default function useSpreadState(initialValue) {
  const [state, setState] = useState(initialValue);

  const spreadSetState = useCallback(newState => {
    if (typeof newState === 'function') {
      setState(previousState => {
        const newStateValue = newState(previousState);
        return {
          ...previousState,
          ...newStateValue,
        };
      });
    } else {
      setState(previousState => ({ ...previousState, ...newState }));
    }
  }, []);

  return [state, spreadSetState];
}
