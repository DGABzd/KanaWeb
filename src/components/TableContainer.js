import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 300px;
  height: 200px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.text};
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

function TableContainer({ kanaData }) {
  return (
    <TableWrapper>
      <h3>Kana Table</h3>
      <ul>
        {kanaData.map((kana) => (
          <li key={kana.character}>
            {kana.character} ({kana.romaji})
          </li>
        ))}
      </ul>
    </TableWrapper>
  );
}

export default TableContainer;
