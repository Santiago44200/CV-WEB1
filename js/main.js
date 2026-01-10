/*===================================================*/
/*===================================================*/
/*==============      TRADUCCIÓN         ============*/
/*===================================================*/
/*===================================================*/



const translations = {
    fr: {
        "devetux":"DEV et UX/UI",
        "ce-que-jaime": "ce que j'aime faire",
        "competences": "compétences",
        "etudes": "études",
        "ekeko": "ekeko",
        "contacte": "contact",
        "bonjour": "BONJOUR !",
        "cest-santiago": "C'EST SANTIAGO",
        "developpeur-web-creatif-designer-ux": "DEVELOPPEUR WEB CREATIF<br>et DESIGNER UX/UI",
        "le-design-est-lame": "LE DESIGN EST L'ÂME,<br>ET LE CODE LE POULS",
        "ce-que-jaime-faire": "CE QUE J'AIME FAIRE",
        "ludiques":"LUDIQUES",
        "esthetiques":"ESTHÉTIQUES",
        "creatives":"CREATIVES",
        "sur-mesure":"SUR MESURE",
        "innovantes":"INNOVANTES",
        "mes": "MES",
        "competences-titre":"COMPÉTENCES",
        "text-card":"Développeur Front-End<br>avec une forte sensibilité<br>pour le design visuel.<br><br>Mon rôle est de combiner<br>ces expertises pour créer<br>des interfaces à la fois<br>performantes et soignées.",
        "etudes-titre": "ÉTUDES",
        "eni": "ENI École Informatique",
        "france": "(France)",
        "bac2": "BAC+2 en Developpement web et web mobile",
        "ux-agile": "Cours de UX et Agile",
        "ulisboa": "Université de Lisbonne",
        "master": "Master 2 en Design d'Interaction (UX)",
        "upalermo": "Université de Palermo",
        "argentine": "(Argentine)",
        "licence": "Licence en Design",
        "isil":"ISIL",
        "perou":"(Pérou)",
        "tecnico":"Diplôme technique en Design",
        "ekeko-dkt":"L'Ekeko est une<br>figure très appréciée<br>de la culture andine,<br>étant le dieu<br>de l'abondance,<br>de la prospérité<br>et de la fertilité",
        "ekeko-mob": "L'Ekeko est une figure très appréciée<br>de la culture andine, étant le dieu de<br>l'abondance, de la prospérité<br>et de la fertilité",
        "amuleto-dkt":"Je le partage<br>pour que les<br>projets web<br>ne nous<br>manquent<br>jamais",
        "amuleto-mob":"Je le partage pour que<br>les projets web ne<br>nous manquent jamais",
        "dev/ux": "DEVELOPPEUR WEB CREATIF<br>et DESIGNER UX/UI",
        "pour-me-contacter": "POUR ME CONTACTER",
        "portfolio": "Portfolio",
        "prochainement":"Prochainement",
    },
    es: {
        "devetux":"DEV & UX/UI",
        "ce-que-jaime": "lo que amo hacer",
        "competences": "aptitudes",
        "etudes": "estudios",
        "ekeko": "ekeko",
        "contacte": "contacto",
        "bonjour": "¡HOLA!",
        "cest-santiago": "SOY SANTIAGO",
        "developpeur-web-creatif-designer-ux": "PROGRAMADOR WEB CREATIVO<br>Y DISEÑADOR UX/UI",
        "le-design-est-lame": "EL DISEÑO ES EL ALMA,<br>Y EL CÓDIGO EL PULSO",
        "ce-que-jaime-faire": "LO QUE AMO HACER",
        "ludiques":"LÚDICAS",
        "esthetiques":"ESTÉTICAS",
        "creatives":"CREATIVAS",
        "sur-mesure":"A MEDIDA",
        "innovantes":"INNOVADORAS",
        "mes": "MIS",
        "competences-titre":"APTITUDES",
        "text-card":"Programador Front-End<br>con una fuerte sensibilidad<br>por el diseño visual.<br><br>Fusiono estas disciplinas<br>para crear interfaces estéticas y funcionales.",
        "etudes-titre": "ESTUDIOS",
        "eni": "ENI Escuela de Informática",
        "france": "(Francia)",
        "bac2": "DAW - Desarrollo Web",
        "ux-agile": "Curso de UX y metodologías ágiles",
        "ulisboa": "Universidad de Lisboa",
        "master": "Máster en Diseño de Interacción (UX)",
        "upalermo": "Universidad de Palermo",
        "argentine": "(Argentina)",
        "licence": "Licenciatura en Diseño",
        "isil": "ISIL",
        "perou": "(Perú)",
        "tecnico": "Carrera técnica en Diseño Gráfico",
        "ekeko-dkt":"El Ekeko es una<br>figura muy apreciada<br>en la cultura andina,<br>es el dios de<br>la abundancia<br>la prosperidad<br>y la fertilidad",  
        "ekeko-mob": "El Ekeko es una figura muy apreciada<br>en la cultura andina, es el dios<br>de la abundancia, la prosperidad<br>y la fertilidad",
        "amuleto-dkt":"Lo comparto<br>para que los<br>proyectos web<br>nunca nos<br>falten",
        "amuleto-mob":"Lo comparto para que<br>los proyectos web<br>nunca nos falten",
        "dev/ux": "PROGRAMADOR WEB CREATIVO<br>& DISEÑADOR UX/UI",
        "pour-me-contacter": "CONTÁCTAME",
        "portfolio": "Portafolio",
        "prochainement":"Próximamente",
    }
};


