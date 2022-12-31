const mealSection = document.getElementById('meal-section')
const favMeals = document.querySelector('.fav-meals')

getMeal()
fetchFavMeals()

async function getMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const respData = await resp.json()
    const randomMeal = respData.meals[0]

    addMeal(randomMeal, true)
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    const respData = await resp.json()
    const meal = respData.meals[0]

    return meal
}

async function getMealBySearch(term) {
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)
}

function addMeal(mealData, random = false) {
    const meal = document.createElement("div")
    meal.innerHTML = `                
    <div class="meal-header">
        ${random ? `<span class="random">Random Recipe</span>` : ''}
        <img src='${mealData.strMealThumb}' alt= '${mealData.strMeal}'>
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`
    mealSection.appendChild(meal)

    const btn = meal.querySelector(".meal-body .fav-btn")
    btn.addEventListener('click',()=>{
        if (btn.classList.contains("active")) { // check if btn contains a class named "active", this enables us to write css-specific when button is clicked
            removeMealFromLS(mealData.idMeal)
            btn.classList.remove("active")
        } else {
            addMealToLS(mealData.idMeal)
            btn.classList.add("active")
        }
        fetchFavMeals()
    })
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS()
    localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]))
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds
}

function removeMealFromLS(mealId) {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    const newMealIds = mealIds.filter(item => {
        if (item==mealId) {
            return false
        }
        else {
            return true
        }
    })
    localStorage.setItem('mealIds',JSON.stringify(newMealIds))
}

async function fetchFavMeals() {
    // cleaning the container
    favMeals.innerHTML = ''
    const mealIds = getMealsFromLS()

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i]
        const meal = await getMealById(mealId)
        addMealToFav(meal)
    }
}

function addMealToFav(mealData) {
    const favMeal = document.createElement('li')
    favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <button class="clear" id="clear"><i class="fas fa-window-close"></i></button>
    <span>${mealData.strMeal}</span>`
    favMeals.appendChild(favMeal)

    const btn = favMeal.querySelector(".clear")

    btn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal)
        fetchFavMeals()
    })
}