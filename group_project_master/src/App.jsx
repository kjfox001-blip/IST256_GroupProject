import './App.css';
import Hero from './components/Home/Hero';
import MyFooter from './components/layout/Footer';
import MyNav from './components/layout/navbar';

function App() {
  return (
    <div className="app-container">
      <header>
        {/* we are going to add some content here later */}
      </header>
      
      <MyNav />
      <Hero />
      <main>
        {/* we are going to add some content here later */}
      </main>

      <MyFooter />
    </div>
  );
}

export default App;