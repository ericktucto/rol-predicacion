<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue';
import { Label } from './components/ui/label';
import { NativeSelect, NativeSelectOption } from './components/ui/native-select';
import { diasDefault } from './data';
import { Input } from './components/ui/input';
import TurnoForm from './components/organisms/TurnoForm.vue';
import { Button } from './components/ui/button';
import { PlusIcon } from 'lucide-vue-next';
import type { TurnoSchema } from './models/turno';
import DiaPredicacionForm from './components/organisms/DiaPredicacionForm.vue';

const dias: Ref<string[]> = ref([])

type DiaType = {
    fecha: string
    turnos: TurnoSchema[]
}
type FormType = {
    titulo: string
    dias: DiaType[]
}

const form = reactive<FormType>({
    titulo: '',
    dias: [
    ]
})

function handleAgregarDia() {
    form.dias.push({
        fecha: dias.value[0] ?? '',
        turnos: []
    })
}

function handleBorrarDia(index: number) {
    form.dias.splice(index, 1)
}

function handleSubmit() {
    console.log('submit')
}

onMounted(() => {
    dias.value = diasDefault()
})
/*
*/

</script>
<template>
    <div class="grid grid-cols-1 justify-items-center">
        <div class="w-[360px] py-8 px-4">
            <div>
                <h1 class="text-2xl font-bold">Creación de Rol</h1>
                <small>Completa el formulario para crear un rol de predicación</small>
            </div>
            <div class="grid gap-2 mt-4">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label for="title">Título</Label>
                    <Input type="text" name="title" v-model="form.titulo" />
                </div>
                <hr class="my-4">
                <div v-for="(_, index) in form.dias" class="grid w-full max-w-sm items-center gap-1.5 diafield">
                    <DiaPredicacionForm :dias="dias" v-model="form.dias[index]" @delete="handleBorrarDia(index)" />
                </div>
                <Button :class="[form.dias.length > 0 ? 'mt-4' : '']" @click="handleAgregarDia">
                    <PlusIcon />
                    Agregar dia de predición
                </Button>
            </div>
        </div>
    </div>
</template>
<style>
.diafield div {
    width: 100%;
}
</style>
