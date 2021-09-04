const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const port = 3000;

app.get('/', (req, res) => {
    res.render('index', { title: 'This Is My Title'});
});

// Example of api call route commented below
// app.get('/:name', (req, res) => {
//     let name = req.params.name;

//     res.json({
//         message: `Hello ${name}`
//     });
// });

app.get('/api/finnhub/:ticker', cors(), (req, res) => {
    let ticker = req.params.ticker;

    // Start Of Stock Shit 
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "sandbox_c4pbg1qad3ifau3qu76g"
    const finnhubClient = new finnhub.DefaultApi()
    
    //basic financials
    finnhubClient.companyBasicFinancials(ticker, "all", (error, data, response) => {
        res.json(data);
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});