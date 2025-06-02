import { Routes, Route } from 'react-router-dom';

// Components
import TheNavigation from './components/TheNavigation';
import TheClubs from './components/views/TheClubs';
import ThePersons from './components/views/ThePersons';
import TheCompetitions from './components/views/TheCompetitions';
import Home from './components/views/TheHome';
import TheLogin from './components/views/TheLogin';

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
          <Route path="/login" element={<TheLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
