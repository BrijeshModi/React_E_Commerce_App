
import   { Wrapper } from './Basket.styles';
import { CartItemType } from '../App';

import BasketItem from '../BasketItem/BasketItem';

type Props = {
  basketItems: CartItemType[];
  addToBasket: (clickedItem: CartItemType) => void;
  removeFromBasket: (id: number) => void;
};

const Basket: React.FC<Props> = ({ basketItems, addToBasket, removeFromBasket}) => {
  
      const calculateTotal = (elements: CartItemType[]) =>
    elements.reduce((ack: number, element) => ack + element.itemTotal * element.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {basketItems.length === 0 ? <p>No items in cart.</p> : null}
      {basketItems.map(item => (
        <BasketItem
          key={item.id}
          item={item}
          addToBasket={addToBasket}
          removeFromBasket={removeFromBasket}
        />
      ))}
      <h2>Total: £{calculateTotal(basketItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Basket;