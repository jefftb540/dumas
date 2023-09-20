import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.border.main};
  background-color: ${({ theme }) => theme.colors.background.main};
  padding: 0 32px;
`;

export const NavLeft = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 100px;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 32px;
  height: 100%;
  flex: 3;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavIcon = styled.img`
  height: 100%;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.text.primaryAccent};
`;

export const AddressTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  line-height: normal;
`;

export const AddressDescription = styled.span`
  color: ${({ theme }) => theme.colors.text.secondaryAccent};
  font-size: ${({ theme }) => theme.fonts.text.medium};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  line-height: normal;
`;

interface SearchContainerProps {
  open: boolean;
}
export const SearchContainer = styled.div<SearchContainerProps>`
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  height: 50px;
  width: ${({ open }) => (open ? '340px' : '80px')};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  cursor: pointer;
  transition: 500ms;

  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background.main};
    padding: 6px;
    width: 38px;
    height: 38px;
    border: 1px solid ${({ theme }) => theme.colors.border.main};
  }
`;

export const UserMenuToggle = styled.span`
  color: ${({ theme }) => theme.colors.text.primaryAccent};
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.header.small};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
  cursor: pointer;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.border.main};
  height: 80%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.text.primaryAccent};
    width: 40px;
    height: 40px;
  }
`;

export const TotalCartItensNumber = styled.span`
  border-radius: 100%;
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.text.extraSmall};
  position: relative;
  top: -14px;
  right: -33px;
`;
