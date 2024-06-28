import React from 'react'
import { useGetHistoryQuery } from '../state/pizzaApi'

export default function OrderList() {
  const { data: history } = useGetHistoryQuery()
  const orders = history || []
  console.log(orders)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
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
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
