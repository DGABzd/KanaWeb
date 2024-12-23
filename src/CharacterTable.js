import React from 'react';
import styled from 'styled-components';
import { kanaData } from './kanaData';

const TableContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function CharacterTable({ onBack }) {
  return (
    <TableContainer>
      <h2>Kana Character Table</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Character</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Romaji</TableHeader>
          </tr>
        </thead>
        <tbody>
          {kanaData.map((kana) => (
            <tr key={kana.character}>
              <TableCell>{kana.character}</TableCell>
              <TableCell>{kana.type}</TableCell>
              <TableCell>{kana.romaji}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      <BackButton onClick={onBack}>Back to Menu</BackButton>
    </TableContainer>
  );
}

export default CharacterTable;
