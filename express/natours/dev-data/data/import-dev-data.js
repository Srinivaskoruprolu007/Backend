const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: './config.env' });

const Tour = require('../../models/tourModel.js');

const DB = process.env.CONNECTION_STRING;
mongoose.connect(DB).then(() => {
    console.log('DB connection successful');
}).catch(err => {
    console.error('DB connection error:', err);
});


// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// Import data into the database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.error('Error loading data:', err);
    } finally {
        process.exit();
    }
}

// Delete all data from the database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error('Error deleting data:', err);
    } finally {
        process.exit();
    }
}

console.log(process.argv);

if(process.argv[2] === '--import') {
    importData();
}
if(process.argv[2] === '--delete') {
    deleteData();
}