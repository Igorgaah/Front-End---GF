# 📊 Front-End - Sistema de Investimentos

Este projeto é um **front-end em React + TypeScript** para gerenciamento de investimentos.
O sistema permite cadastrar, listar, editar e excluir investimentos, além de exibir gráficos com a distribuição por tipo.

---

## 🚀 Funcionalidades

### 🔹 **Tela de Cadastro**

* Formulário para adicionar novos investimentos.
* Validação de campos obrigatórios.
* Feedback visual em caso de erro ou sucesso.

### 🔹 **Tela de Listagem**

* Tabela com todos os investimentos cadastrados.
* Ações: **Editar** e **Excluir** diretamente na listagem.

### 🔹 **Dashboard**

* Exibição de **gráfico de distribuição** dos tipos de investimento.
* Estatísticas resumidas para melhor visualização.

### 🔹 **Feedback & Validações**

* Sistema de **toasts** para mensagens de sucesso/erro.
* Hooks para controle de estado e responsividade.

---

## 🛠️ Tecnologias Utilizadas

* **React.js + TypeScript**
* **Vite** (ambiente de build rápido)
* **TailwindCSS** (estilização moderna)
* **Chart.js / react-chartjs-2** (gráficos)
* **ShadCN/UI** (componentes UI reutilizáveis)

---

## 📂 Estrutura do Projeto

```
src/
 ├── components/        # Componentes reutilizáveis
 │   ├── ui/            # Componentes de UI (botões, inputs, etc)
 │   ├── InvestmentChart.tsx
 │   ├── InvestmentForm.tsx
 │   └── InvestmentTable.tsx
 │
 ├── hooks/             # Hooks customizados
 │   ├── use-mobile.tsx
 │   ├── use-toast.ts
 │   └── useInvestments.ts
 │
 ├── lib/               # Funções utilitárias
 │   └── utils.ts
 │
 ├── pages/             # Páginas principais
 │   ├── Dashboard.tsx
 │   ├── Index.tsx
 │   └── NotFound.tsx
 │
 ├── types/             # Tipagens do TypeScript
 │   └── investment.ts
 │
 ├── App.tsx            # Componente raiz
 ├── main.tsx           # Ponto de entrada
 ├── index.css          # Estilos globais
 └── vite-env.d.ts      # Tipagem do Vite
```

---

## ▶️ Como Executar

1. Instalar dependências:

   ```bash
   npm install
   ```

2. Rodar a aplicação:

   ```bash
   npm run dev
   ```

3. Acessar no navegador:

   ```
   http://localhost:5173
   ```

---

## 📌 Próximos Passos

* [ ] Melhorar responsividade em mobile.
* [ ] Criar autenticação para login de usuários.
* [ ] Adicionar filtros e busca na tabela de investimentos.
* [ ] Criar novos tipos de gráficos (linha, barras).

---

📌 Projeto desenvolvido em **React + TypeScript + Tailwind** com foco em boas práticas de organização.

