# react-data-grid-wrapper
Wrapper around react-data-grid

## Install

```bash
$ npm install react-data-grid-wrapper --save
```

## Example

Simple Implementation
```bash
import DataTable from 'react-data-grid-wrapper';
import React from 'react';
import PropTypes from 'prop-types';


const columns = [
  { key: 'FirstName', name: 'First Name', sortable: true },
  { key: 'LastName', name: 'Last Name', sortable: true },
  { key: 'Title', name: 'Title', sortable: true }
];

class SimpleTable extends React.Component {

    render() {
        const { dataList } = this.props;
        return (
              <div>
                <DataTable
                  rows={dataList}
                  columns={columns}
                />
              </div>
        );
    }
};

SimpleTable.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object),
};

SimpleTable.defaultProps = {
  dataList: [],
};

```

Update Implementation

```bash
import DataTable, { createDataTableObject } from 'react-data-grid-wrapper';
import React from 'react';
import PropTypes from 'prop-types';

const columns = [
  { key: 'FirstName', name: 'First Name', editable: true, sortable: true },
  { key: 'LastName', name: 'Last Name', editable: true, sortable: true },
  { key: 'Title', name: 'Title', editable: true, sortable: true }
];

class UpdateableTable extends React.Component {
    constructor() {
        super();
        this.callUpdate = this.callUpdate.bind(this);
    }
    callUpdate(row, keyName, index) {
        // This gets called on table update
    }

    render() {
        return (
              <div>
                <DataTable
                  rows={dataList}
                  columns={columns}
                  onUpdate={this.callUpdate}
                />
              </div>
        );
    }
};

```

Custom columns Implementation

```bash
import DataTable, { createDataTableObject } from 'react-data-grid-wrapper';
import React from 'react';
import PropTypes from 'prop-types';


const CustomButton ({}) => {
    const { value: { context } } = this.props;
    return (
        <div>
        <button className='btn btn-default' onClick={context.customButtonClicked}>
                  {statusMap[status].label}
                  </button>
        </div>
    );
}

const columns = [
  { key: 'FirstName', name: 'First Name', editable: true, sortable: true },
  { key: 'LastName', name: 'Last Name', editable: true, sortable: true },
  { key: 'Title', name: 'Title', editable: true, sortable: true },
  { key: 'rowData', name: '', formatter: CustomButton },
];


class UpdateableTable extends React.Component {
    constructor() {
        super();
        this.callUpdate = this.callUpdate.bind(this);
        this.customButtonClicked = this.customButtonClicked.bind(this);
    }
    callUpdate(row, keyName, index) {
        // This gets called on table update
    }
    customButtonClicked() {
        // This gets called when CustomButton gets clicked
    }
    render() {
        return (
              <div>
                <DataTable
                  rows={createDataTableObject(dataList)}
                  columns={columns}
                  onUpdate={this.callUpdate}
                />
              </div>
        );
    }
};

```