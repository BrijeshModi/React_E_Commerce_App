import Button from '@material-ui/core/Button';

import {CartItemType} from '../App';

import Wrapper from './Product.styles';

type Props = {
  product: CartItemType;
  handleAddToBasket: (clickedproduct: CartItemType) => void;
};

const Product: React.FC<Props> = ({ product, handleAddToBasket }) => (
  <Wrapper>
    <img src={product.image} alt={product.title} />
    <div>
      <h3>{product.title}</h3>
      <h3>£{product.price}</h3>
    </div>
    <Button onClick={() => handleAddToBasket(product)}>Add to Basket</Button>
  </Wrapper>
);

export default Product;

