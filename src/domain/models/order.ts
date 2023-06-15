import Item from "./item"

type Order = {
  status: string
  order_id: number
  order_items: Item[]
  total_amount: number
}

export default Order