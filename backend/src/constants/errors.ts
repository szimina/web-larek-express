export enum errorMessage400 {
  PRODUCT_EXSISTS = 'Ошибка добавления товара. Товар с таким названием существует',
  PRODUCT_NOT_EXSISTS = 'Ошибка удаления: товар не существует',
  PRODUCT_NULL= 'Товар невозможно купить, т.к. он бесценен',
  PRODUCT_NOT_FOUND= 'Указанный товар или товары не найдены',
  ORDER_WRONG_TOTAL='Стоимость заказа не соответствует стоимости товаров',
  ORDER_UNKNOWN_ERROR='Неизвестная ошибка заказа',
}

export enum errorMessage404 {
  GENERAL_ERROR = 'Маршрут не найден',
}

export enum errorMessage409 {
  PRODUCT_EXSISTS = 'Ошибка добавления товара. Товар с таким названием существует',
}

export enum errorMessage500 {
  ERROR = 'Ошибка',
  PRODUCTS = 'Ошибка получения списка товаров'
}
