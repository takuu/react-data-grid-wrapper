import React from 'react';
import { render } from 'react-dom';
import DataTable, { createDataTableObject } from '../src/index';
import SimpleTable from './SimpleTable';
import UpdateableTable from './UpdateableTable';
import CustomTable from './CustomTable';

const columns = [
    { key: 'FirstName', name: 'First Name', sortable: true },
    { key: 'LastName', name: 'Last Name', sortable: true },
    { key: 'Title', name: 'Title', sortable: true }
];

const editableColumns = [
    { key: 'FirstName', name: 'First Name', sortable: true, editable: true },
    { key: 'LastName', name: 'Last Name', sortable: true, editable: true },
    { key: 'Title', name: 'Title', sortable: true, editable: true }
];

let dataList = [
    {FirstName: 'John', LastName: 'Snow', Title: 'King of the North'},
    {FirstName: 'John', LastName: 'Smith', Title: 'No ones name ever'},
    {FirstName: 'John', LastName: 'Doe', Title: 'Sample License plate'},
];
function callUpdate(row, keyName, index) {
    console.log(row, keyName, index);
    // dataList[index][keyName] = row[keyName];
    // This gets called on table update
}

render(
    <div>
        <h2>Basic Usage</h2>
        <SimpleTable
            dataList={dataList}
            columns={columns}
        />
        <h2>Updating Data</h2>
        <UpdateableTable
            dataList={dataList}
            columns={columns}
        />
        <h2>Custom columns Implementation</h2>
        <CustomTable
            dataList={dataList}
        />
    </div>,
    document.getElementById('react-content')
);