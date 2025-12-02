import { Router } from 'express';
import favorite from './routes/favoriteRoute';
import notification from './routes/notificationRoute';
import userTripHistory from './routes/userTripHistoryRoute';

export default () => {
	const app = Router();

	favorite(app);
	notification(app);
	userTripHistory(app);
	
	return app
}
