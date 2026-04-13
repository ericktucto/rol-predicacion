<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue';
import { puntosDefault, conductoresDefault, territorioDefault } from '@/data';
import ElegirHora from '../molecules/ElegirHora.vue';
import ListDrawer from '../molecules/ListDrawer.vue';
import { MapPinIcon, MapPlusIcon, UserPlusIcon } from 'lucide-vue-next';
import { Button } from '../ui/button';
import ItemRemove from '../molecules/ItemRemove.vue';
import type { Time } from '../../data';

const puntos: Ref<string[]> = ref([])
const conductores: Ref<string[]> = ref([])
const territorios: Ref<string[]> = ref([])

interface Model {
    horario: string
    territorio: string
    punto: string
    conductores: string[]
}

const form = reactive<Model>({
    horario: '',
    territorio: '',
    punto: '',
    conductores: [],
})

function reset() {
    form.horario = ''
    form.territorio = ''
    form.punto = ''
    form.conductores = []
}

function handleSelectedHora(time: Time) {
    form.horario = `${time.hora.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${time.amPm.toLowerCase()}`
}

function handleRemoveConductor(index: number) {
    form.conductores.splice(index, 1)
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
            <Label for="day" class="font-bold" :class="[form.horario.trim() ? 'block' : 'hidden']">Horario</Label>
            <ItemRemove :class="form.horario.trim() ? 'flex' : 'hidden'" :text="form.horario" @remove="reset" />
            <div :class="[form.horario.trim() ? 'hidden' : 'flex']">
                <ElegirHora @selected="handleSelectedHora" />
            </div>
        </div>
        <template v-if="form.horario.trim()">
            <div class="grid w-full max-w-sm items-center gap-1.5 diafield mb-4">
                <Label for="day" class="font-bold">Territorio</Label>
                <ItemRemove :class="form.territorio.trim() ? 'flex' : 'hidden'" :text="form.territorio"
                    @remove="form.territorio = ''" />
                <div :class="[form.territorio.trim() ? 'hidden' : 'flex']">
                    <ListDrawer titulo="Elige un territorio" :opciones="territorios"
                        @selected="form.territorio = $event">
                        <Button class="flex-1">
                            <MapPlusIcon />
                            Elegir un territorio
                        </Button>
                    </ListDrawer>
                </div>
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 diafield mb-4">
                <Label for="day" class="font-bold">Punto de reunión</Label>
                <ItemRemove :class="form.punto.trim() ? 'flex' : 'hidden'" :text="form.punto"
                    @remove="form.punto = ''" />
                <div :class="[form.punto.trim() ? 'hidden' : 'flex']">
                    <ListDrawer titulo="Elige un punto de reunión" :opciones="puntos" @selected="form.punto = $event">
                        <Button class="flex-1">
                            <MapPinIcon />
                            Elegir un punto
                        </Button>
                    </ListDrawer>
                </div>
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 diafield">
                <Label for="day" class="font-bold">Conductor</Label>
                <div class="grid gap-2">
                    <ItemRemove v-for="(c, index) in form.conductores" class="flex" :text="c"
                        @remove="handleRemoveConductor(index)" />
                </div>
                <ListDrawer titulo="Elige un punto de reunión" :opciones="conductores"
                    @selected="form.conductores.push($event)">
                    <Button>
                        <UserPlusIcon />
                        Agregar conductor
                    </Button>
                </ListDrawer>
            </div>
        </template>
    </div>
</template>
