import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    margin: 6px;
    padding: 16px;
    border: none;
    border-radius: 0.5em;
  }

  svg {
    font-size: 32px;
  }

  input[type='file'] {
    background-color: white;
  }

  input[type='text'] {
    width: 256px;
  }
`;
