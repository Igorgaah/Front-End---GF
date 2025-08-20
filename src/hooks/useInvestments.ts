import { useState, useEffect } from 'react';
import { Investment, InvestmentFormData } from '@/types/investment';
import { toast } from '@/hooks/use-toast';
import { investmentApi } from '@/services/investmentApi';

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load investments from API
  useEffect(() => {
    const loadInvestments = async () => {
      try {
        const data = await investmentApi.getAll();
        setInvestments(data);
      } catch (error) {
        console.error('Error loading investments:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar investimentos da API.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadInvestments();
  }, []);

  const addInvestment = async (data: InvestmentFormData) => {
    try {
      const newInvestment = await investmentApi.create(data);
      setInvestments(prev => [...prev, newInvestment]);

      toast({
        title: "Sucesso!",
        description: "Investimento cadastrado com sucesso.",
        variant: "default"
      });

      return newInvestment;
    } catch (error) {
      console.error('Error adding investment:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar investimento.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateInvestment = async (id: string, data: InvestmentFormData) => {
    try {
      const updatedInvestment = await investmentApi.update(id, data);
      setInvestments(prev => 
        prev.map(investment =>
          investment.id === id ? updatedInvestment : investment
        )
      );

      toast({
        title: "Sucesso!",
        description: "Investimento atualizado com sucesso.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating investment:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar investimento.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteInvestment = async (id: string) => {
    try {
      await investmentApi.delete(id);
      setInvestments(prev => prev.filter(investment => investment.id !== id));

      toast({
        title: "Sucesso!",
        description: "Investimento excluído com sucesso.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error deleting investment:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir investimento.",
        variant: "destructive"
      });
      throw error;
    }
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