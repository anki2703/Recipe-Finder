const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');

const APP_ID = 'e098fd4a'; // Replace with your Edamam APP ID
const APP_KEY = '8769bd161c2b6c32828a18f19b172901'; // Replace with your Edamam APP KEY

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="not-found">No recipes found for your search. Please try again with different ingredients or cuisine.</p>';
        return;
    }

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <div class="recipe-details">
                <h2 class="recipe-title">${recipe.label}</h2>
                <p class="recipe-ingredients"><strong>Ingredients:</strong> ${recipe.ingredientLines.join(', ')}</p>
                <p class="recipe-instructions"><strong>Instructions:</strong> <a href="${recipe.url}" target="_blank" class="view-recipe-button">View Recipe</a></p>
            </div>
        `;
        
        recipesContainer.appendChild(recipeElement);
    });
}
