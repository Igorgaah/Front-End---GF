import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvestmentFormData, INVESTMENT_TYPES, Investment } from '@/types/investment';
import { PlusCircle, Save } from 'lucide-react';

interface InvestmentFormProps {
  onSubmit: (data: InvestmentFormData) => void;
  initialData?: Investment;
  isEditing?: boolean;
}

export const InvestmentForm = ({ onSubmit, initialData, isEditing = false }: InvestmentFormProps) => {
  const [formData, setFormData] = useState<InvestmentFormData>({
    name: initialData?.name || '',
    type: initialData?.type || 'Ações',
    amount: initialData?.amount?.toString() || '',
    date: initialData?.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Partial<InvestmentFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<InvestmentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Valor é obrigatório';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser um número positivo';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData({
          name: '',
          type: 'Ações',
          amount: '',
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return (Number(number) / 100).toFixed(2);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = formatCurrency(value);
    setFormData({ ...formData, amount: formatted });
  };

  return (
    <Card className="bg-gradient-surface border-investment-border shadow-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          {isEditing ? <Save className="h-6 w-6 text-primary" /> : <PlusCircle className="h-6 w-6 text-primary" />}
          {isEditing ? 'Editar Investimento' : 'Novo Investimento'}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isEditing ? 'Atualize as informações do seu investimento' : 'Cadastre um novo investimento na sua carteira'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Nome do Investimento
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Ações Magazine Luiza"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`bg-investment-secondary border-investment-border focus:ring-primary ${
                errors.name ? 'border-destructive focus:ring-destructive' : ''
              }`}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-foreground">
              Tipo de Investimento
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
              <SelectTrigger className="bg-investment-secondary border-investment-border focus:ring-primary">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-investment-surface border-investment-border">
                {INVESTMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="focus:bg-investment-secondary">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">
              Valor Investido (R$)
            </Label>
            <Input
              id="amount"
              type="text"
              placeholder="0,00"
              value={formData.amount}
              onChange={handleAmountChange}
              className={`bg-investment-secondary border-investment-border focus:ring-primary ${
                errors.amount ? 'border-destructive focus:ring-destructive' : ''
              }`}
            />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-foreground">
              Data do Investimento
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`bg-investment-secondary border-investment-border focus:ring-primary ${
                errors.date ? 'border-destructive focus:ring-destructive' : ''
              }`}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground font-semibold py-2.5 transition-all duration-300 shadow-elegant hover:shadow-glow"
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Atualizar Investimento
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Cadastrar Investimento
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};