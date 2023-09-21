import styled from 'styled-components';

interface ListProps {
  direction: 'row' | 'column';
}

export const List = styled.div<ListProps>`
  display: flex;

  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px;
  overflow: hidden;
  ${({ direction }) => `
    flex-direction: ${direction};
    ${
      direction === 'row'
        ? `max-height: 200px;`
        : `max-width: 300px; max-height: 430px`
    }
  `};
`;
