import { Router } from 'express';
import userSession from './routes/userSessionRoute'

export default () => {
	const app = Router();

	userSession(app);
    
	return app
}