import { Request, Response } from 'express'
import * as parcelasService from '../services/parcelas.service'

export async function listarParcelas(req: Request, res: Response) {
  const parcelas = await parcelasService.listarParcelas()
  res.json(parcelas)
}

export async function criarParcela(req: Request, res: Response) {
  const parcela = await parcelasService.criarParcela(req.body)
  res.status(201).json(parcela)
}

export async function atualizarParcela(req: Request, res: Response) {
  const { id } = req.params
  const atualizada = await parcelasService.atualizarParcela(Number(id), req.body)
  res.json(atualizada)
}

export async function deletarParcela(req: Request, res: Response) {
  const { id } = req.params
  await parcelasService.deletarParcela(Number(id))
  res.status(204).send()
}


export const listarPorDivida = async (req: Request, res: Response) => {
    try {
      const { dividaId } = req.params
      const parcelas = await parcelasService.listarPorDivida(Number(dividaId))
      res.json(parcelas)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar parcelas' })
    }
  }
  