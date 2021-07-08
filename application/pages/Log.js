import React, {useState} from 'react';
import Router from 'next/router';
import TableDevice from "../Components/TableDevice";
import TableLog from "../Components/TableLog";
import fetch from "isomorphic-unfetch";
import Navigator from "../Components/Navigator";
import styles from "../styles/Navigator.module.css";
import stylesTable from "../styles/Table.module.css";
import stylesLog from "../styles/Log.module.css";

function Log(props) {
    const columns = [
        {id: 1, title: "Device ID", accessor: "device_id"},
        {id: 2, title: "Name", accessor: "name"},
        {id: 3, title: "Action", accessor: "action"},
        {id: 4, title: "Date", accessor: "date"},
    ];
    const [dataLog, setDataLog] = useState(props.data);
    const [search, setSearch] = useState('')

    async function searchLogs(e) {
        const res = await fetch('http://localhost:3002/log?search=' + search)
        const data = await res.json();
        setDataLog(data)
    }

    const component = <>
        {/*<Navigator/>*/}
        <div className={stylesLog.searchDiv}>
            <h3>
                Action Logs
            </h3>

        </div>
        <div className={styles.cardTable}>
            <div>
                <div className={stylesLog.row}>
                    <div className={stylesLog.col + ' ' + stylesLog.col4 + ' ' + stylesLog.colS10}>
                        <input type="text" className={stylesLog.formControl} id="search"
                               onChange={(e) => setSearch(e.target.value)} placeholder="Search"/>
                    </div>
                    <div className={stylesLog.col + ' ' + stylesLog.col4 + ' ' + stylesLog.colS2}>
                        <button type="button" onClick={searchLogs} className={stylesLog.searchButton} id="searchButton">
                            <i className="fas fa-search"></i>&nbsp;<span className={stylesLog.label}>Search</span>
                        </button>
                    </div>
                </div>


            </div>
            <TableLog columns={columns} data={dataLog} name={'log'}/>
            {/*<div className={stylesTable.pagination}/>*/}

        </div>
    </>
    return (
        <>
            <Navigator component={component} active={'Log'}/>
        </>
    );
}

Log.getInitialProps = async function () {
    const res = await fetch('http://localhost:3002/log')
    const data = await res.json()
    return {
        data: data
    }
}
export default Log