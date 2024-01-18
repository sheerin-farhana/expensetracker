const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs')
const path = require('path');

const express = require('express');


const morgan = require('morgan');
const cors = require('cors');

const sequelize = require('./utils/database');

const {User} = require('./models/User');
const { Expense } = require('./models/Expense');
const { Order } = require('./models/Order');
const { ForgotPassword } = require('./models/ForgotPassword');
const { DownloadedFile } = require('./models/DownloadedFile');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// Catch-all route for unknown routes
app.use((req, res) => {
    // console.log('URLLLL',req.url);
    res.sendFile(path.join(__dirname, `public/${req.url}`));
});

User.hasMany(Expense);
Expense.belongsTo(User);  

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(DownloadedFile, { foreignKey: 'userId' });
DownloadedFile.belongsTo(User, { foreignKey: 'userId' });
const PORT = process.env.PORT || 3000;
sequelize
    .sync()
    .then(result => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
          });
    })
    .catch(err => console.log(err));