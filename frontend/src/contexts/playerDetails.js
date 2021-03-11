import { node } from 'prop-types';
import React, { createContext, useContext } from 'react';
import usePersistentStorage from '../hooks/usePersistentStorage';

const PlayerDetailsContext = createContext();

const PlayerDetailsProvider = ({ children }) => {
  const [playerDetails, setPlayerDetails] = usePersistentStorage('flashCardGame', { id: '', name: '' });

  return (
    <PlayerDetailsContext.Provider value={[playerDetails, setPlayerDetails]}>
      {children}
    </PlayerDetailsContext.Provider>
  );
};

export const usePlayerDetails = () => useContext(PlayerDetailsContext);

export default PlayerDetailsProvider;

PlayerDetailsProvider.propTypes = {
  children: node.isRequired,
};
