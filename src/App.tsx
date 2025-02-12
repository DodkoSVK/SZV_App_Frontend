import { Routes, Route } from 'react-router-dom'; // Uistite sa, že používate správny import

// Components
import TheNavigation from './components/TheNavigation';
import TheClubs from './components/views/clubs';

function App() {
  return (
    <div className="App bg-[#1D2731] min-h-screen p-4">
      <header>
        <TheNavigation />
      </header>
      <main>
        <Routes>
          <Route path="/clubs" element={<TheClubs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;