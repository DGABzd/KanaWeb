import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { kanaData } from './kanaData';

// Global styles for an iOS-inspired UI
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #f8f8f8;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1 {
    font-size: 2em;
    margin: 0;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #007aff;
  color: white;
  padding: 20px;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  background: ${(props) => (props.correct ? '#4caf50' : props.incorrect ? '#ff3b30' : '#ffffff')};
  border: 2px solid ${(props) => (props.correct || props.incorrect ? 'transparent' : '#ddd')};
  border-radius: 15px;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: background 0.3s, transform 0.3s;
  transform: ${(props) => (props.correct || props.incorrect ? 'scale(1.05)' : 'scale(1)')};
`;

const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 80%;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.2s;
  &:focus {
    border-color: #007aff;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.2s;
  &:hover {
    background-color: #005bb5;
  }
`;

const StatsContainer = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  text-align: center;
`;

const ModeSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ModeButton = styled(Button)`
  margin: 5px;
  width: 200px;
`;

const FlashcardCountInput = styled(Input)`
  width: 150px;
`;

const SectionButton = styled(Button)`
  margin: 10px;
  width: 250px;
`;

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null); // null, 'correct', or 'incorrect'
  const [selectedMode, setSelectedMode] = useState(null);
  const [flashcardCount, setFlashcardCount] = useState(0);
  const [practicedStats, setPracticedStats] = useState({});
  const [showStats, setShowStats] = useState(false);

  const filteredKana = selectedMode
    ? kanaData.filter((kana) => kana.type === selectedMode)
    : [];

  const limitedKana = flashcardCount > 0 ? filteredKana.slice(0, flashcardCount) : filteredKana;
  const currentKana = limitedKana[currentIndex] || {};

  const handleCheck = () => {
    if (!currentKana.character) return;

    const isCorrect = input.trim().toLowerCase() === currentKana.romaji.toLowerCase();
    setStatus(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setPracticedStats((prevStats) => {
        const streak = prevStats[currentKana.character]?.streak || 0;
        return {
          ...prevStats,
          [currentKana.character]: {
            streak: Math.min(streak + 1, 3),
            romaji: currentKana.romaji,
          },
        };
      });
    } else {
      setPracticedStats((prevStats) => {
        return {
          ...prevStats,
          [currentKana.character]: {
            streak: 0,
            romaji: currentKana.romaji,
          },
        };
      });
    }

    setTimeout(() => {
      setInput('');
      setStatus(null);
      if (currentIndex + 1 < limitedKana.length) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowStats(true);
      }
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setPracticedStats({});
    setShowStats(false);
  };

  const handleStartSession = () => {
    if (flashcardCount > filteredKana.length) {
      alert(`You can only practice up to ${filteredKana.length} flashcards.`);
    } else {
      setShowStats(false);
      setCurrentIndex(0);
      setCorrectAnswers(0);
      setPracticedStats({});
    }
  };

  const saveStatsToDatabase = () => {
    console.log('Saving stats to database:', practicedStats);
    // Simulate saving to a database
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>Kana Flashcards</Header>
        {showStats ? (
          <StatsContainer>
            <h2>Session Summary</h2>
            <p>Total Characters Practiced: {limitedKana.length}</p>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Accuracy: {((correctAnswers / limitedKana.length) * 100).toFixed(2)}%</p>
            <h3>Character Stats</h3>
            <ul>
              {Object.entries(practicedStats).map(([character, stats]) => (
                <li key={character}>
                  {character} ({stats.romaji}): Streak {stats.streak}/3
                </li>
              ))}
            </ul>
            <Button onClick={saveStatsToDatabase}>Save Stats</Button>
            <SectionButton onClick={() => setShowStats(false)}>Return to Menu</SectionButton>
          </StatsContainer>
        ) : !selectedMode ? (
          <ModeSelector>
            <h2>Select Practice Mode</h2>
            <ModeButton onClick={() => handleModeSelect('hiragana')}>Hiragana</ModeButton>
            <ModeButton onClick={() => handleModeSelect('katakana')}>Katakana</ModeButton>
            <ModeButton onClick={() => handleModeSelect('dakuon')}>Dakuon</ModeButton>
            <ModeButton onClick={() => handleModeSelect('yoon')}>Yoon</ModeButton>
            <ModeButton onClick={() => handleModeSelect('all')}>All</ModeButton>
          </ModeSelector>
        ) : (
          <>
            <h2>Set Number of Flashcards</h2>
            <FlashcardCountInput
              type="number"
              value={flashcardCount}
              onChange={(e) => setFlashcardCount(Number(e.target.value))}
              placeholder={`Max: ${filteredKana.length}`}
            />
            <Button onClick={handleStartSession}>Start Practice</Button>
            <CardContainer correct={status === 'correct'} incorrect={status === 'incorrect'}>
              {status === 'correct' || status === 'incorrect' ? currentKana.romaji : currentKana.character}
            </CardContainer>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Romaji"
            />
            <Button onClick={handleCheck}>Check</Button>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default App;
