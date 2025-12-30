const recipes = {
    pizza: [
        {
            name: "Classic Margherita Pizza",
            image: "Pizza/Classic Margherita Pizza.jpg",
            prepTime: "20 mins",
            cookTime: "15 mins",
            ingredients: [
                "2 1/4 cups all-purpose flour",
                "1 packet active dry yeast",
                "1 cup warm water",
                "2 tbsp olive oil",
                "1 tsp salt",
                "1 tsp sugar",
                "1 cup tomato sauce",
                "2 cups mozzarella cheese",
                "Fresh basil leaves",
                "Salt and pepper to taste"
            ],
            instructions: [
                "Mix warm water, sugar, and yeast. Let sit for 5 minutes until foamy.",
                "Add flour, salt, and olive oil. Knead for 10 minutes until smooth.",
                "Let dough rise in a warm place for 1 hour until doubled.",
                "Preheat oven to 475°F (245°C).",
                "Roll out dough on a floured surface to desired thickness.",
                "Spread tomato sauce evenly, leaving a border for the crust.",
                "Sprinkle mozzarella cheese over the sauce.",
                "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
                "Top with fresh basil leaves and serve hot."
            ]
        },
        {
            name: "Pepperoni Pizza",
            image: "Pizza/pepperonipizza.jpg",
            prepTime: "20 mins",
            cookTime: "15 mins",
            ingredients: [
                "1 pizza dough (homemade or store-bought)",
                "1 cup pizza sauce",
                "3 cups mozzarella cheese",
                "20-25 pepperoni slices",
                "1 tsp dried oregano",
                "Olive oil for brushing"
            ],
            instructions: [
                "Preheat oven to 475°F (245°C).",
                "Roll out pizza dough on a floured surface.",
                "Brush edges with olive oil.",
                "Spread pizza sauce evenly over the dough.",
                "Add mozzarella cheese generously.",
                "Arrange pepperoni slices on top.",
                "Sprinkle with dried oregano.",
                "Bake for 12-15 minutes until edges are crispy.",
                "Let cool for 2 minutes before slicing."
            ]
        },
        {
            name: "Supreme Pizza",
            image: "Pizza/Supreme_pizza.jpg",
            prepTime: "25 mins",
            cookTime: "18 mins",
            ingredients: [
                "1 pizza dough",
                "1 cup marinara sauce",
                "3 cups mozzarella cheese",
                "1/2 cup pepperoni slices",
                "1/2 cup Italian sausage, cooked and crumbled",
                "1/2 cup bell peppers, sliced",
                "1/2 cup mushrooms, sliced",
                "1/4 cup black olives, sliced",
                "1/4 cup red onion, diced",
                "1 tsp Italian seasoning"
            ],
            instructions: [
                "Preheat oven to 475°F (245°C).",
                "Roll out dough and place on pizza pan or stone.",
                "Spread marinara sauce over dough.",
                "Layer half the mozzarella cheese.",
                "Distribute pepperoni, sausage, peppers, mushrooms, olives, and onion.",
                "Top with remaining cheese.",
                "Sprinkle Italian seasoning over top.",
                "Bake 15-18 minutes until crust is golden brown.",
                "Cool for 3 minutes before slicing and serving."
            ]
        },
        {
            name: "BBQ Chicken Pizza",
            image: "Pizza/bbq-chicken-pizza-feature.jpg",
            prepTime: "20 mins",
            cookTime: "16 mins",
            ingredients: [
                "1 pizza dough",
                "1/2 cup BBQ sauce",
                "2 cups mozzarella cheese",
                "1/2 cup smoked gouda cheese, shredded",
                "2 cups cooked chicken breast, diced",
                "1/2 red onion, thinly sliced",
                "1/4 cup fresh cilantro, chopped",
                "1 tsp smoked paprika",
                "Olive oil for brushing"
            ],
            instructions: [
                "Preheat oven to 475°F (245°C).",
                "Roll out pizza dough and brush edges with olive oil.",
                "Spread BBQ sauce evenly over the dough.",
                "Mix mozzarella and smoked gouda, sprinkle half over sauce.",
                "Distribute cooked chicken evenly across pizza.",
                "Add sliced red onion on top.",
                "Sprinkle remaining cheese and dust with smoked paprika.",
                "Bake 14-16 minutes until crust is golden and cheese is bubbly.",
                "Garnish with fresh cilantro before serving."
            ]
        },
        {
            name: "White Pizza",
            image: "Pizza/white_pizza-2-480x270.jpg",
            prepTime: "18 mins",
            cookTime: "14 mins",
            ingredients: [
                "1 pizza dough",
                "3 tbsp olive oil",
                "4 cloves garlic, minced",
                "2 cups mozzarella cheese",
                "1 cup ricotta cheese",
                "1/2 cup parmesan cheese, grated",
                "Fresh spinach leaves",
                "1/2 tsp red pepper flakes",
                "Salt and pepper to taste"
            ],
            instructions: [
                "Preheat oven to 475°F (245°C).",
                "Roll out dough on floured surface.",
                "Mix olive oil with minced garlic.",
                "Brush garlic oil over entire dough surface.",
                "Dollop ricotta cheese across the pizza.",
                "Spread mozzarella and parmesan cheese.",
                "Add fresh spinach leaves.",
                "Season with red pepper flakes, salt, and pepper.",
                "Bake 12-14 minutes until golden and crispy."
            ]
        },
        {
            name: "Meat Lovers Pizza",
            image: "Pizza/Meat-lovers-pizza..jpg",
            prepTime: "25 mins",
            cookTime: "16 mins",
            ingredients: [
                "1 pizza dough",
                "1 cup pizza sauce",
                "3 cups mozzarella cheese",
                "1/2 cup pepperoni slices",
                "1/2 cup Italian sausage, cooked and crumbled",
                "1/2 cup ground beef, cooked and seasoned",
                "1/4 cup bacon, cooked and crumbled",
                "1/4 cup ham, diced",
                "1 tsp Italian seasoning",
                "Olive oil for brushing"
            ],
            instructions: [
                "Preheat oven to 475°F (245°C).",
                "Roll out pizza dough and brush edges with olive oil.",
                "Spread pizza sauce evenly over dough.",
                "Sprinkle half the mozzarella cheese.",
                "Layer pepperoni, sausage, ground beef, bacon, and ham evenly.",
                "Top with remaining mozzarella cheese.",
                "Sprinkle Italian seasoning over top.",
                "Bake 14-16 minutes until crust is golden and cheese is bubbly.",
                "Let cool 2 minutes before slicing and serving."
            ]
        }
    ],
    burgers: [
        {
            name: "Classic Beef Burger",
            image: "Burgers/classic-beef-burger.jpg",
            prepTime: "15 mins",
            cookTime: "10 mins",
            ingredients: [
                "1 lb ground beef (80/20)",
                "4 hamburger buns",
                "4 slices cheddar cheese",
                "1 tomato, sliced",
                "Lettuce leaves",
                "1 onion, sliced",
                "Pickles",
                "Ketchup and mustard",
                "Salt and pepper"
            ],
            instructions: [
                "Divide ground beef into 4 equal portions and form into patties.",
                "Season both sides generously with salt and pepper.",
                "Heat grill or skillet over medium-high heat.",
                "Cook patties for 4-5 minutes per side for medium doneness.",
                "Add cheese slices in the last minute of cooking.",
                "Toast burger buns lightly on the grill.",
                "Assemble: bottom bun, lettuce, patty with cheese, tomato, onion, pickles.",
                "Add ketchup and mustard to taste.",
                "Top with bun and serve immediately."
            ]
        },
        {
            name: "BBQ Bacon Burger",
            image: "Burgers/BBQ-Bacon-Burger.jpg",
            prepTime: "20 mins",
            cookTime: "15 mins",
            ingredients: [
                "1 lb ground beef",
                "8 slices bacon",
                "4 burger buns",
                "4 slices cheddar cheese",
                "1/2 cup BBQ sauce",
                "1 red onion, sliced into rings",
                "Lettuce",
                "Salt and pepper"
            ],
            instructions: [
                "Cook bacon until crispy. Set aside.",
                "Form ground beef into 4 patties and season with salt and pepper.",
                "Grill or pan-fry patties for 4-5 minutes per side.",
                "Add cheese in the last minute of cooking.",
                "Toast buns on the grill.",
                "Brush BBQ sauce on bottom bun.",
                "Layer: lettuce, burger patty with cheese, 2 bacon slices, onion rings.",
                "Drizzle more BBQ sauce on top.",
                "Cover with top bun and enjoy!"
            ]
        },
        {
            name: "Spicy Sriracha Burger",
            image: "Burgers/Spicy-siracha-burger.png",
            prepTime: "15 mins",
            cookTime: "12 mins",
            ingredients: [
                "1 lb ground beef",
                "4 burger buns",
                "4 slices pepper jack cheese",
                "3 tbsp sriracha sauce",
                "1/4 cup mayo",
                "2 jalapeños, sliced",
                "4 slices jalapeño bacon",
                "Pickled jalapeños",
                "Lettuce",
                "Sliced tomato",
                "Red pepper flakes",
                "Salt and pepper"
            ],
            instructions: [
                "Mix 2 tbsp sriracha with mayo to make spicy mayo. Set aside.",
                "Cook jalapeño bacon until crispy. Drain and set aside.",
                "Mix remaining sriracha into ground beef with red pepper flakes.",
                "Form into 4 patties and season with salt and pepper.",
                "Cook patties over medium-high heat 4-5 minutes per side.",
                "Top with pepper jack cheese in last minute of cooking.",
                "Toast buns until lightly crispy.",
                "Spread spicy mayo on both bun halves.",
                "Layer: lettuce, tomato, spicy patty, jalapeño bacon, fresh and pickled jalapeños.",
                "Serve with a glass of cold milk!"
            ]
        },
        {
            name: "Double Cheeseburger Deluxe",
            image: "Burgers/Double-Cheeseburger-Deluxe.jpg",
            prepTime: "20 mins",
            cookTime: "12 mins",
            ingredients: [
                "1.5 lb ground beef",
                "4 sesame seed buns",
                "8 slices American cheese",
                "1 tomato, sliced",
                "Lettuce leaves",
                "1 onion, sliced",
                "Pickles",
                "Special sauce (mayo, ketchup, relish mix)",
                "Salt and pepper"
            ],
            instructions: [
                "Mix 2 parts mayo, 1 part ketchup, 1 part relish for special sauce.",
                "Divide beef into 8 thin patties (2 per burger).",
                "Season patties with salt and pepper.",
                "Cook patties 2-3 minutes per side over high heat.",
                "Place cheese on each patty during last minute.",
                "Toast buns until golden.",
                "Spread special sauce on both bun halves.",
                "Stack: bottom bun, lettuce, first patty, second patty, tomato, onion, pickles, top bun.",
                "Press gently and serve immediately."
            ]
        },
        {
            name: "Turkey Burger",
            image: "Burgers/Turkey-Burger.jpg",
            prepTime: "15 mins",
            cookTime: "12 mins",
            ingredients: [
                "1 lb ground turkey",
                "1/4 cup breadcrumbs",
                "1 egg",
                "2 tbsp Worcestershire sauce",
                "4 whole wheat buns",
                "4 slices provolone cheese",
                "Avocado slices",
                "Tomato slices",
                "Lettuce",
                "Red onion",
                "Honey mustard"
            ],
            instructions: [
                "Mix ground turkey, breadcrumbs, egg, and Worcestershire in a bowl.",
                "Form into 4 patties, slightly larger than buns.",
                "Season both sides with salt and pepper.",
                "Cook over medium heat 5-6 minutes per side until internal temp reaches 165°F.",
                "Add provolone cheese in last minute of cooking.",
                "Toast whole wheat buns.",
                "Spread honey mustard on buns.",
                "Assemble: lettuce, turkey patty, avocado, tomato, red onion.",
                "Serve with sweet potato fries."
            ]
        },
        {
            name: "Jalapeño Pepper Jack Burger",
            image: "Burgers/Pepper-Jack-Jalapeno-Burgers.jpg",
            prepTime: "18 mins",
            cookTime: "12 mins",
            ingredients: [
                "1 lb ground beef",
                "4 burger buns",
                "4 slices pepper jack cheese",
                "2 jalapeños, sliced",
                "4 strips bacon",
                "1/2 cup crispy fried onions",
                "Chipotle mayo",
                "Lettuce",
                "Salt and pepper"
            ],
            instructions: [
                "Cook bacon until crispy. Drain on paper towels.",
                "Form beef into 4 patties and season generously.",
                "Cook patties 4-5 minutes per side.",
                "Top with pepper jack cheese and jalapeño slices in last minute.",
                "Toast buns until lightly crispy.",
                "Spread chipotle mayo on both bun halves.",
                "Layer: lettuce, spicy patty, bacon, crispy fried onions.",
                "Top with bun and serve with extra jalapeños on the side."
            ]
        }
    ],
    cakes: [
        {
            name: "Chocolate Layer Cake",
            image: "Cakes/chocolate-layer-cake.jpg",
            prepTime: "30 mins",
            cookTime: "35 mins",
            ingredients: [
                "2 cups all-purpose flour",
                "2 cups sugar",
                "3/4 cup cocoa powder",
                "2 tsp baking soda",
                "1 tsp baking powder",
                "1 tsp salt",
                "2 eggs",
                "1 cup milk",
                "1 cup vegetable oil",
                "2 tsp vanilla extract",
                "1 cup boiling water",
                "Chocolate frosting (store-bought or homemade)"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Grease two 9-inch round pans.",
                "Mix flour, sugar, cocoa, baking soda, baking powder, and salt.",
                "Add eggs, milk, oil, and vanilla. Beat on medium speed for 2 minutes.",
                "Stir in boiling water (batter will be thin).",
                "Pour batter evenly into prepared pans.",
                "Bake for 30-35 minutes until toothpick comes out clean.",
                "Cool in pans for 10 minutes, then remove to wire racks.",
                "Let cool completely before frosting.",
                "Frost between layers, on top, and around sides of cake."
            ]
        },
        {
            name: "Classic Vanilla Cake",
            image: "Cakes/Classic-Vanilla-Cake-6-scaled.jpg",
            prepTime: "25 mins",
            cookTime: "30 mins",
            ingredients: [
                "2 1/2 cups all-purpose flour",
                "2 1/2 tsp baking powder",
                "1/2 tsp salt",
                "1 cup unsalted butter, softened",
                "2 cups sugar",
                "4 eggs",
                "1 tbsp vanilla extract",
                "1 cup whole milk",
                "Vanilla buttercream frosting"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Grease and flour two 9-inch pans.",
                "Whisk together flour, baking powder, and salt.",
                "Cream butter and sugar until light and fluffy (3-4 minutes).",
                "Add eggs one at a time, beating well after each.",
                "Mix in vanilla extract.",
                "Alternately add flour mixture and milk, beginning and ending with flour.",
                "Divide batter between pans and smooth tops.",
                "Bake 25-30 minutes until golden and toothpick comes out clean.",
                "Cool completely, then frost with vanilla buttercream."
            ]
        },
        {
            name: "Red Velvet Cake",
            image: "Cakes/Red-velvet-cake.jpg",
            prepTime: "30 mins",
            cookTime: "30 mins",
            ingredients: [
                "2 1/2 cups all-purpose flour",
                "1 1/2 cups sugar",
                "1 tsp baking soda",
                "1 tsp salt",
                "1 tsp cocoa powder",
                "1 1/2 cups vegetable oil",
                "1 cup buttermilk, room temperature",
                "2 large eggs",
                "2 tbsp red food coloring",
                "1 tsp white vinegar",
                "1 tsp vanilla extract",
                "Cream cheese frosting"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Grease two 9-inch round pans.",
                "Sift together flour, sugar, baking soda, salt, and cocoa powder.",
                "In another bowl, whisk oil, buttermilk, eggs, food coloring, vinegar, and vanilla.",
                "Combine wet and dry ingredients, mixing until smooth.",
                "Pour batter evenly into prepared pans.",
                "Bake for 25-30 minutes until toothpick comes out clean.",
                "Cool in pans for 10 minutes, then transfer to wire racks.",
                "Cool completely before frosting.",
                "Frost with cream cheese frosting between layers and on top."
            ]
        },
        {
            name: "Carolina Reaper Chocolate Cake",
            image: "Cakes/carolina-reaper-cake.jpg",
            prepTime: "35 mins",
            cookTime: "35 mins",
            ingredients: [
                "2 cups all-purpose flour",
                "2 cups sugar",
                "3/4 cup dark cocoa powder",
                "2 tsp baking soda",
                "1 tsp baking powder",
                "1 tsp salt",
                "1 cup buttermilk",
                "1 cup strong black coffee",
                "1/2 cup vegetable oil",
                "2 eggs",
                "1 tsp vanilla extract",
                "1-2 tsp Carolina Reaper pepper powder (adjust to heat preference)",
                "1/2 tsp cinnamon",
                "Dark chocolate ganache"
            ],
            instructions: [
                "WARNING: Use gloves when handling Carolina Reaper powder. This is EXTREMELY hot!",
                "Preheat oven to 350°F (175°C). Grease two 9-inch round pans.",
                "Mix flour, sugar, cocoa, baking soda, baking powder, salt, reaper powder, and cinnamon.",
                "In separate bowl, combine buttermilk, coffee, oil, eggs, and vanilla.",
                "Gradually mix wet ingredients into dry ingredients.",
                "Beat on medium speed for 2 minutes until smooth.",
                "Pour batter evenly into prepared pans.",
                "Bake 30-35 minutes until toothpick comes out clean.",
                "Cool in pans 10 minutes, then remove to wire racks.",
                "Cool completely before frosting with dark chocolate ganache.",
                "Serve with warning label and cold milk. Not for the faint of heart!"
            ]
        },
        {
            name: "Coconut Cake",
            image: "Cakes/Coconut-Cake.jpg",
            prepTime: "30 mins",
            cookTime: "30 mins",
            ingredients: [
                "2 1/2 cups all-purpose flour",
                "2 1/2 tsp baking powder",
                "1/2 tsp salt",
                "1 cup unsalted butter, softened",
                "2 cups sugar",
                "4 eggs",
                "1 tsp vanilla extract",
                "1 tsp coconut extract",
                "1 cup coconut milk",
                "1 cup sweetened shredded coconut",
                "Cream cheese frosting",
                "2 cups shredded coconut (for coating)"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Grease two 9-inch pans.",
                "Combine flour, baking powder, and salt.",
                "Cream butter and sugar until fluffy.",
                "Add eggs one at a time, beating well after each.",
                "Mix in vanilla and coconut extracts.",
                "Alternate adding flour mixture and coconut milk.",
                "Fold in 1 cup shredded coconut.",
                "Divide batter between pans and bake 25-30 minutes.",
                "Cool completely, frost with cream cheese frosting.",
                "Press shredded coconut all over frosted cake."
            ]
        },
        {
            name: "Hazelnut Cake",
            image: "Cakes/hazelnut-cake.jpg",
            prepTime: "30 mins",
            cookTime: "35 mins",
            ingredients: [
                "2 cups all-purpose flour",
                "1 1/2 cups ground hazelnuts",
                "2 tsp baking powder",
                "1/2 tsp salt",
                "1 cup unsalted butter, softened",
                "1 3/4 cups sugar",
                "4 large eggs",
                "1 tsp vanilla extract",
                "1/2 cup whole milk",
                "1/4 cup Frangelico (hazelnut liqueur) or milk",
                "Chocolate hazelnut frosting",
                "1/2 cup chopped toasted hazelnuts for decoration",
                "Whole hazelnuts for topping"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round pans.",
                "Toast hazelnuts in oven for 8-10 minutes, then grind finely.",
                "Whisk together flour, ground hazelnuts, baking powder, and salt.",
                "Cream butter and sugar until light and fluffy (4-5 minutes).",
                "Add eggs one at a time, beating well after each addition.",
                "Mix in vanilla extract.",
                "Combine milk and Frangelico (or additional milk).",
                "Alternately add flour mixture and milk mixture to butter mixture.",
                "Divide batter evenly between prepared pans.",
                "Bake 30-35 minutes until toothpick comes out clean.",
                "Cool in pans 10 minutes, then transfer to wire racks.",
                "Cool completely before frosting with chocolate hazelnut frosting.",
                "Decorate with chopped hazelnuts and whole hazelnuts on top."
            ]
        }
    ]
};