/*===================================================*/
/*===================================================*/
/*===============    smooth scroll    ===============*/
/*===================================================*/
/*===================================================*/


let lenis;

function initLenis() {
  // Solo se ejecuta si el ancho es mayor o igual a 950px
  if (window.innerWidth >= 950) {
    if (!lenis) {
      lenis = new Lenis({
        lerp: 0.15,
        wheelMultiplier: 0.8,
        gestureOrientation: 'vertical',
        normalizeWheel: true,
        smoothWheel: true,
        smoothTouch: false, // <--- esto para iPhones
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } else {
    // Si la pantalla es pequeña y Lenis existía, lo destruimos
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  }
}

// Ejecutamos al cargar la página
initLenis();

// Escuchamos el cambio de tamaño de ventana para activar/desactivar en tiempo real
window.addEventListener('resize', initLenis);




/*===================================================*/
/*===================================================*/
/*=============    botonera activa    ===============*/
/*===================================================*/
/*===================================================*/
function initActiveMenu() {
    const navLinks = document.querySelectorAll('.nav-list li a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -20% 0px', 
        threshold: 0
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            // Solo actuar si estamos cruzando y NO estamos en el puro inicio de la página
            if (entry.isIntersecting && window.pageYOffset > 50) {
                let id = entry.target.getAttribute('id');
                
                if (id === 'competences-trigger') id = 'competences';
                if (id === 'web-section-container') id = 'ceQueJaimeFaire-anchor';

                if (id === 'contact-trigger') {
                    if (window.innerWidth >= 950) {
                        id = 'contacte';
                    } else {
                        return;
                    }
                }

                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-active');
                    }
                });
            } else if (window.pageYOffset <= 50) {
                // SEGURO PARA EL HOME: Si estamos arriba de todo, quitar activos (o activar Home si tuvieras)
                navLinks.forEach(link => link.classList.remove('nav-active'));
            }
        });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    const sections = document.querySelectorAll('section[id]:not(#competences-trigger), footer[id]');
    sections.forEach(section => observer.observe(section));

    const webContainer = document.querySelector('.container-big-text-web');
    if (webContainer) {
        webContainer.setAttribute('id', 'web-section-container');
        observer.observe(webContainer);
    }

    const specialTriggers = ['competences-trigger', 'contact-trigger'];
    specialTriggers.forEach(triggerId => {
        const el = document.getElementById(triggerId);
        if (el) observer.observe(el);
    });

    // --- SEGURO DE SCROLL CORREGIDO ---
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        if (window.innerWidth >= 950) {
            const scrollPosition = window.innerHeight + scrollY;
            const scrollTotal = document.documentElement.scrollHeight;
            
            // Solo aplicar lógica de final de página si hemos bajado al menos 200px
            if (scrollY > 200) {
                // 1. Si estamos en el puro final (Contacto)
                if (scrollPosition >= scrollTotal - 10) {
                    navLinks.forEach(link => link.classList.remove('nav-active'));
                    const contactLink = document.querySelector('a[href="#contacte"]');
                    if (contactLink) contactLink.classList.add('nav-active');
                } 
                // 2. Si estamos en el área de Ekeko
                else if (scrollPosition < scrollTotal - 10 && scrollPosition > scrollTotal - (window.innerWidth * 0.25)) {
                    navLinks.forEach(link => link.classList.remove('nav-active'));
                    const ekekoLink = document.querySelector('a[href="#ekeko"]');
                    if (ekekoLink) ekekoLink.classList.add('nav-active');
                }
            } else {
                // Si estamos muy arriba, nos aseguramos de que nada esté marcado
                navLinks.forEach(link => link.classList.remove('nav-active'));
            }
        }
    });
}
/*===================================================*/
/*===================================================*/
/*==========    botonera desplegable    =============*/
/*===================================================*/
/*===================================================*/


