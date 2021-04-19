import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root{
--text-border:#0556BD;
--custom-font:'Play', sans-serif;
}

*{
  margin:0;
  padding:0;
  outline:0;
  box-sizing:border-box;
}

body{
  font-size:16px;
  background: linear-gradient(265deg, #04C18E, #59E5BF) no-repeat fixed;
  font-family:var(--custom-font);
  color:var(--text-border);
}

fieldset{
  border-color:var(--text-border);
}
`;
