export async function getPvWattsData(date: Date): Promise<any> {
    const response = await fetch(
        `https://developer.nrel.gov/api/pvwatts/v8.json?` +
        `api_key=${process.env.PVWATTS_API_KEY}` +
        `&lat=28.5383` +
        `&lon=-81.3792` +
        `&date=${date.toISOString().split('T')[0]}` +
        `&system_capacity=11.4` +  // System size in kW (example: 4 kW system)
        `&azimuth=90` +        // South-facing
        `&tilt=27` +            // 20-degree tilt
        `&array_type=1` +       // Fixed roof mount
        `&module_type=1` +      // Standard module type
        `&losses=14`            // Default losses percentage
    );
    const data = await response.json();
    return data;
}

export async function getPvWattsDataClient(date: Date): Promise<any> {
    const data = await fetch(`/api/pvwatts?date=${date.toISOString().split('T')[0]}`);
    return data.json();
}

const headers = ['Month', 'Day', 'Hour', 'Beam Irradiance (W/m^2)', 'Diffuse Irradiance (W/m^2)', 'Total Irr', 'Ambient Temperature (C)', 'Wind Speed (m/s)', 'Plane of Array Irradiance (W/m^2)', 'Cell Temperature (C)', 'DC Array Output (W)', 'AC System Output (W)', 'Including Shade', 'Scaled For System', 'Better Shade Calc', 'Scaled 2', 'Diff', 'Ideal', 'Shaded Daily Output (W)', 'Ideal Daily Output (W)', 'Percentage', 'SAM Model Output (kW)', 'SAM Model Output (W)', 'SAM Daily Output (W)'] as const;
export type Header = typeof headers[number];

export async function getAllCsvData() {
    const response = await fetch('/pvwatts_1kw_east.csv');
    const data = await response.arrayBuffer();
    const csv = new TextDecoder().decode(data);
    const rows = csv.split('\n');
    const headers = rows[0].split(',').map(x => x.trim()) as Header[];
    const datum = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((acc, header, index) => {
            acc[header] = parseFloat(values[index]);
            return acc;
        }, {} as { [key in Header]: number });
    });
    return datum;
}

export async function getDailyData(date: Date) {
    const datum = await getAllCsvData();

    const monthData = datum.filter(x => x.Month === date.getMonth() + 1);
    const monthDays = monthData.reduce((acc, x) => {
        acc[x.Day-1] = acc[x.Day-1] || { total: 0, diff: Math.abs(x.Day - date.getDate()), Day: x.Day };
        acc[x.Day-1].total += x["SAM Model Output (kW)"] * 1000;
        return acc;
    // sort by total, but penalize for days further away from the target
    }, [] as { total: number, diff: number, Day: number }[]).sort((a, b) => Math.max(10-b.diff, 1) * b.total - Math.max(10-a.diff, 1) * a.total);

    const result =  monthData.filter(x => x.Day === monthDays[0].Day);
    // Compute these because I was too lazy to do it in Excel :|
    const dailySAMOutput =  result.reduce((acc, y) => acc + y["SAM Model Output (kW)"] * 1000, 0);
    result.forEach(x => {
        x["SAM Model Output (W)"] = x["SAM Model Output (kW)"] * 1000;
        x["SAM Daily Output (W)"] = dailySAMOutput;
    });
    // console.log(result);
    return result;
}

export async function getDailySAMData() {
    const datum = await getAllCsvData();
    const monthDays = datum.reduce((acc, row) => {
        // Use the same indexing as JS Date
        acc[row.Month-1] = acc[row.Month-1] || [];
        acc[row.Month-1][row.Day] = acc[row.Month-1][row.Day] || 0;
        acc[row.Month-1][row.Day] += row["SAM Model Output (kW)"] * 1000;
        return acc;
    }, {} as { [month: number]: { [day: number]: number } }); 
    return monthDays;
}
