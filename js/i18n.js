/**
 * I18n Manager for FPC LMS
 * Handles dynamic content translation across the SPA
 */

export const translations = {
    es: {
        nav_home: "Inicio",
        nav_courses: "Explorar Cursos",
        nav_mission: "Nuestra Misión",
        acc_title: "Ajustes de Accesibilidad",
        acc_lang_label: "Idioma / Language",
        acc_text_size: "Tamaño del texto",
        acc_view_mode: "Modo de Visualización",
        acc_light: "Luz (Sobrio)",
        acc_dark: "Alto Contraste",
        acc_guide: "Guía de lectura",
        acc_guide_sub: "Agrega una línea de enfoque visual",
        acc_lsc: "Lengua de Señas",
        acc_lsc_sub: "Activar intérprete virtual (LSC)",
        acc_voice: "Recorrido por Voz",
        acc_voice_sub: "Asistente de voz para personas ciegas",
        acc_face: "Navegación Facial",
        acc_face_sub: "Controla la página con tu rostro",
        acc_reset: "Restablecer valores predeterminados",
        btn_account: "Mi Cuenta",
        hero_tag: "Educación sin barreras",
        hero_title: "El futuro es inclusivo o no será",
        hero_desc: "Plataforma de aprendizaje accesible diseñada para potenciar las capacidades de todos los colombianos.",
        footer_rights: "© 2024 Todos los derechos reservados",
        footer_desc: "Transformando vidas desde el corazón de la inclusión."
    },
    en: {
        nav_home: "Home",
        nav_courses: "Explore Courses",
        nav_mission: "Our Mission",
        acc_title: "Accessibility Settings",
        acc_lang_label: "Language / Idioma",
        acc_text_size: "Text Size",
        acc_view_mode: "Display Mode",
        acc_light: "Light (Sober)",
        acc_dark: "High Contrast",
        acc_guide: "Reading Guide",
        acc_guide_sub: "Add a visual focus line",
        acc_lsc: "Sign Language",
        acc_lsc_sub: "Activate virtual interpreter",
        acc_voice: "Voice Tour",
        acc_voice_sub: "Voice assistant for the blind",
        acc_face: "Face Navigation",
        acc_face_sub: "Control the page with your face",
        acc_reset: "Reset to default values",
        btn_account: "My Account",
        hero_tag: "Education without barriers",
        hero_title: "The future is inclusive or not at all",
        hero_desc: "Accessible learning platform designed to enhance the capabilities of all Colombians.",
        footer_rights: "© 2024 All rights reserved",
        footer_desc: "Transforming lives from the heart of inclusion."
    }
};

export const i18n = {
    currentLang: localStorage.getItem('fpc_lang') || 'es',
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('fpc_lang', lang);
        document.documentElement.lang = lang;
        this.applyTranslations();
    },
    
    translate(key) {
        return translations[this.currentLang][key] || key;
    },
    
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[this.currentLang][key];
                } else {
                    el.innerText = translations[this.currentLang][key];
                }
            }
        });
        
        // Update language button styles
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('border-secondary', 'bg-secondary/10', 'text-secondary');
                btn.classList.remove('border-surface-variant');
            } else {
                btn.classList.remove('border-secondary', 'bg-secondary/10', 'text-secondary');
                btn.classList.add('border-surface-variant');
            }
        });
    }
};
