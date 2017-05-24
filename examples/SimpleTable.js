import React from 'react';
import PropTypes from 'prop-types';
import DataTable, { createDataTableObject } from '../src/DataTable';

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
                    columns={this.props.columns}
                />
            </div>
        );
    }
};

SimpleTable.propTypes = {
    dataList: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object),
};

SimpleTable.defaultProps = {
    dataList: [],
    columns: [],
};

export default SimpleTable;
