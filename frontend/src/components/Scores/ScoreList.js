import styled from 'styled-components/macro';

const ScoreList = styled.div`
    position: fixed;
    z-index:2;
    bottom:0;
    right:0;
    width: 100%;
    padding: 2px;
    box-sizing:border-box;
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    user-select:none;
`;

export default ScoreList;
