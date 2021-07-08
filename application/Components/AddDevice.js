import React, {useCallback, useEffect, useState} from 'react';
import styles from '../styles/Dashboard.module.css'
import styleTable from '../styles/Table.module.css'
import Router from "next/router";
import {parse} from "@fortawesome/fontawesome-svg-core";

export default function AddDevice(props) {
    const [addError, setAddError] = useState('');
    const [name, setName] = useState('');
    const [mac, setMAC] = useState('');
    const [ip, setIP] = useState('');
    const [power, setPower] = useState(0);
    const addDevice = useCallback(() => {
        fetch('http://localhost:3002/device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                mac: mac,
                ip: ip,
                power: power
            }),
        })
            .then((r) => {
                console.log(r)
                return r;
            })
            .then((data) => {
                if (data && data.status === 404) {
                    // setLoginError(data.message);
                    setAddError('Please try again');
                } else {
                    props.getData()
                }
            });
    }, [name, mac, ip, power]);

    return (
        <div className={styles.cardAdd}>
            <h4>Add device</h4>
            <form action="#" id="deviceform">
                <input
                    type="text"
                    className={styleTable.formDevice}
                    id="name"
                    name="name"
                    placeholder="Name"
                    required="required"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className={styleTable.formDevice}
                    id="ip"
                    name="ip"
                    placeholder="IP"
                    required="required"
                    onChange={(e) => setIP(e.target.value)}

                />
                <input
                    type="text"
                    className={styleTable.formDevice}
                    id="mac"
                    name="mac"
                    placeholder="MAC"
                    required="required"
                    onChange={(e) => setMAC(e.target.value)}

                />
                <input
                    type="number"
                    className={styleTable.formDevice}
                    id="power"
                    name="power"
                    placeholder="Power Consumption (kWh)"
                    required="required"
                    onChange={(e) => setPower(parseInt(e.target.value))}

                />
                <div style={{textAlign: "center"}}>
                    <button type="button" className={styleTable.loginButton} onClick={addDevice} id="add"><i
                        className="fas fa-plus"/>&nbsp;
                        ADD DEVICE
                    </button>
                </div>
            </form>
            {addError && <span className="danger">{addError}</span>}
        </div>
        // <form action="#" id="device-form">
        //     <input
        //         type="text"
        //         id="name"
        //         name="name"
        //         placeholder="Name"
        //         required="required"
        //     />
        //     <input
        //         type="text"
        //         id="ip"
        //         name="ip"
        //         placeholder="IP"
        //         required="required"
        //     />
        //     <input
        //         type="text"
        //         id="mac"
        //         name="mac"
        //         placeholder="MAC"
        //         required="required"
        //     />
        //     <input
        //         type="number"
        //         id="power"
        //         name="power"
        //         placeholder="Power Consumption (kWh)"
        //         required="required"
        //     />
        //     <div style="text-align: center">
        //         <button type="button"  id="add"><i className="fas fa-plus"/>&nbsp;
        //             ADD DEVICE
        //         </button>
        //     </div>
        // </form>
    );
}