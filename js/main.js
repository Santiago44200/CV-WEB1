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
    const scrollingUp = window.scrollY < lastScrollY;

    // Entramos desde ARRIBA → primera card
    if (rect.top < 300 && rect.top > 0 && currentIndex === -1 && !scrollingUp) {
        currentIndex = 0;
        updateCardStyles(0);
    }

    // Entramos desde ABAJO → última card
    if (rect.bottom > window.innerHeight - 200 && rect.bottom < window.innerHeight + 200 && currentIndex === -1 && scrollingUp) {
        currentIndex = cardElements.length - 1;
        updateCardStyles(currentIndex);
    }

    // Salimos completamente por arriba → reset
    if (rect.top > 500) {
        currentIndex = -1;
        updateCardStyles(-1);
    }

    lastScrollY = window.scrollY;
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