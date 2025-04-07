import { Router } from 'express'
import {
  listarDividas,
  criarDivida,
  atualizarDivida,
  excluirDivida
} from '../controllers/dividas.controller'

const router = Router()

router.get('/', listarDividas)
router.post('/', criarDivida)
router.put('/:id', atualizarDivida)
router.delete('/:id', excluirDivida)

export default router
