<script setup lang="ts">
import { Connection } from '@solana/web3.js';
import { onMounted, ref } from 'vue';
import Sender from './components/Sender.vue';
import List from './components/List.vue';
import { getTransactions, TransactionWithSignature } from './helpers/transactions';
import { initWallet, WalletAdapter } from './helpers/wallet';

const transactions = ref<TransactionWithSignature[]>([])
const conn = ref<Connection>()
const wall = ref<WalletAdapter>()

onMounted(async () => {
  try {
    const [connection, wallet] = await initWallet()
    if (wallet.publicKey) {
      transactions.value = await getTransactions(connection, wallet.publicKey)
    }
    console.log("transactions: ", transactions.value)
  } catch (error) {
    console.log("Error from app: ", error)
  }
})
</script>

<template>
  <h1>Send money on Solana</h1>
  <Sender />
  <List />
</template>
