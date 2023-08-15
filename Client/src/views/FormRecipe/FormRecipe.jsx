import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe, getAllDiets } from '../../redux/actions';
import styles from './FormRecipe.module.css';


export function validateRecipe(inputs) {
  const errors = {};
  if (!inputs.title) {
    errors.title = 'Title is required';
  }

  const healthScore = parseInt(inputs.healthScore, 10);
  if (isNaN(healthScore) || healthScore < 10 || healthScore > 100) {
    errors.healthScore = 'Health Score must be a number between 10 and 100';
  }

  if (inputs.diets.length === 0) {
    errors.diets = 'Select at least one diet';
  }

  return errors;
}

const FormRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((store) => store.diets);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    healthScore: '',
    steps: [{number: 1, step: ''}],
    image: '',
    diets: [],
  });
console.log(formData,"aquí está")
  useEffect(() => {
    dispatch(getAllDiets())
      .catch((error) => {
        console.error('Error when obtaining diets', error);
      });
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { title, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [title]: value,
    }));
  };

const handleStepsChange = (index, newValue) => {
  const newSteps = [...formData.steps];
  newSteps[index] = {...newSteps[index], step: newValue};
  setFormData((prevData) => ({
    ...prevData,
    steps: newSteps,
    }));
    setErrors(validateRecipe({...formData,steps:newSteps}));
  };

  function handleAddStep() {
    let newStep = {
      number: formData.steps.length + 1,
      step: '',
    };
    setFormData((formData) => ({
      ...formData,
      steps: [...formData.steps, newStep],
      }));
    }

  const handleDietsChange = (event, dietId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setFormData((formData) => ({
        ...formData,
        diets: [
          ...formData.diets,
          dietId,
        ],
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        diets: formData.diets.filter((id) => id !== dietId),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateRecipe(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(createRecipe(formData));

    setFormData({
      title: '',
      summary: '',
      healthScore: '',
      steps: '',
      image: '',
      diets: [],
    });
  };

  return (
    <div className={styles.fondo}>
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Title: </label>
          <br />
          <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange}
          placeholder="Title"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        <br />
        <label htmlFor="image">URL Image: </label>
        <br />
        <input 
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL image"
         />
        {errors.image && <div className="error">{errors.image}</div>}
        <br />
        <label htmlFor="image">URL healthScore: </label>
        <br />
        <input 
        type="number"
        name="healthScore"
        value={formData.healthScore}
        onChange={handleChange}
        placeholder="URL healthScore"
         />
        {errors.healthScore && (<div className="error">{errors.healthScore}</div>)}
        <br />
        <label htmlFor="summary">Summary: </label>
        <br />
        <textarea
        type="text"
        name="summary"
        rows="5"
        value={formData.summary}
        onChange={handleChange}
        placeholder="Summary..."
        />
        {errors.summary && <div className="error">{errors.summary}</div>}
        <br />
        <label htmlFor="steps">Steps: </label>
        <br />
        {formData.steps?.map((step, i) => (
          <div key={i}>
          <strong>Step {step.number}:</strong>
          <br />
          <textarea
            type="text"
            rows="5"
            name="steps"
            value={step.step}
            onChange={(e) => handleStepsChange(i, e.target.value)}
            placeholder="Steps..."
          />
          </div>
        ))}
        {errors.steps && <div className="error">{errors.steps}</div>}
        <input type="button" onClick={handleAddStep} value="Add Step"/>
        <br />
        <label htmlFor="diets">Diets: </label>
        <br />
        {diets?.map((diet, i) => (
          <div key={diet.id}>
            <input 
            type="checkbox"
            name="diets"
            checked={formData.diets.includes(diet.id)}
            onChange={(e) => handleDietsChange(e, diet.id)}
            />
            {diet.name}
          </div>
          ))}
          {errors.diets && <div className="error">{errors.diets}</div>}
          <br />
          <button type="submit">Send</button>
          </form>
          </div>
        
  );
};

export default FormRecipe;


