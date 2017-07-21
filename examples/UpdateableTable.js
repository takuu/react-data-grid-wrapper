import React from 'react';
import PropTypes from 'prop-types';
import DataTable, { createDataTableObject } from '../src/index';
import _ from 'lodash';

const columns = [
    { key: 'FirstName', name: 'First Name', editable: true, sortable: true },
    { key: 'LastName', name: 'Last Name', editable: true, sortable: true },
    { key: 'Title', name: 'Title', editable: true, sortable: true }
];

let dataList = [
    {FirstName: 'John', LastName: 'Snow', Title: 'King of the North'},
    {FirstName: 'John', LastName: 'Smith', Title: 'No ones name ever'},
    {FirstName: 'John', LastName: 'Doe', Title: 'Sample License plate'},
];

class UpdateableTable extends React.Component {
    constructor() {
        super();
        this.callUpdate = this.callUpdate.bind(this);
        this.state = {
            rows: [],
        };
    }
    componentWillMount() {
        this.state = {
            rows: _.cloneDeep(this.props.dataList)
        };
    }
    callUpdate(newRow, keyName, index) {
        console.log('callUpdate: ', newRow, keyName, index);
        let temp = _.cloneDeep(this.state.rows);
        temp[index] = newRow;
        this.setState({
            rows: temp
        });
    }

    render() {
        return (
            <div>
                <DataTable
                    rows={this.state.rows}
                    columns={this.props.columns}
                    onUpdate={this.callUpdate}
                />
            </div>
        );
    }
};

UpdateableTable.propTypes = {
    dataList: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object),
};

UpdateableTable.defaultProps = {
    dataList: [],
    columns: [],
};

export default UpdateableTable;