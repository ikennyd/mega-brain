# MARKETPLACE MONTHLY UPDATE - Standard Operating Procedure

> **Versão:** 1.0.0
> **Data de Criação:** 2026-03-01
> **Frequência:** Mensal (1º dia útil de cada mês)
> **Responsável:** Consultoria
> **Impacto:** CFO e CMO agents

---

## 📋 OBJETIVO

Manter o Mega Brain atualizado com informações oficiais de tarifas e políticas de marketplace, garantindo que **CFO e CMO tenham dados atuais** para consultas de clientes.

---

## 🔄 FLUXO MENSAL

```
┌─────────────────────────────────────────────────────────────────┐
│ 1º DIA ÚTIL DE CADA MÊS                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ① VERIFICAR MUDANÇAS                                            │
│    └─ Visitar portais oficiais das 5 plataformas              │
│                                                                 │
│ ② DOCUMENTAR NOVIDADES                                          │
│    └─ Atualizar TARIFAS-MARKETPLACES-YYYY-MM.md               │
│                                                                 │
│ ③ CRIAR CHANGELOG                                              │
│    └─ Listar mudanças detectadas                               │
│                                                                 │
│ ④ NOTIFICAR AGENTES                                            │
│    └─ CFO e CMO sabem que dados foram atualizados              │
│                                                                 │
│ ⑤ VERIFICAÇÃO FINAL                                            │
│    └─ Testar /ask CFO e /ask CMO com dados novos              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ PASSO 1: VERIFICAR MUDANÇAS

### Checklist de Verificação (Abrir em aba do navegador)

| Plataforma | URL | O Verificar | Tempo Estimado |
|-----------|-----|-----------|--------|
| **MercadoLivre** | https://www.mercadolivre.com.br/landing/custos-de-venda | Comissões, taxas, novas categorias | 15 min |
| **TikTok Shop** | https://seller.tiktok.com/docs (se disponível) | Tarifas, limite de desconto, regras de ads | 10 min |
| **Shopee** | https://seller.shopee.com.br | Comissões, taxas, políticas de promo | 10 min |
| **Amazon BR** | https://sellercentral.amazon.com.br/pricing | Comissões, taxas, planos | 10 min |
| **Magalu** | https://marketplace.magalu.com | Comissões, taxas, políticas | 10 min |

**Total de tempo:** ~60 minutos

### O Que Procurar

Para cada plataforma, procurar por mudanças em:

✅ **Comissões**
- Alterações por categoria?
- Nova categoria adicionada?
- Desconto em percentual?

✅ **Taxas**
- Taxa de transação mudou?
- Taxa de frete mudou?
- Nova taxa adicionada?

✅ **Políticas de Desconto**
- Limite máximo mudou?
- Restrições novas?

✅ **Publicidade**
- Bid mínimo mudou?
- CPC médio alterado?
- ROAS esperado diferente?

---

## 📝 PASSO 2: ATUALIZAR DOCUMENTO

### Arquivo a Atualizar

**Localização:** `/agents/sua-empresa/metrics/TARIFAS-MARKETPLACES-YYYY-MM.md`

### Procedimento

1. **Renomear arquivo mensal anterior:**
   ```
   TARIFAS-MARKETPLACES-2026-03.md → BACKUP_TARIFAS-2026-03.md
   ```

2. **Criar novo arquivo para o mês:**
   ```
   TARIFAS-MARKETPLACES-2026-04.md (para abril)
   ```

3. **Para cada tabela, atualizar:**
   - Remover `[VERIFICAR MANUAL]` e preencher com dados reais
   - Atualizar `vigente_ate` com data do próximo mês
   - Adicionar URL de fonte onde verificou

### Template de Atualização

```markdown
## MERCADOLIVRE

### Comissões por Categoria

| Categoria | Comissão % | Vigente Até | Fonte |
|-----------|----------|----------|-------|
| Eletrônicos | 15.5% | 2026-04-30 | https://... |
| Moda | 12% | 2026-04-30 | https://... |
```

---

## 🔄 PASSO 3: CRIAR CHANGELOG

### Localização

Adicionar seção ao final do arquivo `TARIFAS-MARKETPLACES-YYYY-MM.md`:

```markdown
## 📋 CHANGELOG - 2026-04-01

### ✅ Novidades (Positivas)
- MercadoLivre: Novas categorias com comissão reduzida
- Shopee: Desconto em taxa de frete para sellers top

### ⚠️ Mudanças (Atenção)
- TikTok Shop: Limite de desconto reduzido de 25% para 20%
- Amazon: CAC esperado aumentou 2%

### ❌ Descontinuações
- Magalu: Removeu programa de cashback para sellers

### 📊 Comparativo (antes vs depois)

