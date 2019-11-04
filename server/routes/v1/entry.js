import express from 'express';
import Entry from '../../controllers/v1/entry';
import checkToken from '../../middleware/v1/authenticate';
import checkNewEntry from '../../middleware/v1/checkNewEntry';
import validateParams from '../../middleware/v1/validateParams';

const router = express.Router();
router.post('/entries', [checkToken, checkNewEntry], Entry.create);
router.get('/entries', checkToken, Entry.getAll);
router.get('/entries/:id', [validateParams, checkToken], Entry.getOne);
router.patch('/entries/:id', [validateParams, checkToken, checkNewEntry], Entry.update);
router.delete('/entries/:id', [validateParams, checkToken], Entry.delete);


export default router;
