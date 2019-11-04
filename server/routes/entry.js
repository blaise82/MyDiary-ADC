import express from 'express';
import Entry from '../controllers/entry';
import checkToken from '../middleware/authenticate';
import checkNewEntry from '../middleware/checkNewEntry';

const router = express.Router();
router.post('/entries', [checkToken, checkNewEntry], Entry.create);
router.get('/entries', checkToken, Entry.getAll);

export default router;
