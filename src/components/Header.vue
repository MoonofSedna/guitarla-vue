<script setup lang="ts">
import { PropType } from "vue";
// components
import Cart from "./Cart.vue";
// interfaces
import { GuitarInterface } from "../interfaces/guitar.interface";

defineProps({
  guitar: {
    type: Object as PropType<GuitarInterface>,
    required: true,
  },
});
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div
        class="row justify-content-center justify-content-md-between"
      >
        <div class="col-8 col-md-3">
          <a href="/">
            <img
              class="img-fluid"
              src="/img/logo.svg"
              alt="imagen logo"
            />
          </a>
        </div>
        <nav
          class="col-md-6 a mt-5 d-flex align-items-start justify-content-end"
        >
          <Cart />
        </nav>
      </div>
      <div class="row mt-5">
        <div
          class="col-md-6 text-center text-md-start pt-5"
        >
          <h1 class="display-2 fw-bold">
            {{ guitar.name }}
          </h1>
          <p
            class="mt-5 fs-5 text-white"
          >
            {{ guitar.description }}
          </p>
          <p
            class="text-primary fs-1 fw-black"
          >
            ${{ guitar.price }}
          </p>
          <button
            type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5"
            @click="
              $emit(
                'add-to-cart',
                guitar
              )
            "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <img
      class="header-guitarra"
      src="/img/header_guitar.png"
      alt="imagen header"
    />
  </header>
</template>
