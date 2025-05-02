import { Routes, Route } from 'react-router-dom';

// Components
import TheNavigation from './components/TheNavigation';
import TheClubs from './components/views/TheClubs';
import ThePersons from './components/views/ThePersons';
import TheCompetitions from './components/views/TheCompetitions';
import Home from './components/views/TheHome';

function App() {
  return (
    <div className="App bg-secondary/50 text-foreground min-h-screen p-4 transition-colors">
      <header>
        <TheNavigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<TheClubs />} />
          <Route path="/persons" element={<ThePersons />} />
          <Route path="/competitions" element={<TheCompetitions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
