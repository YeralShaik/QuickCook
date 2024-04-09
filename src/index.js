
async function getLastestMeal() {
    try {
       
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')

      
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText)
        }
        const data = await response.json();
        console.log(data);

        const recipeContainer = document.querySelector('.recipe-Container')
        const mealContainer = document.querySelector('.recipe-meal-Container')

        recipeContainer.style.display = 'flex'
        recipeContainer.style.flexDirection = 'row'

       

        data.meals.forEach(meal => {
                
        const mealContainer = document.createElement('div')
        mealContainer.classList.add('.recipe-meal-Container')
        mealContainer.style.display = 'flex'
        mealContainer.style.flexDirection = 'column'
        mealContainer.style.alignItems = 'center'
          
        const newMealImg = document.createElement('img')

           newMealImg.style.width = '80%'
           newMealImg.style.margin = '1px'
           newMealImg.style.gap = '6px'
           newMealImg.style.borderRadius = '8px'

           newMealImg.src = meal.strMealThumb
           newMealImg.alt = meal.strMeal

           const mealText = document.createElement('p')
           mealText.textContent = meal.strMeal
           mealText.style.fontSize = '18px'
           
           mealContainer.appendChild(newMealImg)
           mealContainer.appendChild(mealText);
           recipeContainer.appendChild(mealContainer)
 
       
        })


    } catch(error) {
      
        console.log('Error:', error)
    }
}

getLastestMeal()
//obtener imagenes por categoria 
async function getCategoryMeal() {
    try {
      
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }

        // Extrae los datos JSON de la respuesta
        const data = await response.json();
        console.log(data);

        // Obtén el contenedor de las tarjetas de comida
        const mealCardsContainer = document.querySelector('.meal-Cards-Container');
        mealCardsContainer.style.display = 'grid'
        mealCardsContainer.style.gridTemplateColumns= '1fr 1fr'
        mealCardsContainer.style.flexWrap = 'wrap'

        // Itera sobre los datos obtenidos
        data.categories.forEach(category => {
            // Crea un nuevo elemento de tarjeta de comida
            const mealCards = document.createElement('div');
            mealCards.classList.add('meal-Card');

  
            
            const newImg = document.createElement('img');
            newImg.classList.add('mealImg')
            newImg.src = category.strCategoryThumb;
            newImg.alt = category.strCategory;
            newImg.style.width = 'auto'
            newImg.style.height = '100%'
    
            // Crea un nuevo elemento de párrafo para el texto de la categoría
            const categoryText = document.createElement('p');
            categoryText.textContent = category.strCategory;
            categoryText.style.fontSize = '18px'


            // Agrega la imagen y el texto de la categoría a la tarjeta de comida
            mealCards.appendChild(newImg);
            mealCards.appendChild(categoryText);
   
            // Agrega la tarjeta de comida al contenedor
            mealCardsContainer.appendChild(mealCards);
      

        });
    } catch(error) {
      
        console.log('Error:', error)
    }
}

getCategoryMeal()


//www.themealdb.com/api/json/v1/1/list.php?a=list


async function getCountryList() {
    try {
        // Realiza una solicitud para obtener los datos de las categorías de comidas
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

        // Verifica si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }

        // Extrae los datos JSON de la respuesta
        const country = await response.json();
        console.log(country);
        const countryContainer = document.querySelector('country-Section')
        
        country.meals.forEach(area => {
          
            mealCard.classList.add('meal-Card');
            const newImgCountry = document.createElement('img')
            newImgCountry.src = area.strArea 
        
            countryContainer.appendChild(newImgCountry)
        })


    } catch(error) {
      
        console.log('Error:', error)
    }
}
getCountryList()