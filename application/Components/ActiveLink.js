import { useRouter } from 'next/router'
import styles from '../styles/Navigator.module.css'
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
function ActiveLink({ children, href, active }) {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} className={active === href? styles.active : ''}>
            {children}
        </a>
    )
}

export default ActiveLink