| Métrica | Anterior | Novo | Impacto |
|---------|----------|------|--------|
| Margem MercadoLivre (eletrônicos) | 41.5% | 41% | -0.5% |
| Limite desconto TikTok Shop | 25% | 20% | Crítico |
```

---

## 📢 PASSO 4: NOTIFICAR AGENTES

### Comunicação Interna

**Para:** CFO e CMO (notar que são agentes no JARVIS)

**Template:**
```
ATUALIZAÇÃO MENSAL — Tarifas e Políticas de Marketplace

Senhor,

As tarifas de marketplace foram atualizadas para April 2026.

Mudanças detectadas:
• TikTok Shop: Limite de desconto reduzido (25% → 20%)
• MercadoLivre: Novas categorias com comissão reduzida
• Amazon: CAC esperado ligeiramente aumentado

Recomendação: Verificar documento atualizado antes de próximas consultas.

Arquivo: agents/sua-empresa/metrics/TARIFAS-MARKETPLACES-2026-04.md

Atenciosamente,
JARVIS
```

---

## ✔️ PASSO 5: VERIFICAÇÃO FINAL

### Teste CFO

Executar comando:
```
/ask CFO "Qual é a margem esperada de vender R$1.000 em cada marketplace em abril?"
```

**Resultado esperado:**
- CFO cita dados de **abril** (não março)
- CFO mostra cálculo com taxas atualizadas
- CFO menciona fontes de dados

### Teste CMO

Executar comando:
```
/ask CMO "Quais são as restrições de desconto em cada marketplace em abril?"
```

**Resultado esperado:**
- CMO cita **novos limites** (ex: TikTok máx 20%)
- CMO menciona se houve mudanças
- CMO recomenda ações baseadas em políticas novas

### Validação

- ✅ Dados estão atualizados (mês correto)?
- ✅ Campos `vigente_ate` estão preenchidos?
- ✅ URLs de fonte estão corretas?
- ✅ CFO e CMO citam dados do mês atual?

---

## 📅 CALENDÁRIO DE EXECUÇÃO

| Data | Ação | Responsável |
|------|------|-------------|
| **1º dia útil do mês** | Verificação de mudanças | Consultoria |
| **1º dia útil + 1h** | Atualizar documento | Consultoria |
| **1º dia útil + 2h** | Criar changelog | Consultoria |
| **1º dia útil + 2h 30min** | Notificar agentes | JARVIS |
| **1º dia útil + 3h** | Teste CFO e CMO | Consultoria |

---

## 🛠️ FERRAMENTAS NECESSÁRIAS

- Navegador com acesso aos 5 portais de vendedor
- Editor de markdown (VSCode ou similar)
- Conta de vendedor em cada plataforma (recomendado)

---

## 📚 CAMPOS OBRIGATÓRIOS

Nunca deixar em branco:

- ✅ `vigente_ate` — Até quando a tarifa é válida
- ✅ `Fonte` — URL onde foi verificado
- ✅ `Data de atualização` — Quando foi feita a verificação
- ✅ `CHANGELOG` — Resumo de mudanças

Campos com `[VERIFICAR MANUAL]` são aceitáveis se:
- Data de verificação < 30 dias
- URL de fonte está documentada
- Campo indica **claramente** que precisa manual

---

## ⚠️ ALERTAS DE MUDANÇA

### Mudanças Críticas (Notificar Imediatamente)

Se detectar:
- ❌ Limite de desconto reduzido
- ❌ Comissão aumentada
- ❌ Suspensão de programa de publicidade
- ❌ Nova restrição de categoria

**Ação:** Notificar CFO e CMO no mesmo dia, não esperar até final do mês.

---

## 🔐 INTEGRIDADE DE DADOS

### Validação Antes de Publicar

Executar checklist:

```
[ ] Todos os valores têm fonte documentada?
[ ] Não há campos vazios (exceto [VERIFICAR MANUAL])?
[ ] Datas estão corretas (vigente_ate)?
[ ] CHANGELOG foi criado?
[ ] CFO e CMO foram testados?
[ ] Documento foi versionado?
```

---

## 📞 CONTATO PARA DÚVIDAS

Se houver divergência entre fontes:
1. Sempre consultar portal oficial da plataforma
2. Documentar qual fonte foi usada
3. Marcar como `[REVISÃO PENDENTE]` se houver dúvida
4. Avisar CFO/CMO para validação manual

---

## 📝 HISTÓRICO DE ATUALIZAÇÕES

| Versão | Data | Mudança |
|--------|------|---------|
| 1.0.0 | 2026-03-01 | SOP inicial criado |

---

**Este SOP garante que CFO e CMO sempre tenham dados atualizados para consultas de clientes.**

*Última revisão: 2026-03-01*
