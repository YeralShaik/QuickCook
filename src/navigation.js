// Función de navegación
function navigator() {
    console.log({ location });

    if (location.hash === '#searchPage') {
        searchPage();
    } else if (location.hash === '#homePage') {
        homePage();
    } else if (location.hash.startsWith('#mealdescription=')) {
        mealDescriptionPage();
    } else {
        homePage();
    }
}

// Función para mostrar la página de inicio
function homePage() {
    console.log('Home!!');
    // Aquí colocarías el código para mostrar la página de inicio según tu diseño
}

// Función para mostrar la página de búsqueda
function searchPage() {
    console.log('Search Page!!');
    // Aquí colocarías el código para mostrar la página de búsqueda según tu diseño
}

// Función para mostrar la descripción de la comida
function mealDescriptionPage() {
    console.log('Meal Description Page!!');
    // Aquí colocarías el código para mostrar la descripción de la comida según tu diseño
}

// Agregar event listeners para cambios en la ubicación (hashchange) y carga inicial (DOMContentLoaded)
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
