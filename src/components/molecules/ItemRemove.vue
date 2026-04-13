<script setup lang="ts">
import { TrashIcon } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
defineProps<{
    text: string
}>()
defineEmits(['remove'])
</script>
<template>
    <div class="justify-between items-center">
        <span>{{ text }}</span>
        <Button class="rounded-full" variant="destructive" @click="$emit('remove')">
            <TrashIcon />
        </Button>
    </div>
</template>
