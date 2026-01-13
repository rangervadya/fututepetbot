document.getElementById('module-container').innerHTML = `
    <div style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>🏥 Каталог партнёров</h3>
            <button onclick="goBack()" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
        </div>
        
        <div style="margin-bottom:20px;">
            <select id="partner-filter" onchange="filterPartners()" 
                    style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:10px;">
                <option value="">Все категории</option>
                <option value="clinic">Ветклиники</option>
                <option value="shelter">Приюты</option>
                <option value="shop">Зоомагазины</option>
                <option value="grooming">Груминг</option>
            </select>
            
            <select id="district-filter" onchange="filterPartners()" 
                    style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;">
                <option value="">Все районы Казани</option>
                <option>Авиастроительный</option>
                <option>Вахитовский</option>
                <option>Кировский</option>
                <option>Московский</option>
                <option>Ново-Савиновский</option>
                <option>Приволжский</option>
                <option>Советский</option>
            </select>
        </div>
        
        <div id="partners-list">
            <!-- Партнёры загружаются динамически -->
        </div>
    </div>
`;

// Данные партнёров (можно вынести в отдельный файл)
const partners = [
    {
        id: 1,
        name: 'Ветклиника "Добрый доктор"',
        type: 'clinic',
        district: 'Советский',
        address: 'ул. Пушкина, 10',
        phone: '+7 (843) 111-22-33',
        rating: 4.8,
        hours: '09:00-21:00',
        offers: ['Первичный приём - 500₽', 'Вакцинация - 1200₽']
    },
    {
        id: 2,
        name: 'Приют "Лапа помощи"',
        type: 'shelter',
        district: 'Кировский',
        address: 'ул. Ленина, 25',
        phone: '+7 (843) 222-33-44',
        rating: 4.9,
        hours: '10:00-18:00',
        animals: 24
    },
    {
        id: 3,
        name: 'Зоомагазин "Четыре лапы"',
        type: 'shop',
        district: 'Вахитовский',
        address: 'ул. Баумана, 15',
        phone: '+7 (843) 333-44-55',
        rating: 4.7,
        hours: '08:00-22:00',
        delivery: true
    },
    {
        id: 4,
        name: 'Груминг-салон "Пушистик"',
        type: 'grooming',
        district: 'Московский',
        address: 'ул. Гагарина, 30',
        phone: '+7 (843) 444-55-66',
        rating: 4.6,
        hours: '10:00-20:00'
    }
];

// Функция отображения партнёров
function renderPartners(partnersToShow) {
    const container = document.getElementById('partners-list');
    container.innerHTML = '';
    
    partnersToShow.forEach(partner => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border: 1px solid #eee;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        `;
        
        let typeIcon = '🏥';
        if (partner.type === 'shelter') typeIcon = '🏠';
        if (partner.type === 'shop') typeIcon = '🛒';
        if (partner.type === 'grooming') typeIcon = '✂️';
        
        card.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px;">
                <div>
                    <strong>${typeIcon} ${partner.name}</strong>
                    <div style="font-size:12px;color:#666;margin-top:5px;">
                        📍 ${partner.district} район
                    </div>
                </div>
                <div style="background:#6BCF7F;color:white;padding:2px 8px;border-radius:10px;font-size:12px;">
                    ⭐ ${partner.rating}
                </div>
            </div>
            
            <div style="font-size:14px;color:#444;margin-bottom:10px;">
                <div>🏠 ${partner.address}</div>
                <div>📞 ${partner.phone}</div>
                <div>🕒 ${partner.hours}</div>
            </div>
            
            <div style="display:flex;gap:10px;">
                <button onclick="contactPartner(${partner.id})" 
                        style="flex:1;padding:10px;background:#4A90E2;color:white;border:none;border-radius:6px;font-size:14px;">
                    ✉️ Связаться
                </button>
                <button onclick="viewPartner(${partner.id})" 
                        style="flex:1;padding:10px;background:#FF6B8B;color:white;border:none;border-radius:6px;font-size:14px;">
                    ℹ️ Подробнее
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Инициализация
renderPartners(partners);

// Функции
window.filterPartners = function() {
    const typeFilter = document.getElementById('partner-filter').value;
    const districtFilter = document.getElementById('district-filter').value;
    
    let filtered = partners;
    
    if (typeFilter) {
        filtered = filtered.filter(p => p.type === typeFilter);
    }
    
    if (districtFilter) {
        filtered = filtered.filter(p => p.district === districtFilter);
    }
    
    renderPartners(filtered);
};

window.contactPartner = function(partnerId) {
    const partner = partners.find(p => p.id === partnerId);
    
    // Открываем форму заявки к этому партнёру
    loadModule('adoption');
    
    // Устанавливаем выбранного партнёра
    setTimeout(() => {
        if (document.getElementById('lead-partner')) {
            document.getElementById('lead-partner').value = partner.name;
        }
    }, 100);
};

window.viewPartner = function(partnerId) {
    const partner = partners.find(p => p.id === partnerId);
    
    document.getElementById('module-container').innerHTML = `
        <div style="margin-top:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3>${partner.name}</h3>
                <button onclick="loadModule('partners')" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
            </div>
            
            <div style="background:#f9f9f9;padding:20px;border-radius:10px;margin-bottom:20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                    <div>
                        <div style="font-size:20px;">⭐ ${partner.rating}/5</div>
                        <div style="font-size:14px;color:#666;">рейтинг</div>
                    </div>
                    <div style="background:#FF6B8B;color:white;padding:5px 15px;border-radius:20px;">
                        ${partner.type === 'clinic' ? 'Ветклиника' : 
                          partner.type === 'shelter' ? 'Приют' : 
                          partner.type === 'shop' ? 'Зоомагазин' : 'Груминг'}
                    </div>
                </div>
                
                <div style="margin-bottom:15px;">
                    <strong>📌 Адрес:</strong>
                    <p>${partner.address}, ${partner.district} район</p>
                </div>
                
                <div style="margin-bottom:15px;">
                    <strong>📞 Контакты:</strong>
                    <p>${partner.phone}</p>
                </div>
                
                <div style="margin-bottom:15px;">
                    <strong>🕒 Часы работы:</strong>
                    <p>${partner.hours}</p>
                </div>
                
                ${partner.offers ? `
                <div style="margin-bottom:15px;">
                    <strong>🎯 Акции и услуги:</strong>
                    <p>${partner.offers.join('<br>')}</p>
                </div>
                ` : ''}
            </div>
            
            <button onclick="contactPartner(${partner.id})" 
                    style="width:100%;padding:15px;background:#6BCF7F;color:white;border:none;border-radius:8px;margin-bottom:10px;">
                ✉️ Оставить заявку этому партнёру
            </button>
            
            <button onclick="loadModule('partners')" 
                    style="width:100%;padding:15px;background:#ddd;border:none;border-radius:8px;">
                ← Назад к списку
            </button>
        </div>
    `;
};
