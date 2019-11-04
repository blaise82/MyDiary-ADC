import express from 'express';
import Entry from '../controllers/entry';
import checkToken from '../middleware/authenticate';
import checkNewEntry from '../middleware/checkNewEntry';
import validateParams from '../middleware/validateParams';

const router = express.Router();
router.post('/entries', [checkToken, checkNewEntry], Entry.create);
router.get('/entries', checkToken, Entry.getAll);
router.get('/entries/:id', [validateParams, checkToken], Entry.getOne);
router.patch('/entries/:id', [validateParams, checkToken, checkNewEntry], Entry.update);

export default router;
