// import { Request, Response } from 'express'
// import * as DividasService from '../services/dividas.service'

// export function listarDividas(req: Request, res: Response) {
//   const dividas = DividasService.listar()
//   res.json(dividas)
// }

// export function criarDivida(req: Request, res: Response) {
//   const dados = req.body
//   const id = DividasService.criar(dados)
//   res.json({ id })
// }

// export function atualizarDivida(req: Request, res: Response) {
//   const { id } = req.params
//   const dados = req.body
//   DividasService.atualizar(Number(id), dados)
//   res.json({ success: true })
// }

// export function excluirDivida(req: Request, res: Response) {
//   const { id } = req.params
//   DividasService.excluir(Number(id))
//   res.json({ success: true })
// }
import { Request, Response } from 'express'
import * as DividaService from '../services/dividas.service'

export const listarDividas = (req: Request, res: Response) => {
  try {
    const dividas = DividaService.listarDividas()
    res.json(dividas)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar dívidas' })
  }
}

export const criarDivida = (req: Request, res: Response) => {
  try {
    const novaDivida = req.body
    DividaService.criarDivida(novaDivida)
    res.status(201).json({ mensagem: 'Dívida criada com sucesso' })
  } catch (error: any) {
    res.status(500).json({ erro: error.message || 'Erro ao criar dívida' })
  }
}

export const atualizarDivida = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const dadosAtualizados = req.body
    DividaService.atualizarDivida(Number(id), dadosAtualizados)
    res.json({ mensagem: 'Dívida atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar dívida' })
  }
}

export const excluirDivida = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    DividaService.excluirDivida(Number(id))
    res.json({ mensagem: 'Dívida excluída com sucesso' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir dívida' })
  }
}
