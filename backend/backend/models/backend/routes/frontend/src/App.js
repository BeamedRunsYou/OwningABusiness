import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [store, setStore] = useState(null);
    const [saleItem, setSaleItem] = useState('');
    const [saleQuantity, setSaleQuantity] = useState(0);

    useEffect(() => {
        // Fetch store details
        axios.get('http://localhost:5000/api/store/STORE_ID')
            .then(response => setStore(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSale = () => {
        axios.post(`http://localhost:5000/api/store/STORE_ID/sale`, {
            item: saleItem,
            quantity: saleQuantity
        }).then(response => setStore(response.data))
          .catch(error => console.error(error));
    };

    if (!store) return <div>Loading...</div>;

    return (
        <div>
            <h1>{store.name}</h1>
            <h2>Funds: ${store.funds}</h2>
            <h3>Inventory:</h3>
            <ul>
                {store.inventory.map((item, index) => (
                    <li key={index}>{item.item}: {item.quantity} units @ ${item.price}</li>
                ))}
            </ul>
            <h3>Sales:</h3>
            <ul>
                {store.sales.map((sale, index) => (
                    <li key={index}>{sale.item}: {sale.quantity} units - Revenue: ${sale.revenue}</li>
                ))}
            </ul>
            <div>
                <h3>Make a Sale:</h3>
                <input 
                    type="text" 
                    placeholder="Item" 
                    value={saleItem} 
                    onChange={(e) => setSaleItem(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={saleQuantity} 
                    onChange={(e) => setSaleQuantity(Number(e.target.value))} 
                />
                <button onClick={handleSale}>Submit</button>
            </div>
        </div>
    );
}

export default App;
