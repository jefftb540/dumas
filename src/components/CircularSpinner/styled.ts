import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 300, 0.3);
  border-top: 4px solid rgba(255, 255, 300, 0.3);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
