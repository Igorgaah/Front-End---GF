import { Investment, InvestmentFormData } from '@/types/investment';

const API_BASE_URL = 'http://localhost:3000';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const investmentApi = {
  async getAll(): Promise<Investment[]> {
    const response = await fetch(`${API_BASE_URL}/investments`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar investimentos');
    }

    return response.json();
  },

  async getById(id: string): Promise<Investment> {
    const response = await fetch(`${API_BASE_URL}/investments/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar investimento');
    }

    return response.json();
  },

  async create(data: InvestmentFormData): Promise<Investment> {
    const response = await fetch(`${API_BASE_URL}/investments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar investimento');
    }

    return response.json();
  },

  async update(id: string, data: InvestmentFormData): Promise<Investment> {
    const response = await fetch(`${API_BASE_URL}/investments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar investimento');
    }

    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/investments/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir investimento');
    }
  },

  async getDistribution(): Promise<{ type: string; count: number }[]> {
    const response = await fetch(`${API_BASE_URL}/investments/types/distribution`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar distribuição de tipos');
    }

    return response.json();
  },
};
