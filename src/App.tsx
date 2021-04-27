

import {useState} from 'react';
import {useQuery} from 'react-query';

import Product from './Product/Product';
import { Wrapper, StyledButton } from './App.styles';
import Basket from './Basket/Basket';


import Grid from '@material-ui/core/Grid';
import  CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export type CartItemType ={
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  itemTotal:number;
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([] as CartItemType[]);

  const {data, isLoading, error} = useQuery<CartItemType[]>('productsList',getProducts);
  console.log(data)

  const getTotalProducts = (elements: CartItemType[]) => 
  elements.reduce((acc: number, element) => acc + element.itemTotal,0)

  const handleAddToBasket = (clickedproduct: CartItemType) => {
    setBasketItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedproduct.id);
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedproduct.id
            ? { ...item, itemTotal: item.itemTotal + 1 }
            : item
        );
      }
      return [...prev, { ...clickedproduct, itemTotal: 1}];
    });
  };
  const handleRemoveFromBasket = (id: number) => {
    
    setBasketItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.itemTotal === 1) {
            return acc
          };
          return [...acc, { ...item, itemTotal: item.itemTotal - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error In Loading Products ...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={basketOpen} onClose={() => setBasketOpen(false)}>
        <Basket 
        basketItems={basketItems}
          addToBasket={handleAddToBasket}
          removeFromBasket={handleRemoveFromBasket}
        />
      </Drawer>
      <StyledButton onClick={() => setBasketOpen(true)}>
        <Badge badgeContent={getTotalProducts(basketItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
     <Grid container spacing={3} >
        {data?.map(ele => (
          <Grid item key={ele.id} xs={12} sm={4}>
            <Product product={ele} handleAddToBasket={handleAddToBasket} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
