import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="header-content"> {/* Оберните заголовок и изображение в контейнер */}
                    <h1>Изучение стран мира</h1>
                    <img src="/44485.png" alt="Земной шар" className="header-image" /> {/* Изображение сбоку заголовка */}
                </div>
            </header>
            <main>
                <h2>Почему стоит изучать страны?</h2>
                <p>
                    Понимание культур и географии различных стран помогает развивать мировоззрение 
                    и расширяет горизонты. Знание о странах мира полезно не только для путешествий, 
                    но и для бизнеса, политики и международных отношений.
                </p>
                <h3>Преимущества изучения стран:</h3>
                <ul>
                    <li>Расширяет культурный кругозор</li>
                    <li>Упрощает путешествия и общение с иностранцами</li>
                    <li>Полезно для профессиональной деятельности</li>
                </ul>
                <div className="button-container">
                    <Link to="/countries" className="button">Посмотреть информацию о странах</Link>
                </div>
            </main>
        </div>
    );
};

export default Home;