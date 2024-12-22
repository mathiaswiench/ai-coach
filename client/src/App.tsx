// App.js
import { Routes, Route } from 'react-router';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import TrainingPlanGenerator from './components/TrainingPlanGenerator';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/upload" element={<FileUpload />} />
      <Route path="/training" element={<TrainingPlanGenerator />} />

    </Routes>
  );
};

export default App;
