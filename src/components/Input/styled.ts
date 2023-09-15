import { styled } from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 30px;
  padding: 18px 26px;
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  border: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 380px;

  input {
    border: none;
    flex: 1;
    color: ${({ theme }) => theme.colors.text.main};

    &:focus {
      outline: none;
    }

    &:placeholder-shown {
      opacity: 0.3;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text.main};
    opacity: 0.3;
  }
`;
