import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 12px 32px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
`;

export const FavoritesContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  border-radius: 12px;
  padding: 18px;
  transition: 500ms;
`;

export const LeftContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 32px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SeeMoreToggleProps {
  accent?: boolean;
}

export const SeeMoreToggle = styled.span<SeeMoreToggleProps>`
  cursor: pointer;
  color: ${({ theme, accent }) =>
    accent ? theme.colors.text.secondaryAccent : theme.colors.secondary.main};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.text.medium};
`;
