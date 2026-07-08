import React, { useState } from 'react';
import SearchGroup from './SearchGroup';
import TopNav from './TopNav';

// Функция-хелпер для генерации дефолтных данных новой группы
const createEmptyGroup = () => ({
  us: '',
  ks: '',
  question: '',
  template: ''
});

export default function App() {
  // Главное состояние: массив из объектов-групп
  const [groups, setGroups] = useState([createEmptyGroup()]);

  // Добавление новой группы (максимум 3)
  const handleAddGroup = () => {
    if (groups.length < 3) {
      setGroups([...groups, createEmptyGroup()]);
    }
  };

  // Удаление группы по её индексу
  const handleRemoveGroup = (indexToRemove) => {
    setGroups(groups.filter((_, index) => index !== indexToRemove));
  };

  // Обновление конкретного поля внутри определенной группы
  const handleGroupChange = (indexToUpdate, field, value) => {
    const updatedGroups = groups.map((group, index) => {
      if (index === indexToUpdate) {
        return { ...group, [field]: value };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  // Функция отправки формы (кнопка Go)
  const handleSearchSubmit = () => {
    console.log('Отправка данных на сервер/поиск:', groups);
    // Здесь будет fetch или axios запрос с отправкой массива groups
  };

  return (
      <>
        {/* Верхняя навигация */}
        <TopNav />

        {/* Декоративные размытые фоновые круги (blobs) */}
        <div className="blobs-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        {/* Основная карточка конструктора */}
        <main className="main-card">
          <h1>СЛОГ</h1>
          <p className="subtitle">КОНСТРУКТОР РИФМ</p>

          <div id="search-fields-container">
            {groups.map((group, index) => (
                <SearchGroup
                    key={index} // В идеале использовать уникальный id, но для массива до 3-х элементов сойдет и index
                    index={index}
                    group={group}
                    isLast={index === groups.length - 1}
                    totalGroups={groups.length}
                    onChange={handleGroupChange}
                    onAdd={handleAddGroup}
                    onRemove={handleRemoveGroup}
                    onGo={handleSearchSubmit}
                />
            ))}
          </div>
        </main>
      </>
  );
}