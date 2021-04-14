import styled from 'styled-components';

export const Container = styled.div`

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  margin: 8px auto;
`;

export const Form = styled.form`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

fieldset{
  padding:8px;
  border-radius: 0.3em;
  font-size:24px;
}

  h4{
    font-size:32px;
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
