import { useState, useEffect } from 'react';
import { Investment, InvestmentFormData } from '@/types/investment';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'investments';

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load investments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setInvestments(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading investments:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar investimentos salvos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Save investments to localStorage
  const saveToStorage = (newInvestments: Investment[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newInvestments));
    } catch (error) {
      console.error('Error saving investments:', error);
      toast({
        title: "Erro", 
        description: "Erro ao salvar investimentos.",
        variant: "destructive"
      });
    }
  };

  const addInvestment = (data: InvestmentFormData) => {
    const newInvestment: Investment = {
      id: crypto.randomUUID(),
      name: data.name,
      type: data.type,
      amount: parseFloat(data.amount),
      date: data.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newInvestments = [...investments, newInvestment];
    setInvestments(newInvestments);
    saveToStorage(newInvestments);

    toast({
      title: "Sucesso!",
      description: "Investimento cadastrado com sucesso.",
      variant: "default"
    });

    return newInvestment;
  };

  const updateInvestment = (id: string, data: InvestmentFormData) => {
    const newInvestments = investments.map(investment =>
      investment.id === id
        ? {
            ...investment,
            name: data.name,
            type: data.type,
            amount: parseFloat(data.amount),
            date: data.date,
            updatedAt: new Date().toISOString()
          }
        : investment
    );

    setInvestments(newInvestments);
    saveToStorage(newInvestments);

    toast({
      title: "Sucesso!",
      description: "Investimento atualizado com sucesso.",
      variant: "default"
    });
  };

  const deleteInvestment = (id: string) => {
    const newInvestments = investments.filter(investment => investment.id !== id);
    setInvestments(newInvestments);
    saveToStorage(newInvestments);

    toast({
      title: "Sucesso!",
      description: "Investimento excluído com sucesso.",
      variant: "destructive"
    });
  };

  const getInvestmentsByType = () => {
    return investments.reduce((acc, investment) => {
      acc[investment.type] = (acc[investment.type] || 0) + investment.amount;
      return acc;
    }, {} as Record<string, number>);
  };

  const getTotalInvested = () => {
    return investments.reduce((total, investment) => total + investment.amount, 0);
  };

  return {
    investments,
    loading,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    getInvestmentsByType,
    getTotalInvested
  };
};