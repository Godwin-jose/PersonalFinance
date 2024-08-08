import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.landingPage}>
      <header style={styles.header}>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><a href="/" style={styles.navLink}>Home</a></li>
            <li style={styles.navItem}><a href="/login" style={styles.navLink}>Login</a></li>
            <li style={styles.navItem}><a href="/signup" style={styles.navLink}>Sign Up</a></li>
          </ul>
        </nav>
      </header>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Take Control of Your Finances</h1>
          <p style={styles.heroSubtitle}>Track your expenses, set budgets, and achieve your financial goals effortlessly.</p>
          <button style={styles.ctaButton}>
          <Link to={'/signup'} style={{ textDecoration: 'none', color: 'white' }}>Get Started Now</Link></button>
        </div>
      </div>
      <section style={styles.features}>
        <div style={styles.feature}>
          <h2 style={styles.featureTitle}>Track Expenses</h2>
          <p style={styles.featureText}>Keep a detailed record of all your expenses in one place.</p>
        </div>
        <div style={styles.feature}>
          <h2 style={styles.featureTitle}>Set Budgets</h2>
          <p style={styles.featureText}>Create budgets to manage your spending and save more.</p>
        </div>
        <div style={styles.feature}>
          <h2 style={styles.featureTitle}>Financial Goals</h2>
          <p style={styles.featureText}>Set and achieve your financial goals with our tools.</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  landingPage: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: '#E0E0E0',
  },
  header: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  hero: {
    backgroundImage: 'url("https://source.unsplash.com/1600x900/?finance,money")',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  heroContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '20px',
    borderRadius: '10px',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '24px',
    marginBottom: '30px',
  },
  ctaButton: {
    backgroundColor: '#ff7f50',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  ctaButtonHover: {
    backgroundColor: '#ff6347',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '40px auto',
    maxWidth: '1000px',
    textAlign: 'center',
  },
  feature: {
    flex: 1,
    margin: '0 20px',
  },
  featureTitle: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  featureText: {
    fontSize: '16px',
  },
};

export default LandingPage;
