import styled from 'styled-components';

interface ListProps {
  direction: 'row' | 'column';
  fullWidth: boolean;
  hide: boolean;
}

export const List = styled.div<ListProps>`
  display: ${({ hide }) => (hide ? 'none' : 'flex')};

  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px;
  overflow: hidden;
  ${({ direction, fullWidth }) => `
    flex-direction: ${direction};
    ${
      fullWidth
        ? `width: 100%`
        : direction === 'row'
        ? `max-height: 200px;`
        : `max-width: 300px; max-height: 430px`
    }
  `};
`;
