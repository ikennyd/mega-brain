# WEEK 2 SPRINT TASKS
## Dashboard Data Integration Sprint
**Sprint:** 2026-03-10 to 2026-03-14
**Goal:** 7 componentes + infraestrutura live + performance 90+

---

## MONDAY - Data Engineer Day 2

### T1: PostgreSQL Setup [90 min]
- [ ] Escolher path: Docker (20min) ou Manual (45min)
- [ ] Executar docker-compose ou instalacao manual
- [ ] Verificar DDL: 3 tables, 10 indexes, 5 views
- [ ] Screenshot e relatório: DATA-ENGINEER-DAY1-REPORT.md
**Guia:** DOCKER-QUICK-START.md
**Success:** SELECT COUNT(*) FROM sales_live retorna 0

### T2: Redis Config [20 min]
- [ ] Iniciar Redis
- [ ] redis-cli ping retorna PONG
- [ ] Configurar TTLs: 5min (sales), 1hr (tariffs), 30s (realtime)
**Success:** Cache hit rate registrado

### T3: N8N Workflow Import [30 min]
- [ ] Importar workflow do scripts/n8n-workflow.json
- [ ] Configurar credenciais API
- [ ] DRY RUN sem erros
- [ ] Cron agendado
**Success:** Workflow status = Active

### T4: E2E Pipeline Test [30 min]
- [ ] Inserir dados de teste no PostgreSQL
- [ ] Trigger N8N manualmente
- [ ] Verificar dados no Redis
- [ ] Verificar no frontend (atualizar em tempo real)
**Success:** Dado inserido -> aparece no dashboard em <5s

---

## TUESDAY - Performance + Testing Framework

### T5: Full Lighthouse Audit [30 min]
```bash
lighthouse http://localhost:3000 --output json --output html --output-path ./perf/lighthouse-week2
```
- [ ] Performance score capturado
- [ ] Accessibility score capturado
- [ ] Best Practices capturado
- [ ] SEO capturado
- [ ] PERFORMANCE-BASELINE.md atualizado
**Target:** Performance >= 90

### T6: Core Web Vitals [30 min]
- [ ] LCP: < 2.5s
- [ ] CLS: < 0.1
- [ ] FID: < 100ms
- [ ] Documentar no PERFORMANCE-BASELINE.md
**Tool:** Lighthouse CLI ou Chrome DevTools

### T7: Testing Framework [25 min]
- [ ] npm install jest @testing-library/react @testing-library/jest-dom ts-jest
- [ ] Criar jest.config.js
- [ ] Teste exemplo: Header.test.tsx
- [ ] npm test -> PASS
**Resultado:** Framework configurado, 2 testes passando

---

## WEDNESDAY - Componentes 1-2

### T8: MetricCard Component [90 min]
**File:** frontend/app/components/MetricCard.tsx

Props:
- icon (React.ReactNode)
- label (string)
- value (number | string)
- trend (number, opcional)
- trendUp (boolean)
- color ('green' | 'red' | 'blue')

- [ ] Componente renderizando
- [ ] 3 variantes visuais (positivo/negativo/neutro)
- [ ] Responsivo
- [ ] 3 testes unitários passando
**Instancias no Dashboard:** Revenue, Sales Count, AOV, Conversion Rate

### T9: SalesChart Component [120 min]
**File:** frontend/app/components/SalesChart.tsx
**Deps:** npm install chart.js react-chartjs-2

- [ ] Busca dados de /api/sales
- [ ] Line chart com labels de data
- [ ] Atualiza a cada 30 segundos
- [ ] Responsivo
- [ ] Loading state
- [ ] Error handling
- [ ] 2 testes unitários passando
**Prazo:** Fim do dia quarta

---

## THURSDAY - Componentes 3-4

### T10: PricingTable Component [60 min]
**File:** frontend/app/components/PricingTable.tsx