// ================================
//         FUNCIÓN GLOBAL
// ================================
function closeMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (body.classList.contains('menu-open')) {
        mobileMenu.style.transition = ''; 
        mobileMenu.style.transform = '';
        body.classList.remove('menu-open');
    }
}
// Aseguramos que el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        const burgerButton = document.getElementById('burger-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;
        let startX = 0;
        let currentX = 0;

        // 1. Toggle del botón con STOP PROPAGATION
        burgerButton?.addEventListener('click', (e) => {e.stopPropagation();
            body.classList.toggle('menu-open');
    });


        // 2. Clic en enlaces
        document.querySelectorAll('.nav-mobile-overlay a')
            .forEach(link => link.addEventListener('click', closeMenu));

        // 3. Clic fuera: Solo si el clic NO es el menú ni el botón
         document.addEventListener('click', (e) => {
            if (
                body.classList.contains('menu-open') &&
                !mobileMenu.contains(e.target) &&
                !burgerButton.contains(e.target)
            ) {
                closeMenu();
            }
        });

        // 4. Tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // 5. Swipe (Follow finger)
        mobileMenu?.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            mobileMenu.style.transition = 'none';
        }, { passive: true });

        mobileMenu?.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            let diffX = currentX - startX;
            if (diffX > 0) {
                mobileMenu.style.transform = `translateX(${diffX}px)`;
            }
        }, { passive: true });

        mobileMenu?.addEventListener('touchend', () => {
            let finalDiff = currentX - startX;
            if (finalDiff > 100) {
                closeMenu();
            } else {
                mobileMenu.style.transition = ''; 
                mobileMenu.style.transform = '';
            }
            startX = 0; currentX = 0;
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 950) closeMenu();
        });
    });


