// Динамически загружаемая форма заявки
document.getElementById('module-container').innerHTML = `
    <div style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>📋 Заявка на усыновление</h3>
            <button onclick="goBack()" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
        </div>
        
        <div id="step1">
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;font-weight:bold;">Имя *</label>
                <input type="text" id="lead-name" placeholder="Как к вам обращаться?" required 
                       style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;font-weight:bold;">Телефон *</label>
                <div style="display:flex;gap:10px;">
                    <input type="tel" id="lead-phone" placeholder="+7 (900) 000-00-00" required readonly
                           style="flex:1;padding:12px;border:1px solid #ddd;border-radius:8px;">
                    <button onclick="requestPhoneFromTG()" 
                            style="padding:12px;background:#4A90E2;color:white;border:none;border-radius:8px;white-space:nowrap;">
                        📱 Из Telegram
                    </button>
                </div>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;font-weight:bold;">Цель обращения *</label>
                <select id="lead-purpose" required style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                    <option value="">Выберите цель</option>
                    <option value="appointment">Запись на приём</option>
                    <option value="question">Вопрос специалисту</option>
                    <option value="adoption">Усыновление питомца</option>
                </select>
            </div>
            
            <button onclick="showStep2()" 
                    style="width:100%;padding:15px;background:#FF6B8B;color:white;border:none;border-radius:8px;margin-top:10px;">
                Далее →
            </button>
        </div>
        
        <div id="step2" style="display:none;">
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;">Выберите питомца (необязательно)</label>
                <select id="lead-pet" style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                    <option value="">Не выбирать</option>
                    <option>Барсик (Кот, 2 года)</option>
                    <option>Шарик (Собака, 4 года)</option>
                </select>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;">Комментарий</label>
                <textarea id="lead-comment" placeholder="Опишите вашу ситуацию..." 
                          style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;min-height:80px;"></textarea>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="display:block;margin-bottom:5px;font-weight:bold;">Выберите партнёра *</label>
                <select id="lead-partner" required style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                    <option value="">Выберите партнёра</option>
                    <option>Ветклиника "Добрый доктор"</option>
                    <option>Приют "Лапа помощи"</option>
                    <option>Зоомагазин "Четыре лапы"</option>
                </select>
            </div>
            
            <div style="margin:20px 0;">
                <label>
                    <input type="checkbox" id="lead-privacy" required style="margin-right:8px;">
                    Я согласен на обработку персональных данных
                </label>
            </div>
            
            <div style="display:flex;gap:10px;">
                <button onclick="showStep1()" 
                        style="flex:1;padding:12px;background:#ddd;border:none;border-radius:8px;">
                    ← Назад
                </button>
                <button onclick="submitAdoptionForm()" 
                        style="flex:1;padding:12px;background:#6BCF7F;color:white;border:none;border-radius:8px;">
                    ✅ Отправить
                </button>
            </div>
        </div>
    </div>
`;

// Функции для этой формы
window.showStep2 = function() {
    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const purpose = document.getElementById('lead-purpose').value;
    
    if (!name || !phone || !purpose) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
    }
    
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
};

window.showStep1 = function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
};

window.requestPhoneFromTG = function() {
    // В реальном приложении: tg.requestContact()
    document.getElementById('lead-phone').value = '+7 (900) 123-45-67';
    document.querySelector('button[onclick="requestPhoneFromTG()"]').textContent = '✅ Получено';
    document.querySelector('button[onclick="requestPhoneFromTG()"]').style.background = '#6BCF7F';
    document.querySelector('button[onclick="requestPhoneFromTG()"]').disabled = true;
};

window.submitAdoptionForm = function() {
    const formData = {
        name: document.getElementById('lead-name').value,
        phone: document.getElementById('lead-phone').value,
        purpose: document.getElementById('lead-purpose').value,
        pet: document.getElementById('lead-pet').value,
        comment: document.getElementById('lead-comment').value,
        partner: document.getElementById('lead-partner').value,
        timestamp: new Date().toISOString()
    };
    
    console.log('Adoption form data:', formData);
    
    // Отправка в Telegram бота
    window.tg.sendData(JSON.stringify({
        type: 'adoption_lead',
        data: formData,
        status: 'new' // По ТЗ: new / contacted / booked / done / rejected
    }));
    
    // Показываем успех
    document.getElementById('module-container').innerHTML = `
        <div style="text-align:center;padding:40px 20px;">
            <div style="width:60px;height:60px;background:#6BCF7F;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:white;font-size:24px;">
                ✓
            </div>
            <h3>✅ Заявка отправлена!</h3>
            <p>Партнёр получил уведомление в Telegram</p>
            <p><small>Статус: <strong>new</strong> (ожидает обработки)</small></p>
            <button onclick="goBack()" 
                    style="padding:12px 30px;margin-top:20px;background:#FF6B8B;color:white;border:none;border-radius:8px;">
                Готово
            </button>
        </div>
    `;
};
