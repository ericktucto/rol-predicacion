<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { horariosDefault, str2Time, type Time } from '../../data';
import { MinusIcon, PlusIcon } from 'lucide-vue-next';
import DrawerClose from '../ui/drawer/DrawerClose.vue';

const emit = defineEmits<{
    selected: [Time]
}>()

const horas = ref(horariosDefault)
const time = reactive<Time>({
    hora: 1,
    minute: 0,
    amPm: 'am',
})

function addHours() {
    if (time.hora == 12) {
        return;
    }
    time.hora++
}
function subHours() {
    if (time.hora == 1) {
        return;
    }
    time.hora--
}
function addMinutes() {
    if (time.minute == 50) {
        time.minute = 0
        return;
    }
    time.minute += 10
}
function subMinutes() {
    if (time.minute == 0) {
        time.minute = 50
        return;
    }
    time.minute -= 10
}

onMounted(() => {
    const t = str2Time(horariosDefault[0])
    time.hora = t.hora
    time.minute = t.minute
    time.amPm = t.amPm
})

</script>
<template>
    <Drawer>
        <DrawerTrigger as-child>
            <Button class="flex-1">
                <PlusIcon />
                Elige un horario
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div class="mx-auto w-[360px] py-4">
                <h3 class="text-xl font-bold mb-4">Horas predefinidas</h3>
                <div class="flex gap-2 w-full horarios">
                    <DrawerClose v-for="hora in horas">
                        <Button class="w-full" @click="$emit('selected', str2Time(hora))">{{ hora
                        }}</Button>
                    </DrawerClose>
                </div>
                <hr class="my-4">
                <h3 class="text-xl font-bold mb-4">Hora personalizada</h3>
                <div class="grid grid-cols-[120px_120px_120px] justify-items-center my-4">
                    <Button class="rounded-full" @click="addHours">
                        <PlusIcon />
                    </Button>
                    <Button class="rounded-full" @click="addMinutes">
                        <PlusIcon />
                    </Button>
                    <div></div>
                    <div class="text-[48px]">{{ time.hora.toString().padStart(2, '0') }}</div>
                    <div class="text-[48px]">{{ time.minute.toString().padStart(2, '0') }}</div>
                    <div class="grid gap-2">
                        <Button :variant="time.amPm == 'am' ? 'default' : 'outline'" @click="time.amPm = 'am'">
                            AM
                        </Button>
                        <Button :variant="time.amPm == 'pm' ? 'default' : 'outline'" @click="time.amPm = 'pm'">
                            PM
                        </Button>
                    </div>
                    <Button class="rounded-full" @click="subHours">
                        <MinusIcon />
                    </Button>
                    <Button class="rounded-full" @click="subMinutes">
                        <MinusIcon />
                    </Button>
                    <div></div>
                    <div class="flex gap-2 w-full mt-4 col-span-3 horarios">
                        <DrawerClose>
                            <Button class="w-full" @click="$emit('selected', time)">Escoger este horario</Button>
                        </DrawerClose>
                    </div>
                </div>
            </div>
        </DrawerContent>
    </Drawer>
</template>
<style>
.horarios button {
    flex: 1;
}
</style>