// Seleccionamos todos los enlaces de navegación (desktop y móvil)
/*===================================================*/
/*============    navegación inteligente    =========*/
/*===================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // === LÓGICA DE RESET PARA COMPETENCIAS ===
            if (targetId === '#mesCompetences') {
                // 1. Reiniciamos el índice a la primera tarjeta (intro-text)
                currentIndex = 0; 
                // 2. Desbloqueamos cualquier animación en curso
                isAnimating = false; 
                
                // 3. Aplicamos los estilos visuales de "activa" a la primera tarjeta
                // y "apagada" a las demás inmediatamente
                cardElements.forEach((c, i) => {
                    c.style.opacity = i === 0 ? "1" : "0.2";
                    c.style.transform = i === 0 ? "scale(1.02)" : "scale(0.95)";
                });
            }

            // Cálculo de posición normal
            const style = window.getComputedStyle(targetElement);
            const scrollMargin = parseInt(style.scrollMarginTop) || 0;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - scrollMargin;

            // Salto a la sección
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' 
            });

            // Animación de entrada de la sección
            targetElement.classList.remove('section-active-anim');
            void targetElement.offsetWidth; 
            targetElement.classList.add('section-active-anim');
            
            // Cerrar menú móvil si existe la función
            if (typeof closeMenu === 'function') closeMenu(); 
        }
    });
});


/*===================================================*/
/*===================================================*/
/*=====  websites / carrusel velocidad scroll   =====*/
/*===================================================*/
/*===================================================*/
function handleParallax() {
    requestAnimationFrame(() => {
        const width = window.innerWidth;
        const scrollY = window.scrollY;
        
        // 1. FACTORES DE VELOCIDAD (Añadidos heroTxt y heroImg)
        let f = { 
            heroTxt: 0.2, 
            heroImg: 0.1, 
            carrousel: 0.1, 
            ekekoImg: 0.01, 
            ekekoTxt1: 0.05, 
            ekekoTxt2: -0.05 
        };

        if (width >= 1150) {
            f = { heroTxt: 0.15, heroImg: -0.05, carrousel: 0.48, ekekoImg: 0.01, ekekoTxt1: 0.15, ekekoTxt2: 0.12 };
        } else if (width >= 950) {
            f = { heroTxt: 0.18, heroImg: -0.05, carrousel: 0.40, ekekoImg: 0.01, ekekoTxt1: 0.15, ekekoTxt2: 0.12 };
        } else if (width >= 768) {
            f = { heroTxt: 0.12, heroImg: -0.045, carrousel: 0.38, ekekoImg: 0.01, ekekoTxt1: 0.07, ekekoTxt2: -0.08 };
        } else if (width >= 600) {
            f = { heroTxt: 0.10, heroImg: -0.02, carrousel: 0.37, ekekoImg: 0.005, ekekoTxt1: 0.12, ekekoTxt2: -0.08 };
        } else if (width >= 320) {
            f = { heroTxt: 0.1, heroImg: 0.05, carrousel: 0.41, ekekoImg: 0.01, ekekoTxt1: 0.08, ekekoTxt2: -0.05 };
        } else {
            f = { heroTxt: 0, heroImg: 0, carrousel: 0, ekekoImg: 0, ekekoTxt1: 0, ekekoTxt2: 0 };
        }

        // --- EJECUCIÓN DEL MOVIMIENTO ---
        if (width >= 320) {
            
            // 1. HERO PARALLAX (Texto e Imagen)
            const heroText = document.querySelector('.hero-text');
            const heroImgWrapper = document.querySelector('.image-wrapper');
            
            if (heroText) {
                heroText.style.transform = `translateY(${scrollY * f.heroTxt}px)`;
            }
            if (heroImgWrapper) {
                // El factor negativo o positivo depende de si quieres que suba más lento o más rápido
                heroImgWrapper.style.transform = `translateY(${scrollY * f.heroImg}px)`;
            }

            // 2. WEBSITES
            const webElements = document.querySelectorAll('#ceQueJaimeFaire, .websites, .websites1, .websites2, .websites3, .websites4');
            webElements.forEach(el => {
                el.style.transform = `translateY(${scrollY * 0.1}px)`;
            });

            // 3. CARROUSEL
            const carrousel = document.querySelector('.carrousel-words-container');
            if (carrousel) {
                carrousel.style.transform = `translateY(${scrollY * f.carrousel}px)`;
            }

            // 4. SECCIÓN EKEKO
            const sectionEkeko = document.querySelector('#ekeko');
            if (sectionEkeko) {
                const sectionOffset = scrollY - sectionEkeko.offsetTop;

                document.querySelectorAll('.photo-ekeko').forEach(el => {
                    el.style.transform = `translateY(${sectionOffset * f.ekekoImg}px)`;
                });

                document.querySelectorAll('.text-ekeko-1, .text-ekeko-1-mob').forEach(el => {
                    el.style.transform = `translateY(${sectionOffset * f.ekekoTxt1}px)`;
                });

                document.querySelectorAll('.text-ekeko, .text-ekeko-mob').forEach(el => {
                    el.style.transform = `translateY(${sectionOffset * f.ekekoTxt2}px)`;
                });
            }
        } else {
            // RESET TOTAL
            const toReset = document.querySelectorAll('.hero-text, .image-wrapper, #ceQueJaimeFaire, .websites, .websites1, .carrousel-words-container, .photo-ekeko, .text-ekeko-1, .text-ekeko-1-mob, .text-ekeko, .text-ekeko-mob');
            toReset.forEach(el => el.style.transform = 'none');
        }
    });
}

/*===================================================*/
/*===================================================*/
/*================    scroll cards    ================*/
/*===================================================*/
/*===================================================*/

const cardElements = document.querySelectorAll('.intro-text, .tools-card, .tech-card, .backend-card');

// 1. Configuración del observador
const observerOptions = {
    root: null, // usa el viewport
    rootMargin: '-25% 0px -25% 0px', // El "área activa" es el centro (quita 25% arriba y abajo)
    threshold: 0.1 // Se activa cuando al menos el 10% de la card entra en esa área
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
        } else {
            entry.target.classList.remove('card-visible');
        }
    });
};

// 2. Inicializar el observador
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 3. Aplicar estilos iniciales y empezar a observar
cardElements.forEach(card => {
    card.style.transition = "all 0.5s ease"; // Transición suave para opacidad y escala
    card.style.opacity = "0.25";
    observer.observe(card);
});


/*===================================================*/
/*===================================================*/
/*============    carrusel arrastrable    ===========*/
/*===================================================*/
/*===================================================*/

const slider = document.querySelector('.carrousel-words-container');
const inner = document.querySelector('.carrousel-words');

let isDown = false;
let startX;
let scrollLeft;
let animationId;
let speed = 1.5; // Velocidad base automática
let velocity = 0; // Velocidad del impulso actual
let friction = 0.95; // Qué tan rápido se detiene (0.9 a 0.98 es lo ideal)

