import React from 'react'
import { useGetHistoryQuery } from '../state/pizzaApi'
import { useDispatch, useSelector } from 'react-redux'
import { selectSizeFilter } from '../state/filters' 


export default function OrderList() {
  const { data: history, 
    isFetching: historyFetching, 
    isLoading: historyLoading,
    error: historyError,
   } = useGetHistoryQuery()

  const orders = history || []
  const sizes = ['All', 'S', 'M', 'L']
  const currentSize = useSelector(st => st.filters.currentSize)
  const dispatch = useDispatch()
  console.log(orders)

  return (
    <div id="orderList">
      <h2>Pizza Orders {(
        historyFetching ||
        historyLoading 
      ) && 'loading....'} 
      {
        historyError && historyError.data.message
      }</h2>
      <ol>
        {
          orders.map((order, index) => {
            return (
              <li key={index}>
                <div>
                  <span>{order.customer} ordered a size {order.size} with {order.toppings.length} toppings</span>
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          sizes.map(size => {
            const className = `button-filter${size === currentSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => {
                dispatch(selectSizeFilter(size))
              }}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
