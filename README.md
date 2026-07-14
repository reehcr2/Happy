# Happy 🏠

Aplicação para conectar pessoas a orfanatos, facilitando a visita e o apoio a essas instituições. Encontre orfanatos próximos num mapa interativo, veja informações de cada instituição e entre em contato para agendar uma visita.

> Projeto desenvolvido durante a **Next Level Week #3** da [Rocketseat](https://www.rocketseat.com.br/).

---

## ✨ Funcionalidades

- 🗺️ Visualização de orfanatos cadastrados num mapa interativo
- 📍 Cadastro de novo orfanato com seleção de localização no mapa
- 📸 Upload de fotos do local
- ℹ️ Informações detalhadas: horário de visitação, instruções, atendimento em finais de semana
- 💬 Contato direto via WhatsApp
- 📱 Disponível em web e mobile, com a mesma base de API

---

## 🏗️ Arquitetura

Monorepo dividido em três camadas independentes:

```
Happy/
├── backend/    → API REST em Node.js + TypeScript
├── web/        → Aplicação web em React
└── mobile/     → Aplicativo em React Native (Expo)
```

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| **Backend** | Node.js, Express, TypeScript, TypeORM, SQLite (better-sqlite3) |
| **Web** | React, TypeScript, Vite, React Leaflet |
| **Mobile** | React Native, Expo (Router), react-native-maps |
| **Validação** | Yup |
| **Estilo (mobile)** | Fonte Nunito |

---

## 📂 Backend

API REST responsável pelo cadastro e consulta de orfanatos.

### Rodando localmente

```bash
cd backend
yarn install
cp .env.example .env   # preencha as variáveis necessárias
yarn migration:run
yarn dev
```

Servidor sobe em `http://localhost:3333`.

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DATABASE_PATH` | Caminho do arquivo SQLite |
| `APP_URL` | URL base usada para montar links de imagens |
| `CORS_ORIGIN` | Origem permitida para requisições (frontend web) |

---

## 🌐 Web

Interface web para visualizar o mapa e cadastrar orfanatos pelo navegador.

### Rodando localmente

```bash
cd web
yarn install
cp .env.example .env   # preencha o token do Mapbox
yarn dev
```

Aplicação sobe em `http://localhost:3000` (ou porta indicada pelo Vite).

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_MAPBOX_TOKEN` | Token de acesso à API do Mapbox |

---

## 📱 Mobile

Aplicativo React Native, construído com Expo Router.

### Rodando localmente

```bash
cd mobile
yarn install
cp .env.example .env   # preencha a API key do Google Maps
npx expo start
```

Escaneie o QR Code com o app **Expo Go**, ou rode num emulador:

```bash
npx expo run:android
```

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `GOOGLE_MAPS_API_KEY` | Chave de API do Google Maps SDK for Android |

---

## 📄 Licença

Projeto de estudo, livre para fins de aprendizado.
