import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 50,
        backgroundColor:'#98aab6',
    },
    title: {
        textAlign: 'left',
        padding: 7,
        color:'brown',
        textTransform: 'uppercase'
    },
    table: {
        height: 450,
        overflowY: 'scroll',
        display: 'block',
        boxShadow: '0px 0px 10px black'
       
    }
}));

export default function AllCountries() {
    const [globalData, setGlobalData] = useState([{}]);

    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
            let data = await response.json();

            setGlobalData(Object.values(Object.values(data.countryitems)[0]));
            console.log(Object.values(Object.values(data.countryitems)[0]))
        }
        getData();
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <table className={classes.table}>
                <thead>
                    <tr className={classes.title}>
                        <th>Country Name</th>
                        <th>Total Cases</th>
                        <th>Active Cases</th>
                        <th>Total Deaths</th>
                        <th>Total Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {globalData.map((key, ind) => {
                        return (
                            <tr key={ind}>
                                <th className={classes.title}>
                                    {globalData[ind].title}
                                </th>
                                <td>
                                    {globalData[ind].total_cases}
                                </td>
                                <td>
                                    {globalData[ind].total_active_cases}
                                </td>
                                <td>
                                    {globalData[ind].total_deaths}
                                </td>
                                <td>
                                    {globalData[ind].total_recovered}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}