import { Request, Response } from 'express';
import { CartoesService } from '../services/cartoes.service';

export const CartoesController = {
  listar: (req: Request, res: Response) => {
    const cartoes = CartoesService.listar();
    res.json(cartoes);
  },

  buscarPorId: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cartao = CartoesService.buscarPorId(id);
    if (!cartao) return res.status(404).json({ erro: 'Cartão não encontrado' });
    res.json(cartao);
  },

  criar: (req: Request, res: Response) => {
    const { nome, limite, fechamento, vencimento } = req.body;
    const novo = CartoesService.criar({ nome, limite, fechamento, vencimento });
    res.status(201).json(novo);
  },

  atualizar: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, limite, fechamento, vencimento } = req.body;
    const existente = CartoesService.buscarPorId(id);
    if (!existente) return res.status(404).json({ erro: 'Cartão não encontrado' });

    const atualizado = CartoesService.atualizar(id, { nome, limite, fechamento, vencimento });
    res.json(atualizado);
  },

  deletar: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const existente = CartoesService.buscarPorId(id);
    if (!existente) return res.status(404).json({ erro: 'Cartão não encontrado' });

    CartoesService.deletar(id);
    res.status(204).send();
  },
};
