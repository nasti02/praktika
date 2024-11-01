import React, { useEffect, useState } from 'react';
import '../styles/ApiData.css'; // Импортируйте CSS-файл для стилей

const ApiData: React.FC = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [currencyFilter, setCurrencyFilter] = useState<string>('all'); // Состояние для фильтрации по валюте

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();

                const countryNameMap = data.reduce((map: any, country: any) => {
                    map[country.cca3] = country.name.common;
                    return map;
                }, {});

                const countriesData = data.map((country: any) => ({
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : 'Нет данных',
                    population: country.population,
                    region: country.region,
                    flag: country.flags.png,
                    languages: country.languages ? Object.values(country.languages).join(', ') : 'Нет данных',
                    currencies: country.currencies ? Object.values(country.currencies).map((currency: any) => currency.name).join(', ') : 'Нет данных',
                    borderCountries: country.borders 
                        ? country.borders.map((code: string) => countryNameMap[code] || 'Неизвестно').join(', ')
                        : 'Не имеет сухопутных границ'
                }));

                setCountries(countriesData);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleCurrencyFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrencyFilter(event.target.value);
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    // Получение уникальных валют для фильтра из отфильтрованных стран
    const filteredCountries = countries.filter(country => (filter === 'all' || country.region === filter));
    const uniqueCurrencies = Array.from(new Set(filteredCountries.flatMap(country => country.currencies.split(', '))));

    // Применение фильтров
    const finalFilteredCountries = filteredCountries
        .filter(country => (currencyFilter === 'all' || country.currencies.includes(currencyFilter)));

    return (
        <div>
            <h3>Список стран</h3>
            <label htmlFor="filter">Фильтровать по региону:</label>
            <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                style={{ fontSize: '1.5rem', padding: '10px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ccc' }}
            >
                <option value="all">Все</option>
                <option value="Africa">Африка</option>
                <option value="Americas">Америка</option>
                <option value="Asia">Азия</option>
                <option value="Europe">Европа</option>
            </select>

            <label 
                htmlFor="currencyFilter" 
                style={{ fontSize: '1.5rem', marginLeft: '15px' }} // Добавляем отступ слева
            >
                Фильтровать по валюте:
            </label>
            <select
                id="currencyFilter"
                value={currencyFilter}
                onChange={handleCurrencyFilterChange}
                style={{
                    fontSize: '1.5rem',
                    padding: '10px',
                    margin: '10px 0',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '200px',          // Ограничение по ширине
                    whiteSpace: 'nowrap',     // Запрещаем перенос строки
                    overflow: 'hidden',       // Скрываем текст, выходящий за пределы
                    textOverflow: 'ellipsis'  // Добавляем многоточие для длинных строк
                }}
            >
                <option value="all">Все</option>
                {uniqueCurrencies.map((currency, index) => (
                    <option key={index} value={currency}>{currency}</option>
                ))}
            </select>

            <div className="countries-container">
                {finalFilteredCountries.map((country, index) => (
                    <div className="country-card" key={index}>
                        <h4>{country.name}</h4>
                        <p><strong>Столица:</strong> {country.capital}</p>
                        <p><strong>Население:</strong> {country.population}</p>
                        <p><strong>Регион:</strong> {country.region}</p>
                        <p><strong>Языки:</strong> {country.languages}</p>
                        <p><strong>Валюта:</strong> {country.currencies}</p>
                        <p><strong>Граничит с:</strong> {country.borderCountries}</p>
                        <img src={country.flag} alt={`Флаг ${country.name}`} width={100} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApiData;