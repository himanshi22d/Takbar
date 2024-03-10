// pages/_app.js

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: '#0d1533', minHeight: '100vh' }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
