import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Investment, InvestmentFormData } from '@/types/investment';
import { InvestmentForm } from './InvestmentForm';
import { Edit2, Trash2, TrendingUp, Eye, Calendar, DollarSign } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface InvestmentTableProps {
  investments: Investment[];
  onUpdate: (id: string, data: InvestmentFormData) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const getTypeColor = (type: string) => {
  const colors = {
    'Ações': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
    'Renda Fixa': 'bg-green-500/20 text-green-400 border-green-400/30',
    'Fundos': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
    'Criptomoedas': 'bg-orange-500/20 text-orange-400 border-orange-400/30',
    'Imóveis': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    'Commodities': 'bg-red-500/20 text-red-400 border-red-400/30',
    'Outros': 'bg-gray-500/20 text-gray-400 border-gray-400/30'
  };
  return colors[type as keyof typeof colors] || colors['Outros'];
};

export const InvestmentTable = ({ investments, onUpdate, onDelete, loading }: InvestmentTableProps) => {
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (data: InvestmentFormData) => {
    if (editingInvestment) {
      onUpdate(editingInvestment.id, data);
      setIsEditDialogOpen(false);
      setEditingInvestment(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  if (loading) {
    return (
      <Card className="bg-gradient-surface border-investment-border shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gradient-surface border-investment-border shadow-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Meus Investimentos
          </CardTitle>
          <CardDescription className="text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {investments.length} investimento{investments.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Total: {formatCurrency(totalInvested)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum investimento cadastrado</h3>
              <p className="text-muted-foreground">Comece cadastrando seu primeiro investimento acima!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-investment-border hover:bg-investment-secondary/50">
                    <TableHead className="text-foreground font-semibold">Nome</TableHead>
                    <TableHead className="text-foreground font-semibold">Tipo</TableHead>
                    <TableHead className="text-foreground font-semibold">Valor</TableHead>
                    <TableHead className="text-foreground font-semibold">Data</TableHead>
                    <TableHead className="text-foreground font-semibold text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((investment) => (
                    <TableRow 
                      key={investment.id} 
                      className="border-investment-border hover:bg-investment-secondary/30 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        {investment.name}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTypeColor(investment.type)} font-medium`}>
                          {investment.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {formatCurrency(investment.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(investment.date)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(investment)}
                            className="border-investment-border hover:bg-investment-accent hover:text-accent-foreground"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-investment-surface border-investment-border">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  Tem certeza que deseja excluir o investimento "{investment.name}"? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-investment-border hover:bg-investment-secondary">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(investment.id)}
                                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-investment-surface border-investment-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Editar Investimento</DialogTitle>
          </DialogHeader>
          {editingInvestment && (
            <InvestmentForm
              onSubmit={handleEditSubmit}
              initialData={editingInvestment}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};