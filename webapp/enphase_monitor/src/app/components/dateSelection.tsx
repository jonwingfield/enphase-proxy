import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styles from './dateSelection.module.css';
import { addMonths, addDays, subDays, subMonths, format } from 'date-fns';

interface DateSelectionProps {
    date: Date;
    setDate: (date: Date) => void;
    excludeToday?: boolean;
    /**
     * A time period like "1d", "30d", "1m"
     */
    jumpPeriod?: string;
}

export default function DateSelection({ date, setDate, excludeToday, jumpPeriod = "1d" }: DateSelectionProps) {
    const isMonthJump = jumpPeriod.indexOf("m") > 0;
    const jumpPeriodValue = parseInt(isMonthJump ? jumpPeriod.replace("m", "") : jumpPeriod.replace("d", ""), 10);
    return  (
        <div className={styles.datePicker}>
            <button className={styles.datePickerButton}
                onClick={() => {
                    if (isMonthJump) {
                        setDate(subMonths(date, jumpPeriodValue));
                    } else if (jumpPeriod.indexOf("d") > 0) {
                        setDate(subDays(date, jumpPeriodValue));
                    } else {
                        console.warn("Invalid jump period: " + jumpPeriod);
                        setDate(subDays(date, 1));
                    }
                }}
            ><KeyboardArrowLeft /></button>
            {jumpPeriod !== undefined && jumpPeriod.indexOf("m") > 0 && <input type="text" value={format(date, "MMMM yyyy")} disabled />}
            {(jumpPeriod === undefined || jumpPeriod.indexOf("m") === -1) && <input
                type="date"
                className={styles.datePickerInput}
                onChange={(e) => {
                    const d = e.target.value ? new Date(e.target.value + "T12:00:00Z") : new Date();
                    setDate(d);
                }}
                value={format(date, "yyyy-MM-dd")}
                disabled={jumpPeriod !== undefined && jumpPeriod.indexOf("m") > 0}
            />}
            
            <button className={styles.datePickerButton}
                onClick={() => {
                    if (isMonthJump) {
                        setDate(addMonths(date, jumpPeriodValue));
                    } else if (jumpPeriod.indexOf("d") > 0) {
                        setDate(addDays(date, jumpPeriodValue));
                    } else {
                        console.warn("Invalid jump period: " + jumpPeriod);
                        setDate(addDays(date, 1));
                    }
                }}
                disabled={date.getTime() >= (!excludeToday ? new Date().setHours(0,0,0,0) : new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,0,0))}
            ><KeyboardArrowRight /></button>
        </div>
    )
                    

}