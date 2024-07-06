import React, { useReducer } from 'react'
import { useOrderPizzaMutation } from '../state/pizzaApi'

const initialFormState = { // suggested
    fullName: '',
    size: '',
    checkPepperoni: false,
    checkGreenpeppers: false,
    checkPineapple: false,
    checkMushrooms: false,
    checkHam: false,
    toppings: []
}

const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME' 
const CHANGE_SIZE = 'CHANGE_SIZE'
const CHECK_PEPPERONI = 'CHECK_PEPPERONI'
const CHECK_GREEN_PEPPERS = 'CHECK_GREEN_PEPPERS'
const CHECK_PINEAPPLE = 'CHECK_PINEAPPLE'
const CHECK_MUSHROOMS = 'CHECK_MUSHROOMS'
const CHECK_HAM ='CHECK_HAM'

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_FULL_NAME: 
      return {
        ...state, 
        fullName: action.payload
      }
      case CHANGE_SIZE: {
        return {
          ...state, 
          size: action.payload
        }
      }
      case CHECK_PEPPERONI: {
        return {
          ...state,
          checkPepperoni: !state.checkPepperoni,
          toppings: state.checkPepperoni
          ? state.toppings.filter(tp => tp !== action.payload)
          : [...state.toppings, action.payload]
        }
      }
      case CHECK_GREEN_PEPPERS: {
        return {
          ...state,
          checkGreenPeppers: !state.checkGreenpeppers,
          toppings: state.checkGreenpeppers
          ? state.toppings.filter(tp => tp !== action.payload)
          : [...state.toppings, action.payload]
        }
      }
      case CHECK_PINEAPPLE: {
        return {
          ...state,
          checkPineapple: !state.checkPineapple,
          toppings: state.checkPineapple
          ? state.toppings.filter(tp => tp !== action.payload)
          : [...state.toppings, action.payload]
        }
      }
      case CHECK_MUSHROOMS: {
        return {
          ...state,
          checkMushrooms: !state.checkMushrooms,
          toppings: state.checkMushrooms
          ? state.toppings.filter(tp => tp !== action.payload)
          : [...state.toppings, action.payload]
        }
      }
      case CHECK_HAM: {
        return {
          ...state,
          checkHam: !state.checkHam,
          toppings: state.checkHam
          ? state.toppings.filter(tp => tp !== action.payload)
          : [...state.toppings, action.payload]
        }
      }
      default: 
      return state
  }
}


export default function PizzaForm() {
  const [orderPizza, {
    isLoading: orderProcessing,
    error: creationError,
  }] = useOrderPizzaMutation()

  const [state, dispatch] = useReducer(reducer, initialFormState)

  const changeFullName = (e) => { 
    const { value } = e.target
    dispatch({ type: CHANGE_FULL_NAME, CHANGE_SIZE, payload: value})
  }
  const changeSize= (e) => { 
    const { value } = e.target
    dispatch({ type: CHANGE_SIZE, payload: value})
  }

  const updatePepperoniPls = (e) => {
    const { name } = e.target 
    dispatch({ type: CHECK_PEPPERONI, payload: name })
  }
  const updateGreenPeppersPls = (e) => {
    const { name } = e.target 
    dispatch({ type: CHECK_GREEN_PEPPERS, payload: name })
  }
  const updatePineapplePls = (e) => {
    const { name } = e.target 
    dispatch({ type: CHECK_PINEAPPLE, payload: name })
  }
  const updateMushroomsPls = (e) => {
    const { name } = e.target 
    dispatch({ type: CHECK_MUSHROOMS, payload: name })
  }
  const updateHamPls = (e) => {
    const { name } = e.target 
    dispatch({ type: CHECK_HAM, payload: name })
  }
  const resetForm = () => { 
    state.fullName = '',
    state.size = '',
    state.checkPepperoni = false,
    state.checkGreenpeppers = false,
    state.checkPineapple = false,
    state.checkMushrooms = false,
    state.checkHam = false,
    state.toppings = []
  }

  const OnNewPizza = e => {
    e.preventDefault()
    orderPizza({ "fullName": state.fullName, "size": state.size, "toppings": state.toppings })
    resetForm()
  }


  return (
    <form onSubmit={OnNewPizza}>
      <h2>Pizza Form</h2>
      {orderProcessing && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            value={state.fullName}
            placeholder="Type full name"
            type="text"
            onChange={changeFullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={changeSize}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={state.checkPepperoni} onChange={updatePepperoniPls}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={state.checkGreenpeppers} onChange={updateGreenPeppersPls}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state.checkPineapple} onChange={updatePineapplePls}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state.checkMushrooms} onChange={updateMushroomsPls}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state.checkHam} onChange={updateHamPls}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
