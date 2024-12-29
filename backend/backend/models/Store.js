const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    funds: Number,
    inventory: [
        {
            item: String,
            quantity: Number,
            price: Number
        }
    ],
    sales: [
        {
            item: String,
            quantity: Number,
            revenue: Number
        }
    ]
});

module.exports = mongoose.model('Store', storeSchema);
