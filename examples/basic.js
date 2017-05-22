import React from 'react';
import { render } from 'react-dom';
import DataTable, { createDataTableObject } from '../src/index';


// var sound = "http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded";
var sound = "http://www.noiseaddicts.com/samples_1w72b820/2534.mp3";

const columns = [
    { key: 'FirstName', name: 'First Name', sortable: true },
    { key: 'LastName', name: 'Last Name', sortable: true },
    { key: 'Title', name: 'Title', sortable: true }
];

const dataList = [
    {FirstName: 'John', LastName: 'Snow', Title: 'King of the North'},
    {FirstName: 'John', LastName: 'Smith', Title: 'No ones name ever'},
    {FirstName: 'John', LastName: 'Doe', Title: 'Sample License plate'},
];
function callUpdate(row, keyName, index) {
    console.log(row, keyName, index);
    // This gets called on table update
}


render(
    <div>
        <h2>Basic Usage</h2>
        <DataTable
            rows={dataList}
            columns={columns}
        />
        <h2>Load Data</h2>
        <DataTable
            rows={dataList}
            columns={columns}
            onUpdate={callUpdate}
        />
        <h2>Custom columns Implementation</h2>
        <DataTable
            rows={createDataTableObject(dataList)}
            columns={columns}
            onUpdate={callUpdate}
        />


    </div>,
    document.getElementById('react-content')
);