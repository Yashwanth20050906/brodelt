
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

// Set the document title programmatically
document.title = "brodelt.com";

// Add a global error handler for runtime errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Display a user-friendly error message if the app fails to load
  if (!document.body.contains(rootElement) || !rootElement.hasChildNodes()) {
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '50px auto';
    errorDiv.style.maxWidth = '500px';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.backgroundColor = '#f8f9fa';
    errorDiv.style.border = '1px solid #dee2e6';
    errorDiv.style.borderRadius = '8px';
    errorDiv.innerHTML = `
      <h2 style="color: #dc3545;">Something went wrong</h2>
      <p>We're sorry, but the application failed to load correctly. Please try refreshing the page.</p>
      <button onclick="window.location.reload()" style="background-color: #0d6efd; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Refresh Page</button>
    `;
    document.body.appendChild(errorDiv);
  }
});

// Add a fallback for navigation errors
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  createRoot(rootElement).render(<App />);
  console.log('Brodelt application successfully mounted');
} catch (error) {
  console.error('Failed to render the application:', error);
}
