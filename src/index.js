import express from 'express';
import morgan from 'morgan';
import path from 'path';
import handlebars from 'express-handlebars';
import route from './routes';

const app = express();

const port = 8080;
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.engine('hbs', handlebars({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
