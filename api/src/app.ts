import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import './config'

import videosRoutes from './routes/videos.routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use( express.json() );
app.use(express.urlencoded( { extended: false } ) );

morganBody( app );
app.use((req, res, next) => { next(); }, cors({maxAge: 84600}));

app.use(videosRoutes);

export default app;