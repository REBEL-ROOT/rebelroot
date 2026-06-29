import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid rgba(var(--text), 0.15);
  background: rgb(var(--inputBackground));
  border-radius: 0.6rem;
  font-size: 1.6rem;
  padding: 1.8rem;
  box-shadow: var(--shadow-md);
  color: rgb(var(--text));

  &::placeholder {
    color: rgba(var(--text), 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: var(--shadow-lg);
    border-color: rgb(var(--primary));
  }
`;

export default Input;
