const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();
const morgan = require('morgan');
const moment = require('moment');

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My app';

const FILE_NAME = './DB/persons.json';

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', 'src/views');
app.set('view engine', 'ejs');


function calculateAgeInDays(birthdate) {
 
    const currentDate = moment();

    
    const birthDate = moment(birthdate, 'YYYY-MM-DD');

    const ageInDays = currentDate.diff(birthDate, 'days');

    return ageInDays;
}

app.get('/persons', (req, res) => {
    const data = readFile(FILE_NAME);
    
    // Agrega la fecha y hora actual al archivo 'access.json'
    const accessLog = {
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    appendToFile('./DB/access.json', accessLog);

    // Filtra las personas que tengan una edad en días superior a 5475
    const filteredPersons = data.filter(person => {
        const ageInDays = calculateAgeInDays(person.birthdate);
        return ageInDays > 5475;
    });

    res.render('index', { persons: filteredPersons, calculateAgeInDays }); // Pasa la función como variable local
});

function readFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}


function appendToFile(fileName, data) {
    const existingData = readFile(fileName);
    existingData.push(data);
    fs.writeFileSync(fileName, JSON.stringify(existingData, null, 2));
}

app.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});
