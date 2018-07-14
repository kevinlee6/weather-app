import React from 'react';

const Unit = props => (
    <form id='unit'>
        <button name='imperial' id='imperial' class='active' onClick={props.toImperial}>Imperial</button>
        <button name='metric' id='metric' onClick={props.toMetric}>Metric</button>
    </form>
)

export default Unit; 