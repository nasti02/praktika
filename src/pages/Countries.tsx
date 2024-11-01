import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import ApiData from '../components/ApiData';

const Countries: React.FC = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <h1>Информация о странах</h1>
                    <img src="/26.png" alt="информация" className="header-image" /> {/* Изображение сбоку заголовка */}
                </div>
                <nav className="nav">
                    <Link to="/" className="nav-link">
                        <span className="arrow">⬅️</span> {}
                        <span>Назад на главную</span>
                    </Link>
                </nav>
            </header>
            <main>
                <ApiData /> {}
                <div className="back-button">
                    <Link to="/" className="button">← Назад на главную</Link>
                </div>
            </main>
        </div>
    );
};

export default Countries;