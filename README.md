> ##  Realizar o build e a execução do projet
*  Para instalar as depedências você pode executar

      npm install ou yarn

Para iniciar a aplicação você pode executa npm start ou yarn start

Após iniciar a aplicação, abre um "menu" deve ser inserido a opção desejada
1 = CREATE ORDER or ADD ORDER ITEM or REMOVE ORDER ITEM or CHECKOUT ORDER
2 = LIST ORDERS
3 = LIST PRODUCTS

ou "sair" para encerrar a aplicação.

*  Criar pedido
A entrada deve ser um objeto.
exempo:
{ "action": "CREATE_ORDER", "order_id": 1 }

*  Adicionar produto ao pedido
exempo:
{ "action": "ADD_ORDER_ITEM", "order_id": 1, "product_id": 1 }

* Remover produto do pedido
exempo:
{ "action": "REMOVE_ORDER_ITEM", "order_id": 1, "product_id": 1 }

*  Finalizar pedido
exempo:
{ "action": "CHECKOUT_ORDER", "order_id": 1 }

* Operações simultâneas
A entrada deve ser um array de objetos.

exempo:
[{ "action": "CREATE_ORDER", "order_id": 1 },{ "action": "ADD_ORDER_ITEM", "order_id": 1, "product_id": 1 },{ "action": "CREATE_ORDER", "order_id": 2 },{ "action": "ADD_ORDER_ITEM", "order_id": 2, "product_id": 2 },{ "action": "CHECKOUT_ORDER", "order_id": 1 },{ "action": "CHECKOUT_ORDER", "order_id": 2 }]

> ##  Executar os tests
* Para executar testes na aplicação insira npm test ou yarn test

