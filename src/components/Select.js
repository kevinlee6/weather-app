import React from 'react';

const Select = props => (
    <select id='select' defaultValue='city' onChange={props.handleSelect}>
        <option id='select-city' value='city'>City / Country</option>
        <option id='select-zip' value='zip'>Zipcode</option>
    </select>
)

export default Select;