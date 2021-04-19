import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 8px auto;

  a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--text-border);

    border-radius: 8px;

    margin: 8px auto;
    padding: 8px;
    background-color: orange;
    transition: background 0.3s;

    &:hover {
      background-color: orangered;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 18px;

  button {
    margin: 0 5px;
    padding: 8px 12px;

    border-radius: 0.5em;

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

  fieldset {
    display: flex;
    align-items: center;

    margin: 16px;
  }
`;

export const AllFields = styled.div`
  display: flex;
`;

export const AddField = styled.div`
  fieldset {
    padding: 12px 8px;
  }

  input {
    margin-left: 8px;
    padding: 8px;

    border: none;
    border-radius: 0.5em;
  }

  select {
    padding: 6px;
    border-radius: 0.5em;
  }
`;

export const RemoveField = styled.div`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 4px 8px;

    list-style: none;
  }
`;
