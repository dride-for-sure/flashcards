import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import SockJsClient from 'react-stomp';
import {validate as uuidValidate} from 'uuid';
import Logo from '../../components/Tiles/Logo/Logo';
import NewGame from '../../components/Tiles/NewGame/NewGame';
import OpenGame from '../../components/Tiles/OpenGame/OpenGame';
import Title from '../../components/Tiles/Title/Title';
import {usePlayerDetails} from '../../contexts/playerDetails';
import {listAvailableGames} from '../../services/APIService';

export default function Lobby() {
    const [games, setGames] = useState([]);
    const [playerDetails] = usePlayerDetails();
    const history = useHistory();

    const handleOpenNewGame = (difficulty) => {
        history.push(`/game/${difficulty}`);
    };

    useEffect(() => {
        if (!uuidValidate(playerDetails.id) || !playerDetails.name.length) {
            history.push('/');
        }
        listAvailableGames()
            .then(setGames)
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <SockJsClient
                url="/ws"
                topics={['/topic/games']}
                onMessage={(data) => setGames(data)}
                debug/>
            <Logo/>
            <Title/>
            <NewGame onGameOpen={handleOpenNewGame}/>
            {games.map((game) => <OpenGame key={game.id} game={game}/>)}
        </>
    );
}
