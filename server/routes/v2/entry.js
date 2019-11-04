import express from 'express';
import Entry from '../../controllers/v2/entry';
import checkToken from '../../middleware/v2/authenticate';
import checkNewEntry from '../../middleware/v1/checkNewEntry';

const router = express.Router();

router.post('/entries', checkToken, checkNewEntry, Entry.add);
router.get('/entries', checkToken, Entry.getAll);

export default router;
