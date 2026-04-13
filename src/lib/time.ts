export type Time = {
    hora: number
    minute: number
    amPm: 'am' | 'pm'
}
export function str2Time(timeString: string): Time {
    const time: Time = {
        hora: 1,
        minute: 0,
        amPm: 'am',
    }
    const splitted = timeString.split(' ')
    time.amPm = splitted[1].toLowerCase() === 'am' ? 'am' : 'pm'
    time.hora = Number(splitted[0].split(':')[0])
    time.minute = Number(splitted[0].split(':')[1])
    return time
}
export function time2Str(time: Time): string {
    return `${time.hora}:${time.minute} ${time.amPm}`.toUpperCase()
}
