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
        smoothWheel: true
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
/*==========    botonera desplegable    =============*/
/*===================================================*/
/*===================================================*/


// ================================
// FUNCIÓN GLOBAL
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
/*==============    navegación inteligente    =========*/
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
/*===  websites / carrusel velocidad scroll 1920  ===*/
/*===================================================*/
/*===================================================*/
function handleParallax() {
    requestAnimationFrame(() => {
        const width = window.innerWidth;
        const scrollY = window.scrollY;
        
        let carrouselFactor;

        // ORDEN CORRECTO: De mayor a menor
        if (width >= 951) {
            carrouselFactor = 0.48; 
        } else if (width >= 768) {
            carrouselFactor = 0.38; 
        } else if (width >= 601) {
            carrouselFactor = 0.37; 
        } else if (width >= 320) {
            carrouselFactor = 0.41; 
        } else {
            carrouselFactor = 0; // Para pantallas menores a 320
        }

        // Aplicamos la lógica si tenemos un factor (si es > 0)
        if (carrouselFactor > 0) {
            // CE QUE J'AIME FAIRE
            const cequejaimefaire = document.querySelector('#ceQueJaimeFaire');
            if (cequejaimefaire) {
                cequejaimefaire.style.transform = `translateY(${scrollY * 0.11}px)`;
            }

            // WEBSITES
            const webElements = ['.websites', '.websites1', '.websites2', '.websites3', '.websites4'];
            webElements.forEach(clase => {
                const el = document.querySelector(clase);
                if (el) {
                    el.style.transform = `translateY(${scrollY * 0.1}px)`;
                }
            });

            // CARROUSEL DE PALABRAS
            const carrousel = document.querySelector('.carrousel-words-container');
            if (carrousel) {
                carrousel.style.transform = `translateY(${scrollY * carrouselFactor}px)`;
            }
        } else {
            // Reset total si la pantalla es muy pequeña
            const toReset = ['#ceQueJaimeFaire', '.websites', '.websites1', '.websites2', '.carrousel-words-container'];
            toReset.forEach(sel => {
                const el = document.querySelector(sel);
                if (el) el.style.transform = 'none';
            });
        }
    });
}



/*===================================================*/
/*===================================================*/
/*================    scroll cards    ================*/
/*===================================================*/
/*===================================================*/

const snapContainer = document.querySelector('.section3'); 
const cardElements = document.querySelectorAll('.intro-text, .tools-card, .tech-card, .backend-card');
let currentIndex = -1;
let isAnimating = false;

const updateCardStyles = (index) => {
    cardElements.forEach((c, i) => {
        // Si el índice es -1 (fuera de la sección), todas opacas. 
        // Si no, la activa al 100% y el resto al 20%.
        c.style.opacity = i === index ? "1" : "0.2";
        c.style.transform = i === index ? "scale(1.02)" : "scale(1)";
    });
};

const scrollToCard = (index) => {
    if (isAnimating || index < 0 || index >= cardElements.length) return;
    
    isAnimating = true;
    currentIndex = index;
    const targetCard = cardElements[index];
    
    // Alineamos exactamente a 200px para que coincida con tu CSS
    const targetY = window.scrollY + targetCard.getBoundingClientRect().top - 120;

    window.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });

    updateCardStyles(index);

    // Tiempo de bloqueo para que la animación termine suave
    setTimeout(() => {
        isAnimating = false;
    }, 800);
};

// EVENTO SCROLL: Solo para detectar en qué zona estamos y prender la primera card
window.addEventListener('scroll', () => {
    if (isAnimating) return;

    const rect = snapContainer.getBoundingClientRect();
    
    // Si entramos desde arriba y no hay nada activo, activamos la primera
    if (rect.top < 300 && rect.top > 0 && currentIndex === -1) {
        currentIndex = 0;
        updateCardStyles(0);
    }
    
    // Si salimos de la sección totalmente por arriba, reseteamos
    if (rect.top > 500) {
        currentIndex = -1;
        updateCardStyles(-1);
    }
}, { passive: true });

// EVENTO WHEEL: El que genera el SNAP (paso a paso)
window.addEventListener('wheel', (e) => {
    const rect = snapContainer.getBoundingClientRect();
    
    // Solo activamos el snap si la sección está centrada
    if (rect.top < 250 && rect.bottom > 450) {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        if (e.deltaY > 0) { // Scroll hacia abajo
            if (currentIndex < cardElements.length - 1) {
                e.preventDefault();
                scrollToCard(currentIndex + 1);
            }
        } else { // Scroll hacia arriba
            if (currentIndex > 0) {
                e.preventDefault();
                scrollToCard(currentIndex - 1);
            }
        }
    }
}, { passive: false });



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

// 1. Nos aseguramos de que el parallax se calcule al scrollear
window.addEventListener('scroll', handleParallax);

// 2. Nos aseguramos de que se recalcule si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    initLenis();
    handleParallax();
});

// 3. LA CLAVE: Ejecución al cargar completamente
// Usamos 'load' en lugar de 'DOMContentLoaded' para estar seguros de que 
// Lenis y las dimensiones del scroll ya son definitivas.
window.addEventListener('load', () => {
    initLenis();      // Inicia el scroll suave
    handleParallax(); // Ejecuta el cálculo de posiciones inmediatamente
});