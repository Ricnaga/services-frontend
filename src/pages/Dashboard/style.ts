import styled from 'styled-components';

export const Container = styled.div`
  width:100vw;

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  margin:8px auto;
  padding:0 32px;

  a{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    border-radius:0.5em;

    margin:24px;
    padding:36px;

    text-decoration:none;
    text-transform:uppercase;
    color:var(--text-border);


    svg{
      font-size:88px;
      margin-bottom:32px;
    }
  }

@media(min-width:720px){
  div{
    display:flex;
    justify-content:space-around;
  }

  a{
    transition: background 0.3s, padding 0.5s;
  }

  a:hover{
    background:#0EE7AD;
    text-decoration:underline;
    padding:2.3em;
  }
}
`;

export const Title = styled.p`
  font-size:36px;
`;
