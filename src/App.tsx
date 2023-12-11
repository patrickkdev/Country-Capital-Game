import './App.css'
import CountryCapitalGame from './components/country-capital-game';

function App() {
  return (
    <>
      <h2>Country Capital Game</h2>
      
      <CountryCapitalGame 
        data={{
          "Germany": "Berlin",
          "Azerbaijan": "Baku",
          "United Kingdom": "London",
          "United States": "Washington",
          "South Africa": "Pretoria",
          "Brazil": "Brasilia"
        }}
      />
    </>
  )
}

export default App
