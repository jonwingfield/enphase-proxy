interface ProductionData {
    production: {
        type: "inverters" | "eim";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whLifetime: number;
        whToday: number;
        whLastSevenDays: number;
        vahToday: number;
        varhLeadToday: number;
        varhLagToday: number;
        rmsCurrent: number;
        rmsVoltage: number;
        reactPwr: number;
        apprntPwr: number;
        pwrFactor: number;
    }[];
    consumption: {
        type: "eim";
        measurementType: "total-consumption" | "net-consumption";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whLifetime: number;
        varhLeadLifetime: number;
        varhLagLifetime: number;
        vahLifetime: number;
        rmsCurrent: number;
        rmsVoltage: number;
        reactPwr: number;
        apprntPwr: number;
        pwrFactor: number;
        whToday: number;
        whLastSevenDays: number;
        vahToday: number;
        varhLeadToday: number;
        varhLagToday: number;
    }[];
    storage: {
        type: "acb";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whNow: number;
        state: "idle" | "charging" | "discharging";
    }[];
}

interface PanelData {
    serialNumber: string;
    lastReportDate: number;
    devType: number;
    lastReportWatts: number;
    maxReportWatts: number;
}


async function fetchProductionData(): Promise<ProductionData> {
    const response = await fetch("http://pi4:8200/production.json");
    return response.json();
}

async function fetchPanelData(): Promise<PanelData[]> {
    const response = await fetch("http://pi4:8200/api/v1/production/inverters");
    return response.json();
}

interface InfluxDBData {
    production: {
        watts: number;
        whToday: number;
        readingTime: number;
    },
    consumption: {
        watts: number;
        whToday: number;
        readingTime: number;
    };
}

async function postProductionToInfluxDB(data: InfluxDBData) {
    const timestampNs = Math.floor(data.production.readingTime * 1000 * 1000 * 1000);   
    const url = "http://pi4:8086/write?db=solar";
    console.log(`Posting to InfluxDB..., ${timestampNs}`);
    
    try {
        // Post production data
        const response = await fetch(url, {
            method: "POST",
            body: `rooftop,type=system productionWatts=${data.production.watts},consumptionWatts=${data.consumption.watts},productionWhToday=${data.production.whToday},consumptionWhToday=${data.consumption.whToday} ${timestampNs}\n`
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error posting production data: ${errorText}`);
        }

        console.log("Done posting production data");
    } catch (err) {
        console.error("Failed to post to InfluxDB:", err);
    }
}

async function postPanelDataToInfluxDB(data: PanelData[]) {
    console.log(`Posting panel data to InfluxDB...`);

    for (const panel of data) {
        const url = `http://pi4:8086/write?db=solar`;
        const timestampNs = panel.lastReportDate * 1000 * 1000 * 1000;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: `inverter,serialNumber=${panel.serialNumber} watts=${panel.lastReportWatts} ${timestampNs}\n`
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error posting panel data for ${panel.serialNumber}: ${errorText}`);
            }
        } catch (err) {
            console.error(`Failed to post panel data for ${panel.serialNumber}: ${err}`);
        }
    }

    console.log("Done posting panel data");
}


async function fetchAndPostData() {
    console.log("Fetching production data");
    fetchProductionData().then(data => {
        const production = data.production.filter(p => p.type === "eim")[0];
        const consumption = data.consumption.filter(p => p.measurementType === "total-consumption")[0];
        postProductionToInfluxDB({
            production: {
                watts: production.wNow,
                whToday: production.whToday,
                readingTime: production.readingTime
            },
            consumption: {
                watts: consumption.wNow,
                whToday: consumption.whToday,
                readingTime: consumption.readingTime
            }
        });
    });
    console.log("Fetching panel data");
    fetchPanelData().then(data => {
       postPanelDataToInfluxDB(data);
    });
}

fetchAndPostData();
setInterval(fetchAndPostData, 60 * 1000);