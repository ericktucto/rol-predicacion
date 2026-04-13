<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import DrawerClose from '../ui/drawer/DrawerClose.vue';

defineProps<{
    titulo: string,
    opciones: string[],
}>()
defineEmits<{
    selected: [string]
}>()

const t = ref('')
</script>
<template>
    <Drawer>
        <DrawerTrigger as-child>
            <slot></slot>
        </DrawerTrigger>
        <DrawerContent>
            <div class="mx-auto w-[360px] py-4">
                <h3 class="text-xl font-bold mb-4">{{ titulo }}</h3>
                <div class="flex gap-2">
                    <Input v-model="t" />
                    <DrawerClose>
                        <Button @click="$emit('selected', t)">Elegir</Button>
                    </DrawerClose>
                </div>
                <hr class="my-4">
                <h3 class="text-xl font-bold mb-4">Opciones predeterminadas</h3>
                <ScrollArea class="h-72">
                    <div class="grid gap-2 px-8">
                        <Button v-for="opcion in opciones" @click="t = opcion">{{ opcion }}</Button>
                    </div>
                </ScrollArea>
            </div>
        </DrawerContent>
    </Drawer>
</template>
