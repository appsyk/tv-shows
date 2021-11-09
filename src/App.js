import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './tvshows/SearchBox';
import ShowsList from './tvshows/ShowsList';
import ShowDetails from './tvshows/ShowDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/tv-shows/:search" element={<ShowsList />} />
        <Route path="/tv-shows/details/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
