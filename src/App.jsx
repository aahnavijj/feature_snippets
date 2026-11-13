import { useEffect, useState } from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = [
    'iPhone 16',
    'iPhone 16 Pro',
    'iPhone 16 Pro Max',
    'iPhone 15',
    'Samsung Galaxy S25',
    'Samsung Galaxy S24',
    'MacBook Pro',
    'MacBook Air',
    'iPad Pro',
  ];

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!debounceQuery.trim()) {
      setSuggestions([]);
      return;
    }

    //hit the api
    const fetchResults = async () => {
      try {
        setLoading(true);

        const result = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            debounceQuery
          )}`
        );
        const data = await result.json();
        console.log(data, 'data here');
        setSuggestions(data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debounceQuery]);

  return (
    <>
      <section id="center">
        <div>Product Search</div>
        <div>
          <input
            type="text"
            placeholder="...search products"
            onChange={handleChange}
            value={query}
          />
        </div>
        <div>
          <ul className="suggestions">
            {loading && <li>Loading suggestions...</li>}
            {suggestions.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
