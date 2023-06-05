import { Ref } from "vue";

export interface GuitarInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartInterface
  extends GuitarInterface {
  quantity: number;
}

export interface CartProps {
  cart: Ref<CartInterface[]>;
  increaseQuantity: (
    id: number
  ) => void;
  decreaseQuantity: (
    id: number
  ) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
}

export interface InjectedProps<T> {
  _value: T;
}
