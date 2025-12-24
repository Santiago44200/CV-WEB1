/*===================================================*/
/*===================================================*/
/*==========    botonera desplegable    =============*/
/*===================================================*/
/*===================================================*/



// Aseguramos que el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        const burgerButton = document.getElementById('burger-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;
        let startX = 0;
        let currentX = 0;

        function closeMenu() {
            if (body.classList.contains('menu-open')) {
                mobileMenu.style.transition = ''; 
                mobileMenu.style.transform = '';
                body.classList.remove('menu-open');
            }
        }

        // 1. Toggle del botón con STOP PROPAGATION
        burgerButton?.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic llegue al document
            body.classList.toggle('menu-open');
        });

        // 2. Clic en enlaces
        document.querySelectorAll('.nav-mobile-overlay a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // 3. Clic fuera: Solo si el clic NO es el menú ni el botón
        document.addEventListener('click', (e) => {
            if (body.classList.contains('menu-open')) {
                const isClickInside = mobileMenu.contains(e.target);
                const isClickOnBurger = burgerButton.contains(e.target);
                
                if (!isClickInside && !isClickOnBurger) {
                    closeMenu();
                }
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

/*===================================================*/
/*===================================================*/
/*==============      navegación     ================*/
/*===================================================*/
/*===================================================*/

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
            // 1. LEER EL MARGEN DESDE EL CSS:
            // Esta línea extrae el valor de 'scroll-margin-top' que definiste en tu CSS
            const style = window.getComputedStyle(targetElement);
            const scrollMargin = parseInt(style.scrollMarginTop) || 0;

            // 2. CALCULAR POSICIÓN:
            // Restamos el margen para que el salto respete tus distancias (100px, 200px, etc.)
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - scrollMargin;

            // 3. SALTO Y ANIMACIÓN:
            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto' 
            });

            targetElement.classList.remove('section-active-anim');
            void targetElement.offsetWidth; 
            targetElement.classList.add('section-active-anim');
            
            closeMenu(); // Aseguramos que se cierre el menú
        }
    });
});