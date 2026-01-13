// Основной объект приложения
const App = {
    // Инициализация
    init() {
        this.tg = window.Telegram.WebApp;
        this.userData = {};
        this.userPets = [];
        this.partners = [];
        this.reminders = [];
        
        this.initTelegram();
        this.initEventListeners();
        this.loadUserData();
        this.loadPartners();
        this.loadUserPets();
        
        // Показываем приложение
        document.getElementById('app').classList.remove('hidden');
        console.log('FuturePetBot Mini App initialized');
    },
    
    // Инициализация Telegram
    initTelegram() {
        this.tg.ready();
        this.tg.expand();
        this.tg.enableClosingConfirmation();
        
        // Получаем данные пользователя
        if (this.tg.initDataUnsafe?.user) {
            const user = this.tg.initDataUnsafe.user;
            this.userData = {
                id: user.id,
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                username: user.username,
                languageCode: user.language_code,
                phone: user.phone_number
            };
            
            // Показываем приветствие
            const greeting = document.getElementById('userGreeting');
            if (greeting) {
                greeting.textContent = `Привет, ${user.first_name || 'друг'}!`;
            }
            
            // Заполняем профиль
            this.updateProfileUI();
        }
        
        // Получаем реферальный источник
        const startParam = this.tg.initDataUnsafe?.start_param;
        if (startParam) {
            this.userData.source = startParam;
            document.getElementById('sourceInfo').textContent = startParam;
        }
    },
    
    // Инициализация обработчиков событий
    initEventListeners() {
        // Навигация
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                this.showPage(page);
            });
        });
        
        // Форма заявки
        const adoptionForm = document.getElementById('adoptionForm');
        if (adoptionForm) {
            adoptionForm.addEventListener('submit', (e) => this.submitAdoptionForm(e));
        }
        
        // Форма добавления питомца
        const addPetForm = document.getElementById('addPetForm');
        if (addPetForm) {
            addPetForm.addEventListener('submit', (e) => this.submitAddPetForm(e));
        }
        
        // Фильтры партнёров
        document.getElementById('partnerTypeFilter')?.addEventListener('change', () => this.filterPartners());
        document.getElementById('districtFilter')?.addEventListener('change', () => this.filterPartners());
    },
    
    // Загрузка данных пользователя
    loadUserData() {
        // В реальном приложении здесь будет запрос к API
        // Для демо используем моковые данные
        setTimeout(() => {
            this.reminders = [
                {
                    id: 1,
                    title: 'Прививка от бешенства',
                    pet: 'Барсик',
                    date: '2024-01-20',
                    type: 'vaccine'
                },
                {
                    id: 2,
                    title: 'Обработка от паразитов',
                    pet: 'Шарик',
                    date: '2024-01-25',
                    type: 'parasite'
                }
            ];
            
            this.renderReminders();
        }, 500);
    },
    
    // Загрузка питомцев пользователя
    loadUserPets() {
        // Моковые данные для демо
        setTimeout(() => {
            this.userPets = [
                {
                    id: 1,
                    name: 'Барсик',
                    type: 'cat',
                    breed: 'Мейн-кун',
                    age: '2 года',
                    sex: 'male'
                },
                {
                    id: 2,
                    name: 'Шарик',
                    type: 'dog',
                    breed: 'Лабрадор',
                    age: '5 лет',
                    sex: 'male'
                }
            ];
            
            this.renderPetsList();
            this.populatePetSelect();
        }, 500);
    },
    
    // Загрузка партнёров
    loadPartners() {
        // Моковые данные для демо
        setTimeout(() => {
            this.partners = [
                {
                    id: 1,
                    name: 'Ветклиника "Добрый доктор"',
                    type: 'clinic',
                    district: 'sovetsky',
                    address: 'ул. Пушкина, 10',
                    phone: '+7 (843) 111-22-33',
                    rating: 4.8
                },
                {
                    id: 2,
                    name: 'Приют "Лапа помощи"',
                    type: 'shelter',
                    district: 'kirovsky',
                    address: 'ул. Ленина, 25',
                    phone: '+7 (843) 222-33-44',
                    rating: 4.9
                },
                {
                    id: 3,
                    name: 'Зоомагазин "Четыре лапы"',
                    type: 'shop',
                    district: 'vakhitovsky',
                    address: 'ул. Баумана, 15',
                    phone: '+7 (843) 333-44-55',
                    rating: 4.7
                }
            ];
            
            this.renderPartnersList();
            this.populatePartnersSelect();
        }, 500);
    },
    
    // Навигация по страницам
    showPage(pageName) {
        // Скрываем все страницы
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Обновляем навигацию
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageName) {
                btn.classList.add('active');
            }
        });
        
        // Показываем выбранную страницу
        const page = document.getElementById(`${pageName}-page`);
        if (page) {
            page.classList.add('active');
        }
        
        // Прокручиваем наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // Показ модальных окон
    showModal(modalId) {
        document.getElementById(modalId)?.classList.remove('hidden');
    },
    
    closeModal(modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
    },
    
    // Форма заявки
    showAdoptionForm() {
        // Заполняем форму данными пользователя
        const nameInput = document.getElementById('leadName');
        if (nameInput && this.userData.firstName) {
            nameInput.value = `${this.userData.firstName} ${this.userData.lastName || ''}`.trim();
        }
        
        // Показываем модальное окно
        this.showModal('adoptionModal');
        this.showFormStep(1);
    },
    
    // Навигация по шагам формы
    showFormStep(stepNumber) {
        document.querySelectorAll('[data-step]').forEach(step => {
            step.classList.remove('active');
        });
        
        const step = document.querySelector(`[data-step="${stepNumber}"]`);
        if (step) {
            step.classList.add('active');
        }
    },
    
    nextFormStep(next) {
        // Валидация текущего шага
        const currentStep = next - 1;
        const stepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (stepElement) {
            const inputs = stepElement.querySelectorAll('[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--primary)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                this.showError('Пожалуйста, заполните обязательные поля');
                return;
            }
        }
        
        this.showFormStep(next);
    },
    
    prevFormStep(prev) {
        this.showFormStep(prev);
    },
    
    // Отправка формы заявки
    submitAdoptionForm(e) {
        e.preventDefault();
        
        // Показываем загрузку
        this.showLoading();
        
        // Собираем данные
        const formData = {
            name: document.getElementById('leadName').value,
            phone: document.getElementById('leadPhone').value,
            purpose: document.getElementById('leadPurpose').value,
            petId: document.getElementById('leadPet').value,
            comment: document.getElementById('leadComment').value,
            partnerId: document.getElementById('leadPartner').value,
            userId: this.userData.id,
            timestamp: new Date().toISOString()
        };
        
        console.log('Adoption form data:', formData);
        
        // Отправляем данные в Telegram бота
        this.sendToBot('adoption_lead', formData);
        
        // Имитируем задержку
        setTimeout(() => {
            this.hideLoading();
            this.closeModal('adoptionModal');
            this.showSuccess('Заявка отправлена! Партнёр свяжется с вами в течение 24 часов.');
            
            // Сбрасываем форму
            e.target.reset();
            this.showFormStep(1);
        }, 2000);
    },
    
    // Форма добавления питомца
    showAddPetForm() {
        this.showModal('addPetModal');
    },
    
    submitAddPetForm(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('petName').value,
            type: document.querySelector('input[name="petType"]:checked')?.value,
            sex: document.getElementById('petSex').value,
            age: document.getElementById('petAge').value,
            breed: document.getElementById('petBreed').value,
            weight: document.getElementById('petWeight').value,
            userId: this.userData.id
        };
        
        // Добавляем питомца в список
        this.userPets.push({
            id: Date.now(),
            ...formData
        });
        
        this.renderPetsList();
        this.populatePetSelect();
        
        this.closeModal('addPetModal');
        this.showSuccess('Питомец добавлен!');
        e.target.reset();
    },
    
    // Реферальная система
    getReferralLink() {
        // Генерируем реферальную ссылку
        const referralCode = `ref_${this.userData.id}_${Date.now().toString(36)}`;
        const link = `t.me/${window.APP_CONFIG?.BOT_USERNAME || 'ваш_бот'}?start=${referralCode}`;
        
        document.getElementById('referralLink').innerHTML = `<code>${link}</code>`;
        this.showModal('referralModal');
    },
    
    copyReferralLink() {
        const link = document.querySelector('#referralLink code')?.textContent;
        if (link) {
            navigator.clipboard.writeText(link)
                .then(() => this.showSuccess('Ссылка скопирована!'))
                .catch(err => this.showError('Не удалось скопировать'));
        }
    },
    
    // Запрос телефона из Telegram
    requestPhone() {
        // В реальном приложении будет вызов Telegram API
        const phoneInput = document.getElementById('leadPhone');
        const btn = document.querySelector('.btn-small');
        
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Запрашиваем...';
            btn.disabled = true;
        }
        
        setTimeout(() => {
            // Моковый номер для демо
            phoneInput.value = '+7 (900) 123-45-67';
            
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Получено';
                btn.style.background = 'var(--secondary)';
            }
        }, 1000);
    },
    
    // Отправка данных в бота
    sendToBot(type, data) {
        try {
            const message = {
                type: type,
                data: data,
                timestamp: new Date().toISOString(),
                app: 'futurepetbot_mini_app'
            };
            
            this.tg.sendData(JSON.stringify(message));
            console.log('Data sent to bot:', message);
        } catch (error) {
            console.error('Error sending data to bot:', error);
        }
    },
    
    // Рендер списков
    renderReminders() {
        const container = document.getElementById('remindersList');
        if (!container) return;
        
        if (this.reminders.length === 0) {
            container.innerHTML = '<p class="text-center">Нет активных напоминаний</p>';
            return;
        }
        
        container.innerHTML = this.reminders.map(reminder => `
            <div class="reminder-card">
                <div class="card-header">
                    <div class="card-title">${reminder.title}</div>
                    <div class="card-badge">${reminder.type === 'vaccine' ? '💉 Прививка' : '🐛 Обработка'}</div>
                </div>
                <p><i class="fas fa-paw"></i> ${reminder.pet}</p>
                <p><i class="fas fa-calendar"></i> ${reminder.date}</p>
            </div>
        `).join('');
    },
    
    renderPetsList() {
        const container = document.getElementById('petsList');
        if (!container) return;
        
        if (this.userPets.length === 0) {
            container.innerHTML = '<p class="text-center">У вас пока нет питомцев</p>';
            return;
        }
        
        container.innerHTML = this.userPets.map(pet => `
            <div class="pet-card">
                <div class="card-header">
                    <div class="card-title">${pet.name}</div>
                    <div class="card-badge">${pet.type === 'cat' ? '😺 Кот' : '🐶 Собака'}</div>
                </div>
                <p>${pet.breed || 'Порода не указана'}</p>
                <p>${pet.age} • ${pet.sex === 'male' ? '♂ Мальчик' : '♀ Девочка'}</p>
            </div>
        `).join('');
    },
    
    renderPartnersList() {
        const container = document.getElementById('partnersList');
        if (!container) return;
        
        const filteredPartners = this.filterPartners();
        
        if (filteredPartners.length === 0) {
            container.innerHTML = '<p class="text-center">Партнёры не найдены</p>';
            return;
        }
        
        container.innerHTML = filteredPartners.map(partner => `
            <div class="partner-card" onclick="App.showPartnerDetail(${partner.id})">
                <div class="card-header">
                    <div class="card-title">${partner.name}</div>
                    <div class="card-badge">⭐ ${partner.rating}</div>
                </div>
                <p><i class="fas fa-map-marker-alt"></i> ${partner.address}</p>
                <p><i class="fas fa-phone"></i> ${partner.phone}</p>
                <p><i class="fas fa-tag"></i> ${this.getPartnerTypeLabel(partner.type)}</p>
            </div>
        `).join('');
    },
    
    // Фильтрация партнёров
    filterPartners() {
        const typeFilter = document.getElementById('partnerTypeFilter')?.value;
        const districtFilter = document.getElementById('districtFilter')?.value;
        
        let filtered = this.partners;
        
        if (typeFilter) {
            filtered = filtered.filter(p => p.type === typeFilter);
        }
        
        if (districtFilter) {
            filtered = filtered.filter(p => p.district === districtFilter);
        }
        
        return filtered;
    },
    
    getPartnerTypeLabel(type) {
        const labels = {
            clinic: 'Ветеринарная клиника',
            shelter: 'Приют для животных',
            shop: 'Зоомагазин',
            grooming: 'Груминг салон',
            hotel: 'Гостиница для животных'
        };
        
        return labels[type] || type;
    },
    
    // Заполнение выпадающих списков
    populatePetSelect() {
        const select = document.getElementById('leadPet');
        if (!select) return;
        
        // Очищаем старые опции, кроме первой
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Добавляем питомцев пользователя
        this.userPets.forEach(pet => {
            const option = document.createElement('option');
            option.value = pet.id;
            option.textContent = `${pet.name} (${pet.type === 'cat' ? 'кот' : 'собака'})`;
            select.appendChild(option);
        });
    },
    
    populatePartnersSelect() {
        const select = document.getElementById('leadPartner');
        if (!select) return;
        
        // Очищаем старые опции, кроме первой
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Добавляем партнёров
        this.partners.forEach(partner => {
            const option = document.createElement('option');
            option.value = partner.id;
            option.textContent = `${partner.name} - ${this.getPartnerTypeLabel(partner.type)}`;
            select.appendChild(option);
        });
    },
    
    // Обновление UI профиля
    updateProfileUI() {
        document.getElementById('userName').textContent = 
            `${this.userData.firstName} ${this.userData.lastName || ''}`.trim() || 'Пользователь';
        
        document.getElementById('userPhone').textContent = 
            this.userData.phone || 'Не указан';
        
        document.getElementById('userSince').textContent = 
            new Date().toLocaleDateString('ru-RU');
    },
    
    // Питомцы из приютов
    showShelterPets() {
        this.sendToBot('show_shelter_pets', {});
        this.tg.close();
    },
    
    // Утилиты
    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    },
    
    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    },
    
    showSuccess(message) {
        document.getElementById('successMessage').textContent = message;
        this.showModal('successModal');
    },
    
    showError(message) {
        alert(message); // В реальном приложении сделайте красивые уведомления
    },
    
    // Профиль
    editProfile() {
        this.showSuccess('Редактирование профиля будет доступно в следующем обновлении');
    },
    
    showPrivacy() {
        this.showSuccess('Политика конфиденциальности будет отображена здесь');
    },
    
    logout() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            this.tg.close();
        }
    }
};

// Глобальные функции для вызова из HTML
window.showPage = (page) => App.showPage(page);
window.showAdoptionForm = () => App.showAdoptionForm();
window.showAddPetForm = () => App.showAddPetForm();
window.showShelterPets = () => App.showShelterPets();
window.nextFormStep = (step) => App.nextFormStep(step);
window.prevFormStep = (step) => App.prevFormStep(step);
window.closeModal = (id) => App.closeModal(id);
window.requestPhone = () => App.requestPhone();
window.getReferralLink = () => App.getReferralLink();
window.copyReferralLink = () => App.copyReferralLink();
window.editProfile = () => App.editProfile();
window.showPrivacy = () => App.showPrivacy();
window.logout = () => App.logout();

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => App.init());
