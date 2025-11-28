import { Router } from 'express';
import weather from './routes/weatherRoute'
import news from './routes/newsRoute'

export default () => {
	const app = Router();

	weather(app);
	news(app);
    
	return app
}