- [ ] Busca de /api/tarifas
- [ ] 3 planos exibidos em colunas
- [ ] Comparacao de features
- [ ] Badge "Mais Popular" no Professional
- [ ] CTA button por plano
- [ ] Responsivo (colunas -> cards no mobile)
- [ ] 2 testes unitários passando

### T11: ActivityFeed Component [90 min]
**File:** frontend/app/components/ActivityFeed.tsx
**Hook:** useWebSocket (ja existe)

- [ ] Exibe ultimas 10 atividades
- [ ] Auto-scroll para itens novos
- [ ] Tempo relativo ("2 min ago")
- [ ] Skeleton loading
- [ ] Estado vazio (sem atividades)
- [ ] 2 testes unitários passando

---

## FRIDAY - Componentes 5-7 + Integracao

### T12: StatusMonitor Component [60 min]
**File:** frontend/app/components/StatusMonitor.tsx

- [ ] 3 servicos: API, DB, Cache
- [ ] Indicadores coloridos (verde/amarelo/vermelho)
- [ ] Tempo de resposta por servico
- [ ] Ultimo check timestamp
- [ ] Auto-refresh a cada 10s
- [ ] 2 testes unitários passando

### T13: Dashboard Container + Header v2 [120 min]
**File:** frontend/app/components/Dashboard.tsx + update page.tsx

Dashboard Layout:
- [ ] Grid 2-colunas (desktop) / 1-coluna (mobile)
- [ ] Todos 7 componentes importados
- [ ] Tema escuro/claro funcionando
- [ ] Sem erros no console
- [ ] Lighthouse performance ainda >= 85

Header v2:
- [ ] Theme toggle (claro/escuro)
- [ ] Mobile hamburger menu
- [ ] Logo refinado

### T14: QA Final + Documentacao [60 min]
- [ ] Testar em 3 dispositivos/tamanhos
- [ ] Verificar dados reais fluindo (se infra pronta)
- [ ] Rodar npm test (tudo verde)
- [ ] Rodar lighthouse (score >= 85)
- [ ] Criar WEEK2-COMPONENT-SUMMARY.md
- [ ] Git commit: "feat: Week 2 dashboard sprint complete"
- [ ] PR criado e documentado

---

## 7 COMPONENTES - RESUMO

| # | Componente | Arquivo | Dia | Hooks | Status |
|---|-----------|---------|-----|-------|--------|
| 1 | MetricCard | MetricCard.tsx | WED | none | TODO |
| 2 | SalesChart | SalesChart.tsx | WED | useApi | TODO |
| 3 | PricingTable | PricingTable.tsx | THU | useTariffs | TODO |
| 4 | ActivityFeed | ActivityFeed.tsx | THU | useWebSocket | TODO |
| 5 | StatusMonitor | StatusMonitor.tsx | FRI | useApi | TODO |
| 6 | Header v2 | Header.tsx (update) | FRI | useTheme | TODO |
| 7 | Dashboard | Dashboard.tsx | FRI | context | TODO |

---

## DEPENDENCIES A INSTALAR

```bash
cd frontend
npm install chart.js react-chartjs-2
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

---

## METRICAS DE SUCESSO

```
Componentes completos:    7/7
Testes passando:          14+ unitarios
Lighthouse Performance:   >= 85
LCP:                      < 2.5s
CLS:                      < 0.1
FID:                       < 100ms
API response times:        < 200ms
```

---

## ORDEM DE EXECUCAO

```
MONDAY:   T1 (PostgreSQL) -> T2 (Redis) -> T3 (N8N) -> T4 (E2E Test)
TUESDAY:  T5 (Lighthouse) -> T6 (Web Vitals) -> T7 (Jest)
WEDNESDAY: T8 (MetricCard) -> T9 (SalesChart)
THURSDAY: T10 (PricingTable) -> T11 (ActivityFeed)
FRIDAY:   T12 (StatusMonitor) -> T13 (Dashboard) -> T14 (QA)
```

---

*Sprint preparado por JARVIS em 2026-03-06*
*Proxima revisao: 2026-03-10 09:00 (kickoff)*
