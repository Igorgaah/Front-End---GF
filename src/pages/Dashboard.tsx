import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvestmentForm } from '@/components/InvestmentForm';
import { InvestmentTable } from '@/components/InvestmentTable';
import { InvestmentChart } from '@/components/InvestmentChart';
import { useInvestments } from '@/hooks/useInvestments';
import { PlusCircle, BarChart3, List, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const {
    investments,
    loading,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    getInvestmentsByType,
    getTotalInvested
  } = useInvestments();

  const [activeTab, setActiveTab] = useState('overview');

  const totalInvested = getTotalInvested();
  const distributionData = getInvestmentsByType();
  const investmentCount = investments.length;
  const latestInvestment = investments.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            IBank - Investimentos
          </h1>
          <p className="text-xl text-muted-foreground">
            Gerencie seus investimentos de forma inteligente e organizada
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-surface border-investment-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Investido
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(totalInvested)}</div>
              <p className="text-xs text-muted-foreground">
                Em {investmentCount} investimento{investmentCount !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-surface border-investment-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tipos Diferentes
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {Object.keys(distributionData).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Diversificação da carteira
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-surface border-investment-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Último Investimento
              </CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {latestInvestment ? formatDate(latestInvestment.date) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {latestInvestment ? latestInvestment.name : 'Nenhum investimento'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-investment-secondary border-investment-border">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="add"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Cadastrar
              </TabsTrigger>
              <TabsTrigger 
                value="list"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <List className="h-4 w-4 mr-2" />
                Listar
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setActiveTab('add')}
              className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Investimento
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InvestmentChart 
                data={distributionData} 
                totalInvested={totalInvested}
              />
              <Card className="bg-gradient-surface border-investment-border shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Resumo da Carteira
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Informações gerais sobre seus investimentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-investment-secondary/50 border border-investment-border">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Investido</h4>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(totalInvested)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-investment-secondary/50 border border-investment-border">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Investimentos</h4>
                      <p className="text-2xl font-bold text-accent">{investmentCount}</p>
                    </div>
                  </div>
                  
                  {investments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Investimentos Recentes:</h4>
                      {investments
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 3)
                        .map((investment) => (
                          <div key={investment.id} className="flex items-center justify-between p-2 rounded bg-investment-secondary/30">
                            <span className="text-sm text-foreground">{investment.name}</span>
                            <span className="text-sm font-medium text-primary">{formatCurrency(investment.amount)}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="max-w-2xl mx-auto">
              <InvestmentForm onSubmit={addInvestment} />
            </div>
          </TabsContent>

          <TabsContent value="list">
            <InvestmentTable
              investments={investments}
              onUpdate={updateInvestment}
              onDelete={deleteInvestment}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};