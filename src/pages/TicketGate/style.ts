import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  margin: 8px;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const SearchContent = styled.div`
  width: 70vw;
  color: var(--text-border);

  display: flex;
  justify-content: center;

  margin: 1.4rem auto;

  input {
    margin: 0;
    padding: 1rem;

    border: none;
    border-radius: 0.5em 0 0 0.5em;
  }

  button {
    padding: 1.4rem;
    border-radius: 0 1.4em 1.4em 0;
    cursor: pointer;

    font-weight: 700;
    font-family: var(--custom-font);
    color: var(--text-border);
    background-color: orange;
    transition: background 0.3s;

    &:hover {
      background-color: orangered;
    }
  }

  svg {
    font-size: 3rem;
  }
`;
