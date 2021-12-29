<script setup lang="ts">
import { ref } from 'vue';
import { sendMoney } from '../helpers/wallet';

const amount = ref<number>(0)
const address = ref<string>("")

const onSubmit = async () => {
  await sendMoney(address.value, amount.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="send-container">
    <div class="send-inputs">
      <div class="send-top-left">
        <label for="amount">Amount (lamports)</label>
      </div>
      <div class="send-mid-left">
        <label for="address">Address</label>
      </div>
      <div class="send-top-right">
        <input type="text" v-model="amount" />
      </div>
      <div class="send-mid-right">
        <input type="text" v-model="address" />
      </div>
      <div class="send-bottom-right">
        <button class="send-buttons" type="submit">
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<style>
.send-container {
  max-width: 22rem;
  border: 1px solid gray;
  border-radius: 0.4rem;
  padding: 0.5rem;
}

.send-inputs {
  height: 6rem;
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.send-top-left {
  grid-column: 1;
  grid-row: 1;
}

.send-mid-left {
  grid-column: 1;
  grid-row: 2;
}

.send-top-right {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
}

.send-mid-right {
  grid-column: 2;
  grid-row: 2;
  justify-self: end;
}

.send-bottom-right {
  grid-column: 2;
  grid-row: 3;
  justify-self: end;
}
</style>