const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Create a new store
router.post('/create', async (req, res) => {
    const newStore = new Store(req.body);
    await newStore.save();
    res.send(newStore);
});

// Get store details
router.get('/:id', async (req, res) => {
    const store = await Store.findById(req.params.id);
    res.send(store);
});

// Add a sale
router.post('/:id/sale', async (req, res) => {
    const store = await Store.findById(req.params.id);
    const sale = req.body;
    
    const item = store.inventory.find(i => i.item === sale.item);
    if (item && item.quantity >= sale.quantity) {
        item.quantity -= sale.quantity;
        store.sales.push({
            item: sale.item,
            quantity: sale.quantity,
            revenue: sale.quantity * item.price
        });
        store.funds += sale.quantity * item.price;
        await store.save();
        res.send(store);
    } else {
        res.status(400).send('Not enough inventory');
    }
});

module.exports = router;
