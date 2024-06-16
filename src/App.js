// import logo from './logo.svg';
import './App.css';
import './index.css'; // Import Tailwind CSS
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SoS Alert Locator</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
