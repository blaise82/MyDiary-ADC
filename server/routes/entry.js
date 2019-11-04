import express from 'express';
import Entry from '../controllers/Entry';
import checkToken from '../middleware/authenticate';
import checkNewEntry from '../middleware/checkNewEntry';

const router = express.Router();
router.post('/entries', [checkToken, checkNewEntry], Entry.create);
export default router;
