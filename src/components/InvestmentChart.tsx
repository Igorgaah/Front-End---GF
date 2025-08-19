import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

interface InvestmentChartProps {
  data: Record<string, number>;
  totalInvested: number;
}

const COLORS = {
  'Ações': '#3B82F6',
  'Renda Fixa': '#10B981', 
  'Fundos': '#8B5CF6',
  'Criptomoedas': '#F59E0B',
  'Imóveis': '#EAB308',
  'Commodities': '#EF4444',
  'Outros': '#6B7280'
};

export const InvestmentChart = ({ data, totalInvested }: InvestmentChartProps) => {
  const chartData = Object.entries(data).map(([type, amount]) => ({
    name: type,
    value: amount,
    percentage: ((amount / totalInvested) * 100).toFixed(1)
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-investment-surface border border-investment-border rounded-lg p-3 shadow-card">
          <p className="text-foreground font-semibold">{data.name}</p>
          <p className="text-primary font-medium">{formatCurrency(data.value)}</p>
          <p className="text-muted-foreground text-sm">{data.percentage}% do total</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.value} ({chartData.find(d => d.name === entry.value)?.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (chartData.length === 0) {
    return (
      <Card className="bg-gradient-surface border-investment-border shadow-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Distribuição por Tipo
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Visualize como seus investimentos estão distribuídos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Sem dados para exibir</h3>
            <p className="text-muted-foreground">Cadastre investimentos para ver o gráfico de distribuição</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-surface border-investment-border shadow-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Distribuição por Tipo
        </CardTitle>
        <CardDescription className="text-muted-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Total investido: {formatCurrency(totalInvested)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-foreground mb-3">Resumo Detalhado:</h4>
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-investment-secondary/50 border border-investment-border">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
                />
                <span className="font-medium text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-primary font-semibold">{formatCurrency(item.value)}</p>
                <p className="text-xs text-muted-foreground">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};