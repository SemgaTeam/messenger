# Messenger
Мессенджер нашей команды

# Messenger backend MVP
## Стек технологий
- Node.js
- TypeScript
- Prisma ORM
- WebSocket
- HTTP/REST API

##  Messenger API
1. CRUD для пользователей
2. CRUD для чатов
3. CRUD для сообщений
4. Аутентификация пользователей

## Модули
1. main - точка входа в приложение
2. config/ - конфигурация
3. http/ - http-сервер и маршруты (уровень представления)
4. websocket/ - двухсторонне real-time общение клиентов (уровень представления)
5. prisma/ - (требование Prisma cli) - уровень постоянного хранения
6. repository/ -  уровень доступа к данных
7. service/ - уровень бизнес-логики
8. dto/ - объекты передачи данных в приложении (уровня представления)

# Messenger frontend MVP

## Стек технологий
- React
- TypeScript
- Vite
- React Router
- Shadch
- Tailwindcss

## Messenger pages
1. вход/регистрации
2. список чатов
3. страница новый чат
4. окно чата

### Модули
1. src/main.tsx - точка входа
2. src/app/App.tsx - точка входа в маршрутизацию
2. src/pages/ - страницы приложения
3. public/ - статика
4. src/components/ - графические элементы
5. src/components/layout/ - макет
6. src/components/features/ - бизнес-компоненты
7. src/components/widgets/ - связанные features с контекстом
8. src/components/ui/ - базовые компоненты

