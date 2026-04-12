<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue';
import Label from './components/ui/label/Label.vue';
import NativeSelect from './components/ui/native-select/NativeSelect.vue';
import { addMonths, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import NativeSelectOption from './components/ui/native-select/NativeSelectOption.vue';

const meses: Ref<string[]> = ref([])

const form = reactive({ mes: '' })

function handleSubmit() {
    console.log('submit')
}

onMounted(() => {
    const anio = (new Date()).getFullYear()
    const mesActual = format(new Date(), 'M');
    console.log("DEBUG", mesActual)
    for (let i = 0; i < 4; i++) {
        const m = parseISO(`${anio}-${mesActual.toString().padStart(2, '0')}-01`)
        meses.value.push(format(addMonths(m, i), "MMMM yyyy", { locale: es }))
    }
    form.mes = meses.value[0]
})

</script>
<template>
    <div class="grid grid-cols-1 justify-items-center">
        <div class="w-[360px] py-8">
            <div>
                <h1 class="text-2xl font-bold">Creación de Rol</h1>
                <small>Completa el formulario para crear un rol de predicación</small>
            </div>
            <form class="mt-4" @submit.prevent="handleSubmit">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label for="email">Mes</Label>
                    <NativeSelect v-model="form.mes">
                        <NativeSelectOption v-for="mes in meses">{{ mes }}</NativeSelectOption>
                    </NativeSelect>
                </div>
            </form>
        </div>
    </div>
</template>
