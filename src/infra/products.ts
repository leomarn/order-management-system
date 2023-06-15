import { products } from '../data/products'
import { listItems } from '../utils'

const listProducts = (): void => {
  listItems(products, 'Lista de Produtos Cadastrados:')
}

export {
  listProducts
}
