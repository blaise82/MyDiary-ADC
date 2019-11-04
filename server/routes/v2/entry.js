import express from 'express';
import Entry from '../../controllers/v2/entry';
import checkToken from '../../middleware/v2/authenticate';
import checkNewEntry from '../../middleware/v1/checkNewEntry';
import validateParams from '../../middleware/v1/validateParams';

const router = express.Router();

router.post('/entries', [checkToken, checkNewEntry], Entry.add);
router.get('/entries', checkToken, Entry.getAll);
router.get('/entries/:id', [validateParams, checkToken], Entry.getOne);

export default router;
