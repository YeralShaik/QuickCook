async function getLatestMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        const recipeContainer = document.querySelector('.recipe-Container');
        recipeContainer.style.display = 'flex';
        recipeContainer.style.flexDirection = 'row';

        data.meals.forEach(meal => {
            const mealContainer = document.createElement('div');
            mealContainer.classList.add('recipe-meal-Container');
            mealContainer.style.display = 'flex';
            mealContainer.style.flexDirection = 'column';
            mealContainer.style.alignItems = 'center';
          
            const newMealImg = document.createElement('img');
            newMealImg.style.width = '80%';
            newMealImg.style.margin = '1px';
            newMealImg.style.gap = '6px';
            newMealImg.style.borderRadius = '8px';
            newMealImg.src = meal.strMealThumb;
            newMealImg.alt = meal.strMeal;

            const mealText = document.createElement('p');
            mealText.classList.add('meal-Text');
            mealText.textContent = meal.strMeal;
            mealText.style.fontSize = '18px';

            mealContainer.appendChild(newMealImg);
            mealContainer.appendChild(mealText);
            recipeContainer.appendChild(mealContainer);
        });
    } catch(error) {
        console.log('Error:', error);
    }
}

async function getCategoryMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        const mealCardsContainer = document.querySelector('.meal-Cards-Container');
        mealCardsContainer.style.display = 'grid';
        mealCardsContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
        mealCardsContainer.style.flexWrap = 'wrap';

        data.categories.forEach(category => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-Card');
            const categoryImg = document.createElement('img');
            categoryImg.classList.add('mealImg');
            categoryImg.src = category.strCategoryThumb;
            categoryImg.alt = category.strCategory;
            const categoryText = document.createElement('p');
            categoryText.classList.add('categoryName-Text');
            categoryText.textContent = category.strCategory;
            categoryText.style.fontSize = '20px';

            mealCard.appendChild(categoryImg);
            mealCard.appendChild(categoryText);
            mealCardsContainer.appendChild(mealCard);

            mealCard.addEventListener('click', async () => {
                await getMeal(category.strCategory);
            });
        });
    } catch(error) {
        console.log('Error:', error);
    }
}

async function getMeal(categoryName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        hideAllSections();
        document.querySelector('.navbar').classList.add('active');
        document.querySelector('.main-Container').style.display = 'none'
        document.querySelector('.meal-Description-Section').classList.add('active');
        document.querySelector('.latestMeal-Section').style.display = 'none'
        document.querySelector('.latestMeal-Section').classList.add('active')
    
        document.querySelector('.recipe-Container').classList.remove('active');

        const mealsContainer = document.querySelector('.meal-Cards-Container');
        mealsContainer.innerHTML = '';

        data.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            const categoryImg = document.createElement('img');
            categoryImg.classList.add('mealImg');
            categoryImg.src = meal.strMealThumb;
            categoryImg.alt = meal.strMeal;
            const categoryText = document.createElement('p');
            categoryText.classList.add('categoryName-Text');
            categoryText.textContent = meal.strMeal;
            categoryText.style.fontSize = '20px';

            mealCard.appendChild(categoryImg);
            mealCard.appendChild(categoryText);
            mealsContainer.appendChild(mealCard);

            mealCard.addEventListener('click', async () => {
                await getMealDescription(meal.idMeal);
                document.querySelector('.recipe-Container').style.display = 'none'
                document.querySelector('.meal-Cards-Container').style.display = 'none'
                document.querySelector('.latestMeal-Section').style.display = 'none';
            });
        });
    } catch(error) {
        console.log('Error:', error);
    }
}

async function getMealDescription(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

         hideAllSections();
         document.querySelector('.category-Meal-Section').style.display = 'none'
         document.querySelector('.category-Meal-Section').classList.add('active')
         document.querySelector('.navbar').classList.add('active')
         document.querySelector('.latestMeal-Section').style.display = 'none'
         document.querySelector('.latestMeal-Section').classList.add('active')
        document.querySelector('.main-Container').style.display = 'none'
   
        document.querySelector('.meal-Cards-Container').classList.add('active')

        document.querySelector('.recipe-Container').classList.add('active')

        const mealSectionDescription = document.querySelector('.meal-Description')
        mealSectionDescription.innerHTML = ''

        const meal = data.meals[0];

        const titleMeal = document.createElement('h1');
        titleMeal.textContent = meal.strMeal;

        const ingredientesMeal = document.createElement('p');
        ingredientesMeal.textContent = meal.strIngredient;

        const imgMeal = document.createElement('img');
        imgMeal.src = meal.strMealThumb;

        const mealInstructions = document.createElement('p');
        mealInstructions.textContent = meal.strInstructions;

        mealSectionDescription.appendChild(titleMeal);
        mealSectionDescription.appendChild(ingredientesMeal);
        mealSectionDescription.appendChild(imgMeal);
        mealSectionDescription.appendChild(mealInstructions);

       
    } catch(error) {
        console.log('Error:', error);
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
}

getCategoryMeal();
getLatestMeal();
