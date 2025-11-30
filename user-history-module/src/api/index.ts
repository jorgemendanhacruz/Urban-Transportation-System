import { Router } from 'express';
import favorite from './routes/favoriteRoute';

export default () => {
	const app = Router();

	favorite(app);
	
	return app
}
