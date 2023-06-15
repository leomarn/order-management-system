import { strictEqual } from 'node:assert'
import { after, describe, it } from 'node:test'
import app from '../../main/config/app'
import { closeOrder, createOrder, updateOrder } from './add_first_order_item'

describe('add_first_order_item', () => {
  it('ensure that orders are placed successfully', () => {
    const response = createOrder(1)

    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({"status":"OPEN","order_id":1,"order_items":[],"total_amount":0})
    )
  })

  it('ensure that items are added to the order successfully', () => {
    const response = updateOrder(1, 1, "ADD")

    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({"status":"OPEN","order_id":1,"order_items":[{"id":1,"name":"coffee","price":500,"quantity":1}],"total_amount":500})
    )
  })

  it('ensure that items are successfully removed from the order', () => {
    const response = updateOrder(1, 1, "REMOVE")

    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({"status":"OPEN","order_id":1,"order_items":[],"total_amount":0})
    )
  })

  it('ensure that an order is successfully completed', () => {
    createOrder(2)
    updateOrder(2, 1, "ADD")
    const response = closeOrder(2)
  
    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({"status":"WAITING_PAYMENT","order_id":2,"order_items":[{"id":1,"name":"coffee","price":500,"quantity":1}],"total_amount":500})
    )
  })

  it('ensure that a closed order does not change', () => {
    createOrder(3)
    updateOrder(3, 1, "ADD")
    closeOrder(3)
    const response = updateOrder(3, 1, "ADD")
  
    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({ order_id: 3, error: "ORDER_ALREADY_IN_CHECKOUT" })
    )
  })

  it('ensure that an order without items is not closed', () => {
    createOrder(4)
    const response = closeOrder(4)
  
    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({ order_id: 4, error: "ORDER_IS_EMPTY" })
    )
  })

  it('ensure that the maximum quantity of a product is not exceeded', () => {
    createOrder(5)
    
    for(let i = 0; i < 5; i++){
      updateOrder(5, 1, "ADD")
    }
    
    const response = updateOrder(5, 1, "ADD")
  
    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({ order_id: 5, error: 'MAX_PRODUCTS_REACHED' })
    )
  })

  it('ensure that the product is removed from the list if it has only one unit', () => {
    createOrder(6)
    updateOrder(6, 1, "ADD")
    
    
    const response = updateOrder(6, 1, "REMOVE")
  
    strictEqual(
      JSON.stringify(JSON.parse(response)),
      JSON.stringify({"status":"OPEN","order_id":6,"order_items":[],"total_amount":0})
    )
  })

  after(() => {
    app.close()
  })
})

console.log(`

:::::::::::::::::::: Starting tests ::::::::::::::::::::
`)
