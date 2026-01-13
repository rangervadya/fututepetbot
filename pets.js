document.getElementById('module-container').innerHTML = `
    <div style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>🐶 Мои питомцы</h3>
            <button onclick="goBack()" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
        </div>
        
        <div id="pets-list">
            <div style="background:#f9f9f9;padding:15px;border-radius:8px;margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;">
                    <strong>Барсик</strong>
                    <span style="background:#FF6B8B;color:white;padding:2px 8px;border-radius:10px;font-size:12px;">Кот</span>
                </div>
                <p style="margin:5px 0;font-size:14px;">Мейн-кун • 2 года • Мальчик</p>
                <button onclick="addPetEvent('Барсик', 'vaccine')" style="font-size:12px;padding:5px 10px;margin-right:5px;background:#4A90E2;color:white;border:none;border-radius:5px;">
                    💉 Добавить прививку
                </button>
            </div>
            
            <div style="background:#f9f9f9;padding:15px;border-radius:8px;margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;">
                    <strong>Шарик</strong>
                    <span style="background:#6BCF7F;color:white;padding:2px 8px;border-radius:10px;font-size:12px;">Собака</span>
                </div>
                <p style="margin:5px 0;font-size:14px;">Лабрадор • 5 лет • Мальчик</p>
                <button onclick="addPetEvent('Шарик', 'parasite')" style="font-size:12px;padding:5px 10px;margin-right:5px;background:#4A90E2;color:white;border:none;border-radius:5px;">
                    🐛 Обработка от паразитов
                </button>
            </div>
        </div>
        
        <button onclick="showAddPetForm()" 
                style="width:100%;padding:15px;background:#FF6B8B;color:white;border:none;border-radius:8px;margin-top:20px;">
            ➕ Добавить нового питомца
        </button>
        
        <button onclick="showReminders()" 
                style="width:100%;padding:15px;background:#6BCF7F;color:white;border:none;border-radius:8px;margin-top:10px;">
            🔔 Ближайшие напоминания
        </button>
    </div>
`;

// Функции для модуля питомцев
window.showAddPetForm = function() {
    document.getElementById('module-container').innerHTML = `
        <div style="margin-top:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3>➕ Добавить питомца</h3>
                <button onclick="loadModule('pets')" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;">Тип животного *</label>
                <div style="display:flex;gap:10px;margin-bottom:10px;">
                    <button onclick="selectPetType('cat')" id="cat-btn" 
                            style="flex:1;padding:12px;background:#f0f0f0;border:2px solid #ddd;border-radius:8px;">
                        😺 Кошка
                    </button>
                    <button onclick="selectPetType('dog')" id="dog-btn"
                            style="flex:1;padding:12px;background:#f0f0f0;border:2px solid #ddd;border-radius:8px;">
                        🐶 Собака
                    </button>
                </div>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;">Имя питомца *</label>
                <input type="text" id="pet-name" placeholder="Кличка" 
                       style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
            </div>
            
            <div style="display:flex;gap:10px;margin-bottom:15px;">
                <div style="flex:1;">
                    <label style="display:block;margin-bottom:5px;">Пол *</label>
                    <select id="pet-sex" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                        <option value="">Выберите</option>
                        <option>Мальчик</option>
                        <option>Девочка</option>
                    </select>
                </div>
                <div style="flex:1;">
                    <label style="display:block;margin-bottom:5px;">Возраст *</label>
                    <input type="text" id="pet-age" placeholder="Например: 2 года" 
                           style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                </div>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;">Порода (необязательно)</label>
                <input type="text" id="pet-breed" placeholder="Порода" 
                       style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
            </div>
            
            <button onclick="savePet()" 
                    style="width:100%;padding:15px;background:#6BCF7F;color:white;border:none;border-radius:8px;">
                💾 Сохранить питомца
            </button>
        </div>
    `;
};

window.selectPetType = function(type) {
    document.querySelectorAll('#cat-btn, #dog-btn').forEach(btn => {
        btn.style.background = '#f0f0f0';
        btn.style.borderColor = '#ddd';
    });
    
    const btn = document.getElementById(type + '-btn');
    btn.style.background = '#FF6B8B';
    btn.style.borderColor = '#FF6B8B';
    btn.style.color = 'white';
    window.selectedPetType = type;
};

window.savePet = function() {
    const petData = {
        type: window.selectedPetType || 'cat',
        name: document.getElementById('pet-name').value,
        sex: document.getElementById('pet-sex').value,
        age: document.getElementById('pet-age').value,
        breed: document.getElementById('pet-breed').value,
        timestamp: new Date().toISOString()
    };
    
    // Сохраняем в Telegram бота
    window.tg.sendData(JSON.stringify({
        type: 'add_pet',
        data: petData
    }));
    
    alert('Питомец добавлен!');
    loadModule('pets');
};
