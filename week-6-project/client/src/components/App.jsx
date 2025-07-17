import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <h1>Welcome</h1>
      {/* ...rest of your app... */}
    </ErrorBoundary>
  );
}

export default App;