
import { Wrapper } from './BasketItem.styles';
import { CartItemType } from '../App';

import Button from '@material-ui/core/Button';

type Props = {
  item: CartItemType;
  addToBasket: (clickedItem: CartItemType) => void;
  removeFromBasket: (id: number) => void;
};

const BasketItem: React.FC<Props> = ({ item, addToBasket, removeFromBasket }) => (

 <Wrapper>
  <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: £{item.price}</p>
        <p>Total: £{(item.itemTotal * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromBasket(item.id)}
        >
          -
        </Button>
        <p>{item.itemTotal}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToBasket(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
 </Wrapper>
);

export default BasketItem;