import styles from './styles.module.scss';
import {FC, HTMLAttributes} from "react";

const Loading: FC<HTMLAttributes<HTMLSpanElement>> = ({...props}) => {
    return (
        <span {...props} className={styles.loading}></span>
    );
};

export default Loading;