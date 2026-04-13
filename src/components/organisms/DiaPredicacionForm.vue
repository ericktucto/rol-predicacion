<script setup lang="ts">
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import TurnoForm from './TurnoForm.vue';
import type { AcceptableValue } from 'reka-ui';
import { TrashIcon } from 'lucide-vue-next';
import type { TurnoSchema } from '@/models/turno';
import ElegirHora from '../molecules/ElegirHora.vue';
import { time2Str, type Time } from '@/lib/time';
import CardFooter from '../ui/card/CardFooter.vue';

defineProps<{
    dias: string[],
}>()
defineEmits<{
    delete: []
}>()
const model = defineModel<{
    fecha: string
    turnos: TurnoSchema[]
}>({
    required: true
})

function handleEliminarTurno(index: number) {
    model.value.turnos.splice(index, 1)
}

function handleUpdateDia(value: AcceptableValue) {
    model.value.fecha = typeof value === 'string' ? value : ''
}
function handleAgregarTurno(time: Time) {
    const t: TurnoSchema = {
        horario: time2Str(time),
        territorio: '',
        punto: '',
        conductores: []
    }
    model.value.turnos.push(t)
}

</script>

<template>
    <Card class="w-full max-w-sm">
        <CardHeader>
            <div class="flex">
                <Label>Dia</Label>
                <Button variant="destructive" size="sm" class="rounded-full ml-auto" @click="$emit('delete')">
                    <TrashIcon />
                </Button>
            </div>
            <NativeSelect :modelValue="modelValue.fecha" @update:modelValue="handleUpdateDia">
                <NativeSelectOption v-for="dia in dias">{{ dia }}</NativeSelectOption>
            </NativeSelect>
        </CardHeader>
        <CardContent class="px-0">
            <div v-for="(_, index) in modelValue.turnos"
                class="border-t py-4 px-6 grid w-full max-w-sm items-center gap-1.5 diafield">
                <TurnoForm v-model:modelValue="modelValue.turnos[index]" @delete="handleEliminarTurno(index)" />
            </div>
        </CardContent>
        <CardFooter class="border-t">
            <ElegirHora @selected="handleAgregarTurno" />
        </CardFooter>
    </Card>
</template>
