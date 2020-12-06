const mongoose = require('mongoose')
const Recipe = require('../models/recipes.model')

const dbName = 'Recipes-FinalProject'
mongoose.connect(`mongodb://localhost/${dbName}`)


const recipes = [

    {
        name: 'lentejas vegetarianas',
        type: 'vegetarian',
        ingredients: [
            {
                food: 'lentejas',
                quantity: 500,
                measure: 'gr'
            },
            {
                food: 'cebolla grande',
                quantity: 1
            }, {
                food: 'puerro',
                quantity: 1
            }, {
                food: 'tomates',
                quantity: 2
            }, {
                food: 'zanahorias',
                quantity: 2
            }, {
                food: 'pimiento rojo',
                quantity: 1
            }, {
                food: 'calabacines',
                quantity: 2
            }, {
                food: 'dientes de ajo',
                quantity: 2
            }, {
                food: 'aceite de oliva virgen al gusto',
            }, {
                food: 'cucharadita de comino',
                quantity: 1
            }, {
                food: 'cucharadita de comino',
                quantity: 1
            }, {
                food: 'Sal y pimienta al gusto',
            },],
        instructions: ['Unas horas antes de comenzar con la preparación, poner las lentejas en remojo. No obstante, hay lentejas actualmente en el mercado que no necesitan ponerse en remojo.', 'A continuación, cortar todas las verduras en dados. Cortar las cebollas y el puerro en juliana y trocear los ajos en láminas muy finas.', 'En una sartén, poner un poco de aceite de oliva y sofreír allí los ajos. Cuando estos comiencen a dorarse, echar las cebollas junto con el puerro y cocer unos minutos con una pizca de sal.', 'Añadir después el pimiento y las zanahorias. Removiendo de vez en cuando los ingredientes, incorporar a continuación los tomates y los calabacines.', 'Agregar las especias al gusto y las lentejas escurridas. Añadir dos vasos de agua y cubrir con ella los ingredientes. Tapar y cocer durante 20 minutos o hasta que las lentejas estén tiernas.', 'Por último, echar una pizca de pimienta y rectificar la sal. Apagar el fuego y dejar reposar durante 5 minutos.', 'Servir bien caliente.'],
        origin: 'España',
        servings: 4
    },
    {
        name: 'Burritos vegetales de Heura',
        type: 'vegan',
        ingredients: [
            {
                food: 'Tortillas de trigo para burritos'
            },
            {
                food: 'caja de heura',
                quantity: 1
            }, {
                food: 'pimiento rojo',
                quantity: 1
            }, {
                food: 'cebolla',
                quantity: 1
            }, {
                food: 'setas shiitake',
                quantity: 5
            }, {
                food: 'Aceite de oliva'
            }, {
                food: 'Pimentón dulce'
            }, {
                food: 'ajo en polvo',
                quantity: 2
            }, {
                food: 'perejil',
            }, {
                food: 'Sal',
                quantity: 1
            }, {
                food: 'Opcional: mayonesa vegana'
            }],
        instructions: ['Si vas a usar Heura congelada, retírala del congelador ya.', 'En primer lugar picaremos la cebolla en tiras, y la colocaremos en la sartén, con un chorro generoso de aceite de oliva.', 'Lo dejamos saltear a fuego medio-bajo, removiendo peiódicamente.', 'Mientras, cortamos en tiras el pimiento rojo y las setas shiitake.', 'Cuando la cebolla comience a estar pochada, añadimos el pimiento y las setas shiitake.', 'Cuando la cebolla comience a estar pochada, añadimos el pimiento y las setas shiitake', 'Salteamos hasta que comience a dorar ligeramente', 'Seguidamente, añadimos la Heura y la salteamos hasta que empiece a tostar muy ligeramente. Asegúrate de hacerla por ambas partes.', 'Cuando esté cogiendo algo de color, añadimos 2 cditass peequeñas de pimentón dulce, 2 pellizcos de perejil, 3 pellizcos de ajo en polvo y dos pellizcos más de sal.', 'Removemos y nos aseguramos de dorarlo bien, a fuego medio, para que todo se saltee con cariño', 'Cuando esté listo, retiramos y rellenamos los burritos con el salteado, trocitos de lechuga troceadas y la salsa mayonesa'],
        origin: 'España',
        servings: 3
    },
    {
        name: 'Receta de pollo asado con salsa de mandarinas y frutas secas',
        ingredients: [
            {
                food: 'Muslos de pollo',
                quantity: 4
            },
            {
                food: 'Mostaza a la antigua',
                quantity: 30,
                measure: 'ml'
            }, {
                food: 'Higos secos',
                quantity: 12
            }, {
                food: 'Orejones de albaricoque',
                quantity: 1
            }, {
                food: 'Mandarina o clementinas',
                quantity: 5
            }, {
                food: 'Cebollitas francesas',
                quantity: 6
            }, {
                food: 'Aceite de oliva virgen extra'
            }, {
                food: 'Sal',
            }, {
                food: 'Pimienta negra molida',
            }],
        instructions: ['Comenzaremos precalentando el horno a 190ºC. Seguidamente exprimimos las mandarinas y vertemos su zumo en un cacito que pondremos con las frutas secas enteras a cocer durante cinco minutos. Reservamos.', 'Salpimentamos los zancos de pollo y los embadurnamos de mostaza a la antigua, colocándolos en una fuente refractaria con el aceite de oliva por encima. Disponemos las cebollitas francesas repartidas entre la carne. Horneamos de esta manera 20 minutos.', 'Una vez que pase el tiempo, vertemos el zumo de mandarina con las frutas secas por encima y seguimos horneando durante 30 minutos más.'],
        origin: 'España',
        servings: 4
    }]

Recipe
    .create(recipes)
    .then(allRecipesCreated => {
        console.log(`Created ${allRecipesCreated.length} recipes`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))


const User = require('../models/user.model')

const users = [
    {
        username: 'cookingMama',
        password: 'cookingMama',
        email: 'maestracocinera@gmail.com',
        firstname: 'Enriqueta',
        lastname: 'Fernández',
    },
    {
        username: 'cookingPapa',
        password: 'cookingPapa',
        email: 'papicocinero@gmail.com',
        firstname: 'Enriqueto',
        lastname: 'Fernondaz',
    }
]

User
    .create(users)
    .then(allUsersCreated => {
        console.log(`Created ${allUsersCreated.length} users`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))
