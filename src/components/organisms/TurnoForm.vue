<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import { puntosDefault, conductoresDefault, territorioDefault } from '@/data';
import ListDrawer from '../molecules/ListDrawer.vue';
import { MapPinIcon, MapPlusIcon, UserPlusIcon } from 'lucide-vue-next';
import { Button } from '../ui/button';
import ItemRemove from '../molecules/ItemRemove.vue';
import { Label } from '../ui/label';
import type { TurnoSchema } from '@/models/turno';

const puntos: Ref<string[]> = ref([])
const conductores: Ref<string[]> = ref([])
const territorios: Ref<string[]> = ref([])

const conductoresDisponbles = computed(() => {
    return conductores.value.filter(c => !model.value.conductores.includes(c))
})

const model = defineModel<TurnoSchema>({
    required: true
})

defineEmits<{
    delete: []
}>()

function handleRemoveConductor(index: number) {
    model.value.conductores.splice(index, 1)
}

onMounted(() => {
    puntos.value = puntosDefault
    territorios.value = territorioDefault
    conductores.value = conductoresDefault
})
</script>
<template>
    <div>
        <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label class="font-bold">Horario</Label>
            <ItemRemove class="flex" :text="modelValue.horario" @remove="$emit('delete')" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 diafield mb-4">
            <Label class="font-bold">Territorio</Label>
            <ItemRemove :class="modelValue.territorio.trim() ? 'flex' : 'hidden'" :text="modelValue.territorio"
                @remove="modelValue.territorio = ''" />
            <div :class="[modelValue.territorio.trim() ? 'hidden' : 'flex']">
                <ListDrawer titulo="Elige un territorio" :opciones="territorios"
                    @selected="modelValue.territorio = $event">
                    <Button class="flex-1">
                        <MapPlusIcon />
                        Elegir un territorio
                    </Button>
                </ListDrawer>
            </div>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 diafield mb-4">
            <Label for="day" class="font-bold">Punto de reunión</Label>
            <ItemRemove :class="modelValue.punto.trim() ? 'flex' : 'hidden'" :text="modelValue.punto"
                @remove="modelValue.punto = ''" />
            <div :class="[modelValue.punto.trim() ? 'hidden' : 'flex']">
                <ListDrawer titulo="Elige un punto de reunión" :opciones="puntos" @selected="modelValue.punto = $event">
                    <Button class="flex-1">
                        <MapPinIcon />
                        Elegir un punto
                    </Button>
                </ListDrawer>
            </div>
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5 diafield">
            <Label class="font-bold">Conductor</Label>
            <div class="grid gap-2">
                <ItemRemove v-for="(c, index) in modelValue.conductores" class="flex" :text="c"
                    @remove="handleRemoveConductor(index)" />
            </div>
            <ListDrawer titulo="Elige un punto de reunión" :opciones="conductoresDisponbles"
                @selected="modelValue.conductores.push($event)">
                <Button>
                    <UserPlusIcon />
                    Agregar conductor
                </Button>
            </ListDrawer>
        </div>
    </div>
</template>
