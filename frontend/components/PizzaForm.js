import React, { useReducer } from 'react'
import { useOrderPizzaMutation } from '../state/pizzaApi'

const initialFormState = { // suggested
    fullName: '',
    size: '',
    toppings: [
    {
      id: 1,
      checkPepperoni: false,
    },
    {
      id: 2,
      checkGreenPeppers: false,
    },
    {
      id: 3,
      checkPineapple: false,
    },
    {
      id: 4,
      checkMushrooms: false,
    },
    {
      id: 5, 
      checkHam: false,
    }
  ]
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
          ...state.toppings,
           
        }
      }
      case CHECK_GREEN_PEPPERS: {
        return {
          ...state,
          checkGreenPeppers: !state.checkGreenPeppers
        }
      }
      case CHECK_PINEAPPLE: {
        return {
          ...state,
          checkPineapple: !state.checkPineapple
        }
      }
      case CHECK_MUSHROOMS: {
        return {
          ...state,
          checkMushrooms: state.checkMushrooms
        }
      }
      case CHECK_HAM: {
        return {
          ...state,
          checkHam: !state.checkHam
        }
      }
      default: 
      return state
  }
}


export default function PizzaForm() {
  const [orderPizza] = useOrderPizzaMutation()
  const [state, dispatch] = useReducer(reducer, initialFormState)

  const changeFullName = (e) => { 
    const { value } = e.target
    dispatch({ type: CHANGE_FULL_NAME, CHANGE_SIZE, payload: value})
  }
  const changeSize= (e) => { 
    const { value } = e.target
    dispatch({ type: CHANGE_SIZE, payload: value})
  }

  const updatePepperoniPls = (id) => {
    dispatch({ type: CHECK_PEPPERONI, payload: id })
  }
  const updateGreenPeppersPls = () => {
    dispatch({ type: CHECK_GREEN_PEPPERS })
  }
  const updatePineapplePls = () => {
    dispatch({ type: CHECK_PINEAPPLE })
  }
  const updateMushroomsPls = () => {
    dispatch({ type: CHECK_MUSHROOMS })
  }
  const updateHamPls = () => {
    dispatch({ type: CHECK_HAM })
  }

  const payloadMaker = () => {
    const { 
      fullName, 
      size, 
      checkPepperoni, 
      checkGreenPeppers, 
      checkPineapple, 
      checkMushrooms, 
      checkHam } = state 
      const payload = {
        'fullName': fullName,
        'size': size,
        'toppings': [
          checkPepperoni, 
          checkGreenPeppers, 
          checkPineapple, 
          checkMushrooms, 
          checkHam
        ]

      }
  } 

  const OnNewPizza = e => {
    e.preventDefault()
    
  }

  return (
    <form onSubmit={OnNewPizza}>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>Order in progress...</div>}
      {true && <div className='failure'>Order failed: fullName is required</div>}

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
          <input data-testid="checkPepperoni" name="1" type="checkbox"   checked={state.checkPepperoni} value={state.toppings.id} onChange={updatePepperoniPls}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenPeppers" name="2" type="checkbox"  checked={state.checkGreenPeppers} value={state.toppings[1].id} onChange={updateGreenPeppersPls}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state.checkPineapple} value={state.toppings[2].id} onChange={updatePineapplePls}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state.checkMushrooms} value={state.toppings[3].id} onChange={updateMushroomsPls}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state.checkHam} value={state.toppings[4].id} onChange={updateHamPls}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
