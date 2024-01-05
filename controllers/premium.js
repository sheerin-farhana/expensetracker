const { User } = require('../models/User');
const { Expense } = require('../models/Expense');
const sequelize = require('../utils/database');
const e = require('cors');


const showLeaderboard = async (req, res, next) =>  {
    try {
        

        const userAndExpenses = await User.findAll({
            attributes: ['id','Name','TotalExpenses'],
            order: [["TotalExpenses", "Desc"]]
        });

        // console.log(userAndExpenses);
        
        res.status(200).json(userAndExpenses);
        
    }
    catch (err) {
        console.log(err);
    }
}





module.exports = { showLeaderboard  };