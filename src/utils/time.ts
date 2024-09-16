const decimal = (value: number) => Number (value.toFixed (2))
const DUR = 4

//@ts-ignore
function getBaseLog (x, y) {
    return Math.log (y) / Math.log (x)
}
//@ts-ignore
export const getSecondsByAltitude = (altitude) => {
    if(altitude==0)
        return 0
   // Replace with the actual duration constant if different

    // Calculate stage
    const stage = Math.floor(Math.log2(altitude));

    // Calculate multiplier
    const mult = Math.pow(2, stage);

    // Calculate part
    const part = (altitude - mult) / mult;

    // Calculate time
    const time = part * DUR;

    // Calculate total time in seconds
    const totalTimeSec = (stage * DUR) + time;

    return totalTimeSec;
};
export const sleep = async (time: number) =>
    new Promise (resolve =>
        setTimeout (resolve, time),
    )
export const getAltitudeBySeconds = (totalTimeSec: number) => {
    const total = decimal (totalTimeSec)


    const stage = Math.floor (total / DUR)

    const time = decimal (total - ( ( stage ) * DUR ))
    const part = decimal (time / DUR)
    const mult = Math.pow (2, stage)
    const diff = part * mult
    const value = mult + diff

    return Number (value.toFixed (2))
}


//@ts-ignore
globalThis.getAltitudeByTime=getAltitudeBySeconds
export const getLocalStorageNumberOr = (key: string, defaultValue: number = 0) => {
    const storedValue = localStorage.getItem (key)
    const storedNumber = Number (storedValue)
    return isNaN (storedNumber) ? defaultValue
                                : storedNumber

}
//@ts-ignore
globalThis.getTimeByAltitude=getSecondsByAltitude
