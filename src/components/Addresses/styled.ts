import { styled } from 'styled-components';

export const ContainerAddressProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const WrapperEditDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.secondary.main};
`;

export const InputAddress = styled.input`
  margin-left: 10px;
  padding: 3px;
  border: none;
`;