const autoScroll = () => {
    if (!isDown) {
        // Sumamos la velocidad automática + el impulso del usuario
        slider.scrollLeft += speed + velocity;
        
        // Aplicamos fricción al impulso para que tienda a cero
        velocity *= friction;

        // Bucle infinito
        if (slider.scrollLeft >= (slider.scrollWidth * 2 / 3)) {
            slider.scrollLeft = slider.scrollWidth / 3;
        } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft = slider.scrollWidth / 3;
        }
    }
    animationId = requestAnimationFrame(autoScroll);
};

// --- GESTIÓN DE ARRASTRE ---
const startDrag = (e) => {
    isDown = true;
    slider.classList.add('active');
    const pageX = e.pageX || e.touches[0].pageX;
    startX = pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    velocity = 0; // Reseteamos inercia anterior al tocar
    cancelAnimationFrame(animationId);
};

const moveDrag = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const pageX = e.pageX || e.touches[0].pageX;
    const x = pageX - slider.offsetLeft;
    
    // Calculamos cuánto se ha movido en este frame para obtener la velocidad
    const walk = (x - startX) * 2; 
    const prevScroll = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - walk;
    
    // La velocidad es la diferencia entre el scroll actual y el anterior
    velocity = slider.scrollLeft - prevScroll;

    // Infinito durante el arrastre
    if (slider.scrollLeft <= 0 || slider.scrollLeft >= (slider.scrollWidth * 2 / 3)) {
        slider.scrollLeft = slider.scrollWidth / 3;
        startX = pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }
};

const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('active');
    // No reseteamos velocity a 0, dejamos que autoScroll la agote con la fricción
    autoScroll();
};

// Listeners (Mouse y Touch)
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mousemove', moveDrag);
window.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchmove', moveDrag);
slider.addEventListener('touchend', endDrag);

// Inicio
window.addEventListener('load', () => {
    slider.scrollLeft = slider.scrollWidth / 3;
    autoScroll();
});


/*===================================================*/
/*===================================================*/
/*=============    navegación al footer    ==========*/
/*===================================================*/
/*===================================================*/


document.querySelectorAll('a[href="#contacte"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (window.innerWidth >= 951) {
            // En DESKTOP: Hacemos scroll hasta el final absoluto de la página
            // Esto "descubre" el footer por completo
            const scrollHeight = document.documentElement.scrollHeight;
            
            if (typeof lenis !== 'undefined') {
                lenis.scrollTo(scrollHeight);
            } else {
                window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
            }
        } else {
            // En MOBILE: Scroll normal al elemento porque no hay reveal
            const target = document.querySelector('#contacte');
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});



/*===================================================*/
/*===================================================*/
/*==============    CARGAR TODO EL DOM    ===========*/
/*===================================================*/
/*===================================================*/

// --- GESTIÓN DE EVENTOS GLOBALES ---

// 1. Al hacer Scroll
window.addEventListener('scroll', handleParallax);

// 2. Al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    initLenis();
    handleParallax();
});

// 3. Al cargar la página (Inicialización Total)
window.addEventListener('load', () => {
    initLenis();      
    handleParallax(); 
    initLanguage();   //incializar la lógica de idiomas aquí
    initActiveMenu(); // línea de menú activo
});

/**
 * Función para inicializar el cambio de idiomas
 */
function initLanguage() {
    const langButtons = document.querySelectorAll('[data-lang]');

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = button.getAttribute('data-lang');

            // --- NUEVO: Guardar en el navegador ---
            localStorage.setItem('preferredLang', selectedLang);

            // Sincronizar botones y cambiar textos
            langButtons.forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-lang') === selectedLang);
            });
            updateTexts(selectedLang);
        });
    });

    // --- NUEVO: Leer el idioma guardado al cargar ---
    const savedLang = localStorage.getItem('preferredLang');
    const initialLang = savedLang || document.querySelector('.active[data-lang]')?.getAttribute('data-lang') || 'fr';
    
    // Aseguramos que los botones reflejen el idioma guardado
    langButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === initialLang);
    });

    updateTexts(initialLang);
}

/**
 * Función que busca y reemplaza los textos
 */
/**
 * Función que busca y reemplaza los textos
 */
function updateTexts(lang) {
    // AQUÍ: Cambia el atributo técnico <html lang="...">
    document.documentElement.lang = lang; 

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Usamos innerHTML para procesar etiquetas como <br>
            el.innerHTML = translations[lang][key];
        }
    });
}