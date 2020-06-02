import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/images/logo@2x.png';
import styles from './login-header.module.css';

const LoginHeader: React.FC = () => {
    return (
        <header className={styles['header-wrapper']}>
            <Link to="/">
                <img className={styles.logo} src={logoImg} alt="require manager" />
            </Link>
        </header>
    )
}

export default LoginHeader;
