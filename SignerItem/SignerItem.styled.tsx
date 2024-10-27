// SignerItem.styled.tsx
import styled from 'styled-components';

export const SignerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &.highlight-signee {
    background-color: #f5f5f5;
  }
`;

export const UserName = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;

export const DeleteButton = styled.span`
  margin-left: auto;
  cursor: pointer;
`;
