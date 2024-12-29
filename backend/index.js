const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/business-simulation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const storeRoutes = require('./routes/store');
app.use('/api/store', storeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
