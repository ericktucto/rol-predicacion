<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

defineProps<{
    titulo: string,
    opciones: string[],
}>()
const emit = defineEmits<{
    selected: [string]
}>()

const t = ref('')

function handleElegir() {
    emit('selected', t.value.toUpperCase())
    t.value = ''
}
</script>
<template>
    <Drawer>
        <DrawerTrigger as-child>
            <slot></slot>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>{{ titulo }}</DrawerTitle>
                <DrawerDescription>Para elegir tienes que escribir y luego pulsar el botón elegir.</DrawerDescription>
            </DrawerHeader>
            <div class="mx-auto w-[360px] p-4">
                <h3 class="text-xl font-bold mb-4">{{ titulo }}</h3>
                <div class="flex gap-2">
                    <Input class="uppercase" v-model="t" />
                    <DrawerClose>
                        <Button @click="handleElegir">Elegir</Button>
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
