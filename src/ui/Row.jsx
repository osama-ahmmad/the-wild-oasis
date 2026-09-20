import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 2.4rem;
      width: 100%;
    `};

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
      align-items: stretch;
      width: 100%;
    `};
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
