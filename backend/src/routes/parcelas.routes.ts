import { Router } from 'express'
import * as controller from '../controllers/parcelas.controller'

const router = Router()

router.get('/', controller.listarParcelas)
router.post('/', controller.criarParcela)
router.put('/:id', controller.atualizarParcela)
router.delete('/:id', controller.deletarParcela)
router.get('/:dividaId', controller.listarPorDivida)

export default router
