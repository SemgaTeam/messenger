export interface Chat {
  id: string;
  user1: string;
  user2: string;
}

export interface Message {
  id: string;
  sender_id: string;
  display_name: string;
  text: string;
  created_at: string;
}

export interface User {
  id: string;
  display_name: string;
  status: string;
}

export interface UseModalReturn {
  isOpen: boolean; // открыта ли модалка
  open: () => void; // функция открыть
  close: () => void; // функция закрыть
}

// Хук useUsers возвращает список пользователей и состояние загрузки
export interface UseUsersReturn {
  users: User[]; // массив пользователей
  loading: boolean; // идет ли загрузка
  error: string | null; // ошибка при загрузке
  loadUsers: () => void; // функция для подгрузки пользователей
}
