"use client";
import { useEffect, useState, useMemo, Fragment } from 'react';
import { getDailySAMData } from '@/service/pvwatts';
import { fetchMultiDayProductionData } from '@/service/enphaseProduction';
import styles from './payback.module.css';
import { parse } from 'date-fns';
import { formatWatt } from '../components/useProduction';
import { NavBar, SubNavBar } from '../components/navBar';
import { useRouter } from 'next/navigation';
import { getBillingRate, useGlobalState } from '../components/GlobalStateContext';

interface MonthlyData {
    monthYear: string;
    projectedProduction: number;
    actualProduction: number;
    projectedValue: number;
    actualValue: number;
}

export default function Payback() {
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    const [displayMode, setDisplayMode] = useState<'energy' | 'savings'>('energy');
    const { globalState } = useGlobalState();
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const projectedData = await getDailySAMData();
            const actualData = await fetchMultiDayProductionData(365, 365);
            const monthlyTotals: { [key: string]: MonthlyData } = {};


            // TODO: pull this into another file and unit test
            actualData.forEach(day => {
                const monthYear = day.timestamp.toISOString().substring(0, 7);
                if (!monthlyTotals[monthYear]) {
                    monthlyTotals[monthYear] = {
                        monthYear,
                        projectedProduction: 0,
                        actualProduction: 0,
                        projectedValue: 0,
                        actualValue: 0
                    };
                }
                
                const ratePerKWh = getBillingRate(globalState, day.timestamp).ratePerKWHOver1000/100;
                const projectedDaily = projectedData[day.timestamp.getMonth()][day.timestamp.getDate()];
                monthlyTotals[monthYear].actualProduction += day.productionWatts;
                monthlyTotals[monthYear].projectedProduction += projectedDaily;
                // Calculate dollar values
                monthlyTotals[monthYear].actualValue = (monthlyTotals[monthYear].actualProduction * ratePerKWh) / 1000;
                monthlyTotals[monthYear].projectedValue = (monthlyTotals[monthYear].projectedProduction * ratePerKWh) / 1000;
            });

            // Add next 12 months of projected data
            const today = new Date();
            for (let i = 1; i <= 12; i++) {
                const futureDate = new Date(today);
                futureDate.setMonth(today.getMonth() + i);
                const monthYear = futureDate.toISOString().substring(0, 7);
                
                let monthlyProjected = 0;
                const daysInMonth = new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 0).getDate();
                for (let day = 1; day <= daysInMonth; day++) {
                    monthlyProjected += projectedData[futureDate.getMonth()][day] || 0;
                }

                const ratePerKWh = getBillingRate(globalState, futureDate).ratePerKWHOver1000/100;
                monthlyTotals[monthYear] = {
                    monthYear,
                    projectedProduction: monthlyProjected,
                    actualProduction: 0,
                    projectedValue: (monthlyProjected * ratePerKWh) / 1000,
                    actualValue: 0
                };
            }

            setMonthlyData(Object.values(monthlyTotals));
        }

        fetchData();
    }, []);

    const displayModes = ['Energy Generated', 'Savings'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <NavBar title="Payback Analysis" backClicked={() => router.back()} />
            </div>
            <div className={styles.content}>
                <SubNavBar 
                    items={displayModes} 
                    selectedItem={displayMode === 'energy' ? 'Energy Generated' : 'Savings'} 
                    onItemClicked={mode => setDisplayMode(mode === 'Energy Generated' ? 'energy' : 'savings')} 
                />
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Projected</th>
                            <th>Actual</th>
                            <th>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyData.map(month => {
                            const monthDate = parse(month.monthYear, 'yyyy-MM', new Date());

                            if (monthDate.getMonth() === new Date().getMonth() && monthDate.getFullYear() === new Date().getFullYear()) {
                                return (
                                    <Fragment key={month.monthYear}>
                                        <MonthlyRow displayMode={displayMode} month={month} />
                                        <TotalRow displayMode={displayMode} monthlyData={monthlyData} />
                                    </Fragment>
                                );
                            } else {
                                return <MonthlyRow key={month.monthYear} displayMode={displayMode} month={month} />;
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 

function MonthlyRow({ displayMode, month }: { displayMode: 'energy' | 'savings', month: MonthlyData }) {
    const monthDate = parse(month.monthYear, 'yyyy-MM', new Date());
    const isAfterCurrentDate = monthDate > new Date();
    const isCurrentMonth = monthDate.getMonth() === new Date().getMonth() && monthDate.getFullYear() === new Date().getFullYear();
    
    const projectedValue = displayMode === 'energy' ? month.projectedProduction : month.projectedValue;
    const actualValue = displayMode === 'energy' ? month.actualProduction : month.actualValue;
    const difference = actualValue - projectedValue;

    return (
        <tr key={month.monthYear}>
            <td>{monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {isCurrentMonth && <em> (to date)</em>}
            </td>
            
            <td>{displayMode === 'energy'
                ? (formatWatt(projectedValue, 0, 0) + 'h')
                : `$${projectedValue.toFixed(2)}`
            }</td>
            <td>{!isAfterCurrentDate
                ? (displayMode === 'energy'
                    ? (formatWatt(actualValue, 0, 0) + 'h')
                    : `$${actualValue.toFixed(2)}`)
                : '--'
            }</td>
            <td className={
                !isAfterCurrentDate ? (
                    difference > 0 ? styles.positive :
                        difference < 0 ? styles.negative : ''
                ) : ''
            }>
                {!isAfterCurrentDate
                    ? (displayMode === 'energy'
                        ? (formatWatt(difference, 0, 0) + 'h')
                        : `$${difference.toFixed(2)}`)
                    : ''
                }
            </td>
        </tr>
    );
}

function TotalRow({ displayMode, monthlyData }: { displayMode: 'energy' | 'savings', monthlyData: MonthlyData[] }) {
    const totals = useMemo(() => {
        const completedMonths = monthlyData.filter(month => month.actualProduction > 0);
        return {
            projectedProduction: completedMonths.reduce((sum, month) => sum + month.projectedProduction, 0),
            actualProduction: completedMonths.reduce((sum, month) => sum + month.actualProduction, 0),
            projectedValue: completedMonths.reduce((sum, month) => sum + month.projectedValue, 0),
            actualValue: completedMonths.reduce((sum, month) => sum + month.actualValue, 0),
        };
    }, [monthlyData]);

    return (
        <tr className={styles.totalRow}>
            <td><strong>Total</strong></td>
            <td>
                <strong>
                    {displayMode === 'energy'
                        ? (formatWatt(totals.projectedProduction, 0, 0) + 'h')
                        : `$${totals.projectedValue.toFixed(2)}`
                    }
                </strong>
            </td>
            <td>
                <strong>
                    {displayMode === 'energy'
                        ? (formatWatt(totals.actualProduction, 0, 0) + 'h')
                        : `$${totals.actualValue.toFixed(2)}`
                    }
                </strong>
            </td>
            <td className={
                totals.actualProduction - totals.projectedProduction > 0
                    ? styles.positive
                    : styles.negative
            }>
                <strong>
                    {displayMode === 'energy'
                        ? (formatWatt(totals.actualProduction - totals.projectedProduction, 0, 0) + 'h')
                        : `$${(totals.actualValue - totals.projectedValue).toFixed(2)}`
                    }
                </strong>
            </td>
        </tr>
    );
}