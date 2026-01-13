// Конфигурация мини-приложения "Твой Будущий Питомец"
const CONFIG = {
    // Основные настройки
    APP_NAME: 'Твой Будущий Питомец',
    VERSION: '1.0.0',
    
    // Telegram настройки
    BOT_USERNAME: 'your_futurepet_bot', // Имя вашего бота без @
    
    // API настройки (если есть бэкенд)
    API: {
        ENABLED: false, // Пока отключено, используем Telegram WebApp
        BASE_URL: 'https://api.futurepet.ru',
        ENDPOINTS: {
            USER: '/api/user',
            PETS: '/api/pets',
            PARTNERS: '/api/partners',
            LEADS: '/api/leads'
        }
    },
    
    // Настройки города
    CITY: {
        NAME: 'Казань',
        TIMEZONE: 'Europe/Moscow',
        DISTRICTS: [
            'Авиастроительный',
            'Вахитовский',
            'Кировский',
            'Московский',
            'Ново-Савиновский',
            'Приволжский',
            'Советский'
        ]
    },
    
    // Настройки приложения
    SETTINGS: {
        AUTO_CLOSE_DELAY: 5000,
        ENABLE_ANIMATIONS: true,
        DEBUG_MODE: true
    },
    
    // Тексты
    TEXTS: {
        WELCOME: 'Добро пожаловать в сервис "Твой Будущий Питомец"!',
        ADOPTION_TITLE: 'Найди своего друга в приютах Казани',
        SUCCESS_MESSAGE: 'Заявка отправлена! Куратор свяжется с вами в течение 24 часов.'
    }
};

// Экспорт конфигурации
window.APP_CONFIG = CONFIG;

// Инициализация Telegram Web App
window.TelegramConfig = {
    init: function() {
        console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} initialized`);
        
        // Если есть бэкенд, можно инициализировать API
        if (CONFIG.API.ENABLED) {
            console.log('API mode enabled');
        } else {
            console.log('Telegram WebApp mode enabled');
        }
    }
};

// Автоматическая инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.TelegramConfig.init();
    });
} else {
    window.TelegramConfig.init();
}
