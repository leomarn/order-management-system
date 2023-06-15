import { closeOrder, createOrder, listOrders, updateOrder } from '../../data/usecase/add_first_order_item'
import app from '../../main/config/app'
import { awaitingEntries } from '../../main/order_management_system'
import { ImputOrder } from '../models'


const processOrder = (input: string): void => {
  try {
    let orderInputs: { action: string; order_id: number }[] = []

    if (input.trim().startsWith('{') && input.trim().endsWith('}')) {
      orderInputs = [JSON.parse(input)]
    } else {
      orderInputs = JSON.parse(input)
    }

    if (!Array.isArray(orderInputs)) {
      console.log('Entrada inválida')
      return
    }

    orderInputs.forEach((orderInput: ImputOrder) => {
      const { action, order_id } = orderInput

      if (action === 'CREATE_ORDER') {
        
      } 
      switch (action) {
        case 'CREATE_ORDER':
          createOrder(order_id)
          break
        case 'ADD_ORDER_ITEM':
          console.log('ADD ORDER ITEM')

          if (typeof orderInput.product_id !== 'undefined' && orderInput.product_id !== null) {
            updateOrder(order_id, orderInput.product_id, 'ADD')
          }
          break
        case 'REMOVE_ORDER_ITEM':
          console.log('REMOVE ORDER ITEM')
          if (typeof orderInput.product_id !== 'undefined' && orderInput.product_id !== null) {
            updateOrder(order_id, orderInput.product_id, 'REMOVE')
          }
          break
        case 'CHECKOUT_ORDER':
          console.log('CHECKOUT ORDER')
          closeOrder(order_id)
          break
        default:
          console.log('Opção inválida')
      }
    })
  } catch (error) {
    console.log('Ação inválida')
  }
}



const awaitOrders = (msg: string): void => {
  app.question(`${msg}`, (input: string) => {
    const lowercaseInput = input.toLowerCase()

    if (lowercaseInput === 'sair') {
      awaitingEntries()
    } else if (lowercaseInput === 'listar') {
      listOrders()
      awaitOrders(`${msg}`)
    } else {
      processOrder(input)
      awaitOrders(`${msg}`)
    }
  })
}

export {
  awaitOrders
}
