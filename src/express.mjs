import express from 'express';
import { mapController } from './controllers/mapController.mjs';

const app = express();

app.use(express.static('./public'))
app.set('view engine', 'ejs')

app.get('/record/:mapNumber', mapController.getMap);

export default (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`Listening at port ${port}`)
  })
}
