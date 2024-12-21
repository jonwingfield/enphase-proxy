import { ArrowBack } from "@mui/icons-material";
import styles from "./navBar.module.css";

export interface NavBarProps {
    title: string;
    backClicked: () => void;
    rightButton?: React.ReactNode;
}

export function NavBar({ title, backClicked, rightButton }: NavBarProps) {
    return <div className={styles.navBar}>
        <div className={styles.backButton} onClick={backClicked}>
            <ArrowBack className={styles.backIcon} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rightButton}>
            {rightButton}
        </div>
    </div>;
}

export interface SubNavBarProps<T extends string> {
    items: T[];
    selectedItem: T;
    onItemClicked: (item: T) => void;
}

export function SubNavBar<T extends string>({ items, selectedItem, onItemClicked }: SubNavBarProps<T>) {
    return <div className={styles.subNavBar}>
        {items.map((item, index) => 
            <div key={index} className={`${styles.subNavBarItem} ${selectedItem === item ? styles.subNavBarItemSelected : ''}`} 
                onClick={() => onItemClicked(item)}>{item}</div>)}
    </div>;
}