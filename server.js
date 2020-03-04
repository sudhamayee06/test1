"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const app = express();
let cars = JSON.parse(fs.readFileSync('data/cars.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urlPrefix = args['base-url'] || '/';

app.use(urlPrefix, express.static(path.join(__dirname, '/dist')));

app.get(urlPrefix + 'api/cars', (req, res) => {
    res.json(cars);
});

app.get(urlPrefix + 'api/cars/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > cars.length) {
        top = skip + (cars.length - skip);
    }

    var pagedCars = cars.slice(skip, top);
    res.setHeader('X-InlineCount', cars.length);
    res.json(pagedCars);
});

app.get(urlPrefix + 'api/cars/:id', (req, res) => {
    let carId = +req.params.id;
    let selectedCar = {};
    for (let car of cars) {
        if (car.id === carId) {
            selectedCar = car;
            break;
        }
    }
    res.json(selectedCar);
});

app.post(urlPrefix + 'api/cars', (req, res) => {
    let postedCar = req.body;
    let currentMaxId = Math.max.apply(Math, cars.map((car) => car.id));
    postedCar.id = currentMaxId++;
    cars.unshift(postedCar);
    res.json(postedCar);
});

app.put(urlPrefix + 'api/cars/:id', (req, res) => {
    let putCar = req.body;
    let id = +req.params.id;
    let updated = false;

    for (let i = 0, len = cars.length; i < len; i++) {
        if (cars[i].id === id) {
            cars[i] = putCar;
            updated = true;
            break;
        }
    }
    res.json({ status: updated });
});

app.delete(urlPrefix + 'api/cars/:id', function (req, res) {
    let carId = +req.params.id;
    for (let i = 0, len = cars.length; i < len; i++) {
        if (cars[i].id === carId) {
            cars.splice(i, 1);
            break;
        }
    }
    res.json({ status: true });
});

app.post(urlPrefix + 'api/auth/register', (req, res) => {
    let isRegistered = false;
    const userData = req.body;

    users.unshift(userData);
    isRegistered = true;

    res.json(isRegistered);
});

app.post(urlPrefix + 'api/auth/login', (req, res) => {
    let isAuthenticated = false;
    const userLoginData = req.body;

    for (let i = 0, len = users.length; i < len; i++) {
        if (users[i].login === userLoginData.login && users[i].password === userLoginData.password) {
            isAuthenticated = true;
            break;
        }
    }

    res.json(isAuthenticated);
});

app.post(urlPrefix + 'api/auth/logout', (req, res) => {
    res.json(true);
});

app.listen(3000);

console.log('Express listening on port 3000.');

// Open browser
var opn = require('opn');

opn('http://localhost:3000' + urlPrefix).then(() => {
    console.log('Browser started.');
});