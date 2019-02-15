const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
    res.send({ express: 'Test Hello From Express' });
});

app.post('/api/currency', (req, res) => {
    //console.log('reach server POST...', req.body)
    const { amount, currency } = req.body
    const randomVal = Math.random()
    const conversion = amount * 2 + randomVal

    const newVal = {
        amount: conversion,
        currency: "USD"
    }

    console.log(`Test conversion (val * 2 + random): ${amount} * 2 + ${randomVal} = ${conversion}`)

    res.send(
        res.status(200).send(newVal)
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));