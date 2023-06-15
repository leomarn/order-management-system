import { listOrders } from '../../data/usecase/add_first_order_item'
import { awaitOrders } from '../../domain/usecase/order'
import { listProducts } from '../../infra/products'
import { exec, msgOptions } from '../../utils'

function executeOptions(option: any) {
  switch (option) {
    case 1:
      exec(msgOptions.ORDER.TEXT_OPERATIONS, () => { awaitOrders(msgOptions.ORDER.TEXT_RETURN) })
      return msgOptions.ORDER.TEXT_OPERATIONS
    case 2:
      exec(msgOptions.ORDER.TEXT_LIST, () => { 
        exec(msgOptions.TEXT_RETURN, () => { listOrders() })
      })
      break
    case 3:
      exec(msgOptions.PRODUCT.TEXT_LIST, () => { 
        exec(msgOptions.TEXT_RETURN, () => { listProducts() })
      })
      break
    default:
      console.log(msgOptions.TEXT_INVALID_ENTRY)
  }
}
export {
  executeOptions
}
