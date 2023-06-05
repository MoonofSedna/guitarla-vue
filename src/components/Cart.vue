<script setup lang="ts">
import { computed, inject } from "vue";
// interfaces
import { CartProps } from "../interfaces/guitar.interface";

const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  emptyCart,
} = inject("cart") as CartProps;

const calcTotal = computed(() => {
  return cart.value.reduce(
    (acc, item) => {
      return (
        acc + item.price * item.quantity
      );
    },
    0
  );
});
</script>

<template>
  <div class="cart">
    <span class="badge">{{
      cart.length
    }}</span>
    <img
      class="img-fluid"
      src="/img/cart.png"
      alt="cart-img"
    />
    <div id="cart" class="bg-white">
      <p
        v-if="cart.length === 0"
        class="text-center m-0"
      >
        No items in cart
      </p>
      <template v-else>
        <table class="w-100 table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="guitar in cart"
              :key="guitar.id"
            >
              <td>
                <img
                  class="img-fluid"
                  :src="
                    '/img/' +
                    guitar.image +
                    '.jpg'
                  "
                  :alt="guitar.name"
                />
              </td>
              <td>
                {{ guitar.name }}
              </td>
              <td class="fw-bold">
                {{ guitar.price }}
              </td>
              <td
                class="flex align-items-start gap-4"
              >
                <button
                  type="button"
                  class="btn btn-dark"
                  @click="
                    decreaseQuantity(
                      guitar.id
                    )
                  "
                >
                  -
                </button>
                {{ guitar.quantity }}
                <button
                  type="button"
                  class="btn btn-dark"
                  @click="
                    increaseQuantity(
                      guitar.id
                    )
                  "
                >
                  +
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  type="button"
                  @click="
                    removeFromCart(
                      guitar.id
                    )
                  "
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <p class="text-end">
            Total price:
            <span class="fw-bold"
              >${{ calcTotal }}</span
            >
          </p>
          <button
            class="btn btn-dark w-100 mt-3 p-2"
            @click="emptyCart"
          >
            Empty cart
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
