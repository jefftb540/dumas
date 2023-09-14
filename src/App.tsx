import styled from 'styled-components';
import { ThemeProviderContext } from './contexts/themeContext';

const Test = styled.h1`
  color: ${({ theme }) => theme.text.primary};
`;

function App() {
  return (
    <ThemeProviderContext>
      <Test>Let the journey begin</Test>
    </ThemeProviderContext>
  );
}

export default App;
