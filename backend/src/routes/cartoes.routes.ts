import { Router } from 'express';
import { CartoesController } from '../controllers/cartoes.controller';

const router = Router();

router.get('/', CartoesController.listar);
router.get('/:id', CartoesController.buscarPorId);
router.post('/', CartoesController.criar);
router.put('/:id', CartoesController.atualizar);
router.delete('/:id', CartoesController.deletar);

export default router;
