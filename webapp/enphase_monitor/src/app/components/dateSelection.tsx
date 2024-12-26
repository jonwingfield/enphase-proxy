import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styles from './dateSelection.module.css';

interface DateSelectionProps {
    date: Date;
    setDate: (date: Date) => void;
    excludeToday?: boolean;
}

export default function DateSelection({ date, setDate, excludeToday }: DateSelectionProps) {
    return  (
        <div className={styles.datePicker}>
            <button className={styles.datePickerButton}
                onClick={() => {
                    const d = new Date(date);
                    d.setDate(d.getDate() - 1);
                    setDate(d);
                }}
            ><KeyboardArrowLeft /></button>
            <input
                type="date"
                className={styles.datePickerInput}
                onChange={(e) => {
                    const d = e.target.value ? new Date(e.target.value + "T12:00:00Z") : new Date();
                    setDate(d);
                }}
                value={date.toISOString().split('T')[0]}
            />
            
            <button className={styles.datePickerButton}
                onClick={() => {
                    const d = new Date(date);
                    d.setDate(d.getDate() + 1);
                    setDate(d);
                }}
                disabled={date.getTime() >= (!excludeToday ? new Date().setHours(0,0,0,0) : new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,0,0))}
            ><KeyboardArrowRight /></button>
        </div>
    )
                    

}