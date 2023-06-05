<script setup lang="ts">
import {
  PropType,
  computed,
} from "vue";
// interfaces
import { GuitarInterface } from "../interfaces/guitar.interface";

const props = defineProps({
  guitar: {
    type: Object as PropType<GuitarInterface>,
    required: true,
  },
});

defineEmits(["add-to-cart"]);

const imageUrl = computed(() => {
  return `/img/${props.guitar.image}.jpg`;
});
</script>

<template>
  <div
    class="col-md-6 col-lg-4 my-4 row align-items-center"
  >
    <div class="col-4">
      <img
        class="img-fluid"
        :src="imageUrl"
        :alt="guitar.name"
      />
    </div>
    <div class="col-8">
      <h3
        class="text-black fs-4 fw-bold text-uppercase"
      >
        {{ guitar.name }}
      </h3>
      <p>
        {{ guitar.description }}
      </p>
      <p
        class="fw-black text-primary fs-3"
      >
        ${{ guitar.price }}
      </p>
      <button
        type="button"
        class="btn btn-dark w-100"
        @click="
          $emit('add-to-cart', guitar)
        "
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
