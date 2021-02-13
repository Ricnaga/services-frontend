import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  h2{
    margin:8px;
  }

  a{
    text-decoration:none;
    text-transform:uppercase;
    color:var(--text-border);

    border-radius:8px;

    margin:8px auto;
    padding:8px;
    background-color:orange;
    transition: background 0.3s;

    &:hover{
    background-color:orangered;
    }
  }
`;

export const SearchContent = styled.div`
  color:var(--text-border);

  display:flex;

  margin:32px auto;

  input{
    margin:0;
    padding:8px;

    border:none;
    border-radius:0.5em 0 0 0.5em;
  }

  button{
    padding:12px;
    border-radius:0 0.5em 0.5em 0;
    cursor: pointer;

    font-weight:700;
    font-family: var(--custom-font);
    color:var(--text-border);
    background-color:orange;
    transition: background 0.3s;

    &:hover{
    background-color:orangered;
    }
  }

  svg{
    font-size:32px;
  }

`;

export const Form = styled.form`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

input{
  margin:6px;
  padding:16px;
  border:none;
  border-radius:0.5em ;
}

  svg{
    font-size:32px;
  }

  button{
    font-weight:bolder;

    transition: background 0.3s;

    &:hover{
    background-color:#D5D8DC;
    }
  }
`;

export const GymPlan = styled.div`
display:flex;


  fieldset{
    margin:8px;
    padding:16px;

    legend{
      display:flex;
    }
  }
`;

export const Label = styled.label`
  display:flex;
  align-items:center;
`;
