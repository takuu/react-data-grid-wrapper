import React from 'react';
import PropTypes from 'prop-types';
import DataTable, { createDataTableObject } from '../src/index';
import _ from 'lodash';

const CustomButton2 = ({ value: { context } }) => {
    console.log('Custom Button:  ', value, context);
    return (
        <div>
            <button className='btn btn-default' onClick={context.customButtonClicked}>
                Custom Button
            </button>
        </div>
    );
};

class CustomButton extends React.Component {
    constructor() {
        super();
        this.onCustomClick = this.onCustomClick.bind(this);
    }

    onCustomClick() {
        const {value: {context}} = this.props;
        console.log('CustomTable component', this.props);
        debugger;
        context.customButtonClicked();

    }

    render() {

        const {value: {context}} = this.props;
        console.log('CustomTable component', this.props)
        return (
            <div>
                <button className='btn btn-default' onClick={this.onCustomClick}>
                    Custom Button
                </button>
            </div>
        );
    }

}

const customColumns = [
    { key: 'FirstName', name: 'First Name', editable: true, sortable: true },
    { key: 'LastName', name: 'Last Name', editable: true, sortable: true },
    { key: 'Title', name: 'Title', editable: true, sortable: true },
    { key: 'rowData', name: '', formatter: CustomButton },
];


class CustomTable extends React.Component {
    constructor() {
        super();
        this.callUpdate = this.callUpdate.bind(this);
        this.customButtonClicked = this.customButtonClicked.bind(this);
        this.state = {
            rows: [],
        };
    }
    componentWillMount() {
        this.state = {
            rows: _.cloneDeep(this.props.dataList)
        };
    }
    callUpdate(row, keyName, index) {
        // This gets called on table update
        console.log('callUpdate: ', row, keyName, index);
        let temp = _.cloneDeep(this.state.rows);
        temp[index] = row;
        debugger;
        this.setState({
            rows: temp
        });
    }
    customButtonClicked(e, foobar) {
        console.log('custom button was clicked: ', e, foobar);
        debugger;
        // This gets called when CustomButton gets clicked
    }
    render() {
        return (
            <div>
                <DataTable
                    rows={createDataTableObject(this.state.rows, this)}
                    columns={customColumns}
                    onUpdate={this.callUpdate}
                />
            </div>
        );
    }
};

CustomTable.propTypes = {
    dataList: PropTypes.arrayOf(PropTypes.object),
};

CustomTable.defaultProps = {
    dataList: [],
};

export default CustomTable;



