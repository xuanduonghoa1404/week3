import React, {useCallback, useEffect, useState} from 'react';
import Router from 'next/router';
import TableDevice from "../Components/TableDevice";
import Navigator from "../Components/Navigator";
import fetch from 'isomorphic-unfetch'
import Chart from "../Components/Chart";
import AddDevice from "../Components/AddDevice";
import styles from '../styles/Navigator.module.css'
import styleDashboard from '../styles/Dashboard.module.css'
function Dashboard(props) {
    const columns = [
        {id: 1, title: "Name", accessor: "name"},
        {id: 2, title: "MAC", accessor: "mac"},
        {id: 3, title: "IP", accessor: "ip"},
        {id: 4, title: "Created Date", accessor: "date"},
        {id: 5, title: "Power Consumption", accessor: "power"},
    ];
    const [dataDevice, setDataDevice] = useState(props.data);
    const [total, setTotal] = useState(props.total);
    const [xValues, setXValues] = useState(props.xValues);
    const [yValues, setYValues] = useState(props.yValues);
    const [color, setColor] = useState(props.color);

    async function addDevice() {
        const res = await fetch('http://localhost:3002/device')
        const data = await res.json();
        let total = 0;
        let xValues = []
        let yValues = []
        let color = []
        data.forEach((element) => {
            total += element.power;
            xValues.push(element.name)
            yValues.push(element.power);
            color.push("#" + Math.floor(Math.random() * 16777215).toString(16));
        });
        setTotal(total)
        setXValues(xValues)
        setYValues(yValues)
        setColor(color)
        setDataDevice(data)
    }

    // let total= 0;
    // const calculatorTotal = useCallback(() => {
    //     dataDevice.forEach((element) => {
    //         total += element.power;
    //     });
    //     return total
    // }, [dataDevice])

    const component = <>
        <div className={styles.cardTable}>
            <TableDevice columns={columns} data={dataDevice} name={'device'} total={total}/>

        </div>
        {/*<div className={styleDashboard.containerChart}>*/}
        {/*    */}
        {/*</div>*/}
    </>
    const componentChart = <>
        <div className={styleDashboard.cardChart}>
            <div className={styleDashboard.row} >
                <div className={styleDashboard.col6 + ' ' + styleDashboard.colS12}>
                    <Chart data={dataDevice} xValues={xValues} yValues={yValues} color={color}/>
                </div>
                <div className={styleDashboard.col6 + ' ' + styleDashboard.colS12}>
                    <AddDevice getData={addDevice}/>
                </div>
                {/*<button onClick={addDevice}>hihi*/}

                {/*</button>*/}
            </div>
        </div>
    </>
    return (
        <>
            <Navigator componentChart={componentChart} component={component} active={'Dashboard'}/>
            {/*<TableDevice columns={columns} data={props.data}/>*/}
            {/*<Chart data={props.data} name={'Chart'}/>*/}
        </>
    );
}

Dashboard.getInitialProps = async function () {
    const res = await fetch('http://localhost:3002/device')
    const data = await res.json()
    let total = 0;
    let xValues = []
    let yValues = []
    let color = []
    data.forEach((element) => {
        total += element.power;
        xValues.push(element.name)
        yValues.push(element.power);
        color.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    });
    return {
        data: data,
        total: total,
        xValues: xValues,
        yValues: yValues,
        color: color
    }
}
export default Dashboard