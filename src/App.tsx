import * as React from 'react';
import './App.css';
import GitHubRepos from './components/GitHubRepos';

const App = () => {
  return (
    <div className="App">
      <main>
        <header className="App-header">
          <h1>GitHub scanner</h1>
        </header>
        <GitHubRepos />
      </main>
    </div>
  );
};

export default App;