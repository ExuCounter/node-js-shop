const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./routes');

const expresshbs = require('express-handlebars');
const hbs = expresshbs.create({
    extname: 'hbs',
    layoutsDir: path.join(__dirname + '/views/layouts'),
    partialsDir: path.join(__dirname + '/views/partials'),
});

const app = express();
const PORT = 3000;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(routes);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log(`Server listen PORT ${PORT}`);
})