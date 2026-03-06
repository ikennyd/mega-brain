# Mega Brain P2 - Frontend

Next.js 14 boilerplate com TypeScript, Tailwind CSS 4, e APIs prontas para integração.

## 🚀 Quick Start

```bash
# Entrar no diretório
cd frontend

# Instalar dependências (já feito)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```

## 📦 O que está incluído

- ✅ Next.js 14 com App Router
- ✅ TypeScript com tipos completos
- ✅ Tailwind CSS 4 (nova API)
- ✅ Componentes reutilizáveis (Header, Button)
- ✅ Hooks customizados (useApi com SWR)
- ✅ API routes prontas:
  - `/api/health` - Health check
  - `/api/sales` - Sales endpoint
  - `/api/tarifas` - Pricing plans
- ✅ ESLint + Prettier setup
- ✅ Environment variables (.env.local)

## 📁 Estrutura

```
frontend/
├── app/
│   ├── api/                    # API routes
│   │   ├── health/route.ts
│   │   ├── sales/route.ts
│   │   └── tarifas/route.ts
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   └── Button.tsx
│   ├── hooks/                  # React hooks customizados
│   │   └── useApi.ts
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── public/                     # Static files
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.js              # Next.js config
├── .env.local                  # Environment variables
└── package.json                # NPM manifest
```

## 🔧 Scripts

```bash
npm run dev      # Desenvolvimento (http://localhost:3000)
npm run build    # Build para produção
npm start        # Iniciar servidor de produção
npm run lint     # Verificar código com ESLint
```

## 🌍 Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000
```

**Nota**: Variáveis com prefixo `NEXT_PUBLIC_` ficam disponíveis no browser. Não colocar senhas/tokens aqui.

## 📚 Componentes Disponíveis

### Button
```tsx
import { Button } from '@/app/components/Button';

<Button variant="primary" size="md">
  Clique aqui
</Button>
```

Variantes: `primary` | `secondary` | `danger`
Tamanhos: `sm` | `md` | `lg`

### Header
```tsx
import { Header } from '@/app/components/Header';

<Header />
```

## 🪝 Hooks Disponíveis

### useApi
```tsx
import { useApi } from '@/app/hooks/useApi';

const { data, error, isLoading } = useApi('/api/tarifas');

if (isLoading) return <div>Carregando...</div>;
if (error) return <div>Erro: {error.message}</div>;
return <div>{data?.tarifas?.length} planos encontrados</div>;
```

## 🔗 API Endpoints

### GET /api/health
```bash
curl http://localhost:3000/api/health

# Response
{
  "status": "ok",
  "timestamp": "2026-03-06T10:00:44.633Z",
  "version": "1.0.0"
}
```

### GET /api/tarifas
```bash
curl http://localhost:3000/api/tarifas

# Response
{
  "tarifas": [
    {
      "id": 1,
      "name": "Básico",
      "price": 299,
      "description": "Plano básico"
    },
    ...
  ]
}
```

### POST /api/sales
```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{"data": "example"}'

# Response
{
  "success": true,
  "message": "Sales data received",
  "data": {"data": "example"}
}
```

## 🎨 Tailwind CSS

Totalmente configurado com Tailwind CSS 4 (nova API).

```tsx
<div className="bg-blue-500 text-white rounded-lg p-4">
  Componente estilizado
</div>
```

## 🔒 Segurança

- ✅ TypeScript para type safety
- ✅ ESLint para linting
- ✅ `.env.local` para secrets (gitignored)
- ✅ API routes com error handling
- ✅ CORS headers prontos (customizar se necessário)

## 📈 Próximos Passos

1. **Conectar com Data-Engineer**
   - Atualizar `NEXT_PUBLIC_API_URL` para apontar ao backend Python
   - Implementar auth se necessário

2. **Adicionar Páginas**
   ```
   app/(dashboard)/sales/page.tsx
   app/(dashboard)/leads/page.tsx
   app/(dashboard)/analytics/page.tsx
   ```

3. **Expandir Componentes**
   - Dashboard cards
   - Data tables
   - Gráficos (recharts já instalado)
   - Formulários com validação

4. **Implementar Autenticação**
   - `next-auth` ou similar
   - JWT token management
   - Protected routes

5. **Deploy**
   - Vercel (recomendado, integração nativa)
   - Docker container
   - AWS/GCP/Azure

## 🆘 Troubleshooting

### Porta 3000 já em uso
```bash
# Encontrar processo
lsof -i :3000

# Matar processo
kill -9 <PID>
```

### Erro no build
```bash
# Limpar cache
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Tentar de novo
npm run dev
```

### Erro de módulos
```bash
# Verificar tsconfig.json
# Next.js modifica automaticamente - OK!

# Recompilar
npm run build
```

## 📞 Suporte

- **Documentação Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

---

**Frontend pronto para development. Integração com backend em progresso.**
