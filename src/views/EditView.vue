<script setup lang="ts">
import {useCounterStore} from "@/store/useCounterStore";

const counterStore = useCounterStore();
</script>

<template>
    <main>
        <h1>Edit</h1>
        <p>{{counterStore.count}}</p>
        <button @click="counterStore.increment">+ 1</button>
    </main>
</template>
