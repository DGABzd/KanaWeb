import React, { useState } from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { kanaData } from './kanaData';
import Header from './components/Header';
//import CardContainer from './components/CardContainer';
//import InputField from './components/InputField';
import Button from './components/Button';
//import Stats from './components/Stats';
//import ModeSelector from './components/ModeSelector';
//import TableContainer from './components/TableContainer';
import { lightTheme, darkTheme } from './styles/themes';
import GlobalStyle from './styles/GlobalStyle';



import CharacterTable from './CharacterTable';
import StatsPage from './StatsPage';
import FlashcardGame from './FlashcardGame';

// Define light and dark themes



const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;





const FlashcardCountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const FlashcardCountButton = styled(Button)`
  margin: 0 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
`;

const SectionButton = styled(Button)`
  position: fixed;
  ${(props) => props.bottom && `bottom: 20px;`}
  ${(props) => props.left && `left: 20px;`}
  ${(props) => props.right && `right: 20px;`}
  z-index: 10;
`;

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [flashcardCount, setFlashcardCount] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('menu'); // 'menu', 'practice', 'table', 'stats'

  const theme = darkMode ? darkTheme : lightTheme;

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setView('practice');
  };

  const adjustFlashcardCount = (amount) => {
    setFlashcardCount((prev) => Math.max(5, Math.min(prev + amount, kanaData.length)));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>Kana Flashcards</Header>
        {view === 'menu' && (
          <>
            <h2>Select Practice Mode</h2>
            <Button onClick={() => handleModeSelect('hiragana')}>Hiragana</Button>
            <Button onClick={() => handleModeSelect('katakana')}>Katakana</Button>
            <Button onClick={() => handleModeSelect('dakuon')}>Dakuon</Button>
            <Button onClick={() => handleModeSelect('yoon')}>Yoon</Button>
            <Button onClick={() => handleModeSelect('all')}>All</Button>
            <h2>Set Number of Flashcards</h2>
            <FlashcardCountContainer>
              <FlashcardCountButton onClick={() => adjustFlashcardCount(-5)}>-</FlashcardCountButton>
              <span>{flashcardCount}</span>
              <FlashcardCountButton onClick={() => adjustFlashcardCount(5)}>+</FlashcardCountButton>
            </FlashcardCountContainer>
          </>
        )}
        {view === 'practice' && (
          <FlashcardGame
            mode={selectedMode}
            count={flashcardCount}
            onEnd={() => setView('menu')}
          />
        )}
        {view === 'table' && <CharacterTable onBack={() => setView('menu')} />}
        {view === 'stats' && <StatsPage onBack={() => setView('menu')} />}
        <SectionButton left onClick={() => setView('table')}>
          Table
        </SectionButton>
        <SectionButton right onClick={() => setView('stats')}>
          Stats
        </SectionButton>
        <SectionButton bottom right onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </SectionButton>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
