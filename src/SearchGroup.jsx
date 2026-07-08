import React from 'react';

// Компонент принимает пропсы для управления данными и кнопками
export default function SearchGroup({
                                        group,
                                        index,
                                        isLast,
                                        totalGroups,
                                        onChange,
                                        onAdd,
                                        onRemove,
                                        onGo
                                    }) {
    // Хэндлер для валидации "на лету" (вместо старого blur)
    const handleNumberChange = (field, value) => {
        let num = parseInt(value, 10);
        if (num > 10) num = 10;
        if (num < 1 || isNaN(num)) num = '';
        onChange(index, field, num);
    };

    return (
        <div className="search-group">
            <div className="input-row">
                <div className="input-column">
                    <label className="field-label" title="ударение на слог">унс</label>
                    <input
                        type="number"
                        placeholder="УНС"
                        className="small-input"
                        min="1"
                        max="10"
                        value={group.us}
                        onChange={(e) => handleNumberChange('us', e.target.value)}
                    />
                </div>

                <div className="input-column">
                    <label className="field-label" title="количество слогов">кс</label>
                    <input
                        type="number"
                        placeholder="КС"
                        className="small-input"
                        min="1"
                        max="10"
                        value={group.ks}
                        onChange={(e) => handleNumberChange('ks', e.target.value)}
                    />
                </div>

                <div className="button-group">
                    {/* Кнопка "+" показывается только на последнем элементе и если групп меньше 3 */}
                    {isLast && totalGroups < 3 && (
                        <button className="btn-add" onClick={onAdd}>+</button>
                    )}

                    {/* Кнопка "Go" есть только в самой первой группе */}
                    {index === 0 && (
                        <button className="btn-go" onClick={onGo}>Go</button>
                    )}

                    {/* Кнопку "-" показываем для всех, кроме первой группы */}
                    {index > 0 && (
                        <button className="btn-remove" onClick={() => onRemove(index)}>-</button>
                    )}
                </div>
            </div>

            {/* Селект с вопросами */}
            <select
                className="main-select"
                value={group.question}
                onChange={(e) => onChange(index, 'question', e.target.value)}
            >
                {index === 0 && <option value="" disabled hidden>Выберите вопрос</option>}
                <option value="Кто? Что?">Кто? Что?</option>
                <option value="Кого? Чего?">Кого? Чего?</option>
                <option value="Кому? Чему?">Кому? Чему?</option>
                <option value="Кого? Что?">Кого? Что?</option>
                <option value="Кем? Чем?">Кем? Чем?</option>
                <option value="О ком? О чём?">О ком? О чём?</option>
                {index === 0 && (
                    <>
                        <option value="Что делать?">Что делать?</option>
                        <option value="Что сделать?">Что сделать?</option>
                        <option value="Что делает?">Что делает?</option>
                        <option value="Что делал?">Что делал?</option>
                        <option value="Что делала?">Что делала?</option>
                        <option value="Что делало?">Что делало?</option>
                    </>
                )}
            </select>

            {/* Инпут шаблона */}
            <input
                type="text"
                placeholder="шаблон: (*б!ан)..."
                className="main-input"
                value={group.template}
                onChange={(e) => onChange(index, 'template', e.target.value)}
            />
        </div>
    );
}