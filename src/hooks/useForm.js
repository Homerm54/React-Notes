import { useState } from 'react';

/**
 * Hook to keep track of a form's values.
 * 
 * @param {Object} initialValues Object containing the initial values of the form, no values by default.
 * 
 * @return {Array} [ values, handleInputChange, reset ] :
 * 
 * values: Object with the input's values, stored by input name.
 * handleInputChange: Function to kkep track of a change in a individual input, must be passed to every input that we want to track, through: 
 * `<input onChange={ handleInputChange }/>`
 * reset: A shorthand function to reset a form to it's original (initialValues) values.
 */
export default function useForm (initialValues = {}){
  const [ values, setValues ] = useState(initialValues);

  function reset(){
    setValues(initialValues);
  }

  /**
   * 
   * @param {Event} event The event object, fired by the input field
   */
  function handleInputChange({ target }){
    setValues({
      ...values,
      [ target.name ]: target.value // Update the state with a new value
    })
  }

  return [ values, handleInputChange, reset ];
}