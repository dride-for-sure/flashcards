import styled from 'styled-components';

const Icon = styled.div`
    font-size:7rem;
    align-self:center;
    animation: ${(props) => props.pulse && 'pulse-animation 6s infinite'};
    user-select: none;

    @keyframes pulse-animation {
      0% {
        transform: scale(1.1);
      }
      50% {
        transform: scale(.8);
      }
      100% {
        transform: scale(1.1);
      }
    }
`;

export default Icon;
