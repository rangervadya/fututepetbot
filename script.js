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
