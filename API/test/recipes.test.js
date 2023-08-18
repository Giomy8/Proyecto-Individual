const request = require('supertest');
const app = require('../src/app'); // Asegúrate de importar correctamente tu aplicación Express

describe('Recipes API Endpoints', () => {
  it('should get the detail of a specific recipe by ID', async () => {
    const response = await request(app).get('/recipes/1'); // Cambia el ID según corresponda
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('recipe'); // Asegúrate de que la respuesta tenga una propiedad "recipe"
  });

  it('should search recipes by name', async () => {
    const response = await request(app).get('/recipes/name').query({ name: 'chicken' }); // Cambia el nombre de búsqueda según corresponda
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('recipes'); // Asegúrate de que la respuesta tenga una propiedad "recipes"
  });

  it('should create a new recipe', async () => {
    const newRecipe = {
      title: 'New Recipe',
      image: 'New Recipe Image',
      summary: 'New Recipe Summary',
      healthScore: 'New Recipe Health Score',
      steps: 'New Recipe Steps',
      // Otros datos de la receta...
    };

    const response = await request(app).post('/recipes').send(newRecipe);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('recipe'); // Asegúrate de que la respuesta tenga una propiedad "recipe"
  });
});

describe('Diets API Endpoint', () => {
  it('should get all diet types', async () => {
    const response = await request(app).get('/diets');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('diets'); // Asegúrate de que la respuesta tenga una propiedad "diets"
  });
});
