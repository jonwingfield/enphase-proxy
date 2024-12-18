interface WattHours {
    today: number;
    yesterday: number;
    week: number;
}

interface Watts {
    now: number;
    nowUsed: number;
    max: number;
}

interface LastReading {
    eid: number;
    interval_type: number;
    endDate: number;
    duration: number;
    flags: number;
    flags_hex: string;
    joulesProduced: number;
    acVoltageINmV: number;
    acFrequencyINmHz: number;
    dcVoltageINmV: number;
    dcCurrentINmA: number;
    channelTemp: number;
    pwrConvErrSecs: number;
    pwrConvMaxErrCycles: number;
    joulesUsed: number;
    leadingVArs: number;
    laggingVArs: number;
    acCurrentInmA: number;
    l1NAcVoltageInmV: number;
    l2NAcVoltageInmV: number;
    l3NAcVoltageInmV: number;
    rssi: number;
    issi: number;
}

interface Lifetime {
    createdTime?: number;
    duration?: number;
    joulesProduced?: number;
}

interface Channel {
    chanEid: number;
    created: number;
    wattHours: WattHours;
    watts: Watts;
    lastReading?: LastReading;
    lifetime?: Lifetime;
}

interface Device {
    devName: string;
    sn: string;
    active: boolean;
    modGone: boolean;
    channels: Channel[];
}

interface InverterDetailedData {
    [key: string]: Device | number; // To include "deviceCount" and "deviceDataLimit"
    deviceCount: number;
    deviceDataLimit: number;
}
