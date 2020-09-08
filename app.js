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

hbs.handlebars.registerHelper('eq', function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

const app = express();
const PORT = 3000;

app.use(urlencodedParser);
app.use(bodyParser.json());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listen PORT ${PORT}`);
})