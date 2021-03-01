import { node } from 'prop-types';
import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const PlayerDetailsContext = React.createContext();

const PlayerDetailsProvider = ({ children }) => {
  const [PlayerDetails, setPlayerDetails] = useLocalStorage('flashCardGame', { id: '', name: '' });

  return (
    <PlayerDetailsContext.Provider value={[PlayerDetails, setPlayerDetails]}>
      {children}
    </PlayerDetailsContext.Provider>
  );
};

export const usePlayerDetails = () => useContext(PlayerDetailsContext);

export default PlayerDetailsProvider;

PlayerDetailsProvider.propTypes = {
  children: node.isRequired,
};
