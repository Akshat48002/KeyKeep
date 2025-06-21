import './App.css';
import Footer from './components/Footer';
import Manager from './components/Manager';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Manager />
      </div>
      <Footer />
    </div>
  );
}

export default App;
