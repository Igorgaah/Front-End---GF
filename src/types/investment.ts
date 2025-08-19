export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type InvestmentType = 
  | 'Ações'
  | 'Renda Fixa'
  | 'Fundos'
  | 'Criptomoedas'
  | 'Imóveis'
  | 'Commodities'
  | 'Outros';

export const INVESTMENT_TYPES: InvestmentType[] = [
  'Ações',
  'Renda Fixa', 
  'Fundos',
  'Criptomoedas',
  'Imóveis',
  'Commodities',
  'Outros'
];

export interface InvestmentFormData {
  name: string;
  type: InvestmentType;
  amount: string;
  date: string;
}