function displayRecipe(recipe) {
    const container = document.getElementById('recipe-container');

    container.innerHTML = `
        <div class="recipe-card">
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">` : ''}
            <h2 class="recipe-title">${recipe.name}</h2>
            <div class="recipe-meta">
                <span>Prep: ${recipe.prepTime}</span> | <span>Cook: ${recipe.cookTime}</span>
            </div>

            <div class="recipe-columns">
                <div class="recipe-section">
                    <h3>INGREDIENTS:</h3>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>

                <div class="recipe-section">
                    <h3>INSTRUCTIONS:</h3>
                    <ol class="instructions-list">
                        ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;
}

function populateDropdowns() {
    // Populate Pizza menu
    const pizzaMenu = document.getElementById('pizza-menu');
    recipes.pizza.forEach(recipe => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = recipe.name;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            displayRecipe(recipe);
        });
        pizzaMenu.appendChild(link);
    });

    // Populate Burgers menu
    const burgersMenu = document.getElementById('burgers-menu');
    recipes.burgers.forEach(recipe => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = recipe.name;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            displayRecipe(recipe);
        });
        burgersMenu.appendChild(link);
    });

    // Populate Cakes menu
    const cakesMenu = document.getElementById('cakes-menu');
    recipes.cakes.forEach(recipe => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = recipe.name;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            displayRecipe(recipe);
        });
        cakesMenu.appendChild(link);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
});
