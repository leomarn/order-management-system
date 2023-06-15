import { Order } from '../../domain/models'
import { listItems } from '../../utils'
import { products } from '../products'

const orders: Order[] = []

function createOrder(order_id: number) {
  const existingOrder = orders.find(order => order.order_id === order_id)
  
  if (existingOrder) {
    console.log(`Já existe um pedido com o ID ${order_id}`)
    return
  }
  const newOrder: Order = {
    status: 'OPEN',
    order_id,
    order_items: [],
    total_amount: 0,
  }

  orders.push(newOrder)

  return returnAnswer(newOrder)
}

function updateOrder(order_id: number, id: number, option: string) {
  let response: any

  const existingOrder = orders.find(order => order.order_id === order_id)
  
  if (!existingOrder) {
    console.log(`Não existe um pedido com o ID ${order_id}`)
    return
  }

  const existingProduct = products.find(product => product.id === id)

  if (!existingProduct) {
    console.log(`Não existe produto com o ID ${id}`)
    return
  }

  const order = orders.find(order => order.order_id === order_id)

  if (order && order.status === 'OPEN') {
    const existingItem = order.order_items.find(item => item.id === existingProduct.id)

    if (!existingItem) {
      if(option === 'ADD') {
        order.order_items.push({ ...existingProduct, quantity: 1 })
      }
    } else {
      if (option === 'ADD') {
        if (existingItem.quantity < 5) {
          existingItem.quantity++
        } else {
          const response: string = JSON.stringify({ order_id: order_id, error: 'MAX_PRODUCTS_REACHED' })
          console.log(response)
          return response
        }
      } else {
        if (existingItem.quantity > 0) {
          existingItem.quantity--
          if (existingItem.quantity === 0) {
            const index = order.order_items.findIndex(item => item.id === existingItem.id)
            order.order_items.splice(index, 1)
          }
        } 
      } 
    }
    
    order.total_amount = order.order_items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
    response = order
  } else {
    response = { order_id: order_id, error: "ORDER_ALREADY_IN_CHECKOUT" }
  }

  return returnAnswer(response)
}

function closeOrder(order_id: number) {
  let response: any

  const existingOrder = orders.find(order => order.order_id === order_id)

  if (!existingOrder) {
    console.log(`Não existe um pedido com o ID ${order_id}`)
    return
  }

  if (existingOrder.status === 'OPEN') {
    if(existingOrder.order_items.length > 0) {
      existingOrder.status = 'WAITING_PAYMENT'
      response = existingOrder
    } else {
      response = { order_id: order_id, error: "ORDER_IS_EMPTY" }
    }
  } else {
    response = { order_id: order_id, error: "ORDER_ALREADY_IN_CHECKOUT" }
  }

  return returnAnswer(response)
}

const returnAnswer = function(value: any): string {
  const response: string = JSON.stringify(value)
  console.log(response)
  return response
}

const listOrders = (): void => {
  listItems(orders, 'Lista de Pedidos:')
}

export {
  closeOrder, createOrder, listOrders, updateOrder
}
