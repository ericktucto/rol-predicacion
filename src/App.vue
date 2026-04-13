<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue';
import { Label } from './components/ui/label';
import { NativeSelect, NativeSelectOption } from './components/ui/native-select';
import { diasDefault } from './data';
import { Input } from './components/ui/input';
import TurnoForm from './components/organisms/TurnoForm.vue';

const dias: Ref<string[]> = ref([])

const form = reactive({
    titulo: '',
    dia: '',
})

function handleSubmit() {
    console.log('submit')
}

onMounted(() => {
    dias.value = diasDefault()
    form.dia = dias.value[0]
})

</script>
<template>
    <div class="grid grid-cols-1 justify-items-center">
        <div class="w-[360px] py-8">
            <div>
                <h1 class="text-2xl font-bold">Creación de Rol</h1>
                <small>Completa el formulario para crear un rol de predicación</small>
            </div>
            <form class="grid gap-2 mt-4" @submit.prevent="handleSubmit">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label for="title">Título</Label>
                    <Input type="text" name="title" v-model="form.titulo" />
                </div>
                <hr class="my-4">
                <div class="grid w-full max-w-sm items-center gap-1.5 diafield">
                    <Label for="day">Dia</Label>
                    <NativeSelect v-model="form.dia">
                        <NativeSelectOption v-for="dia in dias">{{ dia }}</NativeSelectOption>
                    </NativeSelect>
                </div>
                <TurnoForm />
            </form>
        </div>
    </div>
</template>
<style>
.diafield div {
    width: 100%;
}
</style>
