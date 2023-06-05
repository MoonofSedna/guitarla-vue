<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  provide,
} from "vue";
// components
import Header from "./components/Header.vue";
import Guitar from "./components/Guitar.vue";
import Footer from "./components/Footer.vue";
// data
import { db } from "./data/guitars";
// interfaces
import {
  GuitarInterface,
  CartInterface,
} from "./interfaces/guitar.interface";

const guitars = ref<GuitarInterface[]>(
  []
);
const cart = ref<CartInterface[]>([]);
const mainGuitar = ref<GuitarInterface>(
  {} as GuitarInterface
);

const minQuantity = 1;
const maxQuantity = 5;
const mainGuitarIndex = 3;

onMounted(() => {
  guitars.value = db;
  mainGuitar.value =
    db[mainGuitarIndex];
  if (localStorage.getItem("cart")) {
    cart.value = JSON.parse(
      localStorage.getItem("cart") ||
        "{}"
    );
  }
});

const findIndex = (id: number) => {
  return cart.value.findIndex(
    (item) => item.id === id
  );
};

const addToCart = (
  guitar: CartInterface
) => {
  const itemExists = findIndex(
    guitar.id
  );

  if (itemExists >= 0) {
    if (
      cart.value[itemExists].quantity <
      maxQuantity
    ) {
      cart.value[itemExists].quantity++;
    }
  } else {
    guitar.quantity = minQuantity;
    cart.value.push(guitar);
  }
};

const increaseQuantity = (
  id: number
) => {
  const item = findIndex(id);
  if (
    cart.value[item].quantity <
    maxQuantity
  ) {
    cart.value[item].quantity++;
  }
};

const decreaseQuantity = (
  id: number
) => {
  const item = findIndex(id);

  if (
    cart.value[item].quantity >
    minQuantity
  ) {
    cart.value[item].quantity--;
  }
};

const removeFromCart = (id: number) => {
  const item = findIndex(id);
  cart.value.splice(item, 1);
};

const emptyCart = () => {
  cart.value = [];
};

const saveCart = () => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart.value)
  );
};

watch(cart, saveCart, {
  deep: true,
});

provide("cart", {
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  emptyCart,
});
</script>

<template>
  <Header
    :guitar="mainGuitar"
    @add-to-cart="addToCart"
  />
  <main class="container-xl mt-5">
    <h2 class="text-center">
      Our Collection
    </h2>
    <div class="row mt-5">
      <Guitar
        v-for="guitar in guitars"
        :key="guitar.id"
        :guitar="guitar"
        @add-to-cart="addToCart"
      />
    </div>
  </main>
  <Footer />
</template>

<style scoped></style>
