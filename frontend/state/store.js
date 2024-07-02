import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import filtersReducer from './filters'

export const resetStore = () => configureStore({
  reducer: {
    filters: filtersReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
  ),
})

export const store = resetStore()
