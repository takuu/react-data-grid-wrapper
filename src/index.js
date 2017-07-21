import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import _ from 'lodash';
import './style.css';

class DataTable extends React.Component {
    constructor() {
        super();
        this.rowGetter = this.rowGetter.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);

        this.updateCallback = this.updateCallback.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = {
            rows: [],
            filteredData: [],
            sortColumn: null,
            sortDirection: null,
        };
    }
    componentWillMount() {
        this.state = {
            rows: _.cloneDeep(this.props.rows),
            filteredData: _.cloneDeep(this.props.rows),
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: _.cloneDeep(nextProps.rows),
            filteredData: _.cloneDeep(nextProps.rows),
        });
    }
    rowGetter(i) {
        return this.state.filteredData[i];
    }
    handleGridRowsUpdated({ fromRow, toRow, updated, cellKey }) {
        // Nothing has changed
        if (this.state.rows[fromRow][cellKey] === updated[cellKey]) {
            return;
        }
        if (this.props.onUpdate) {
            this.updateGrid(fromRow, toRow, updated);
            this.updateCallback(this.state.rows[fromRow], cellKey, fromRow);
        } else {
            this.updateGrid(fromRow, toRow, updated);
        }
    }

    onSearch(event) {
        let value = event.target.value;

        this.setState({
            filteredData: _.filter(this.state.rows, (item) => {
                const searchField = item[this.props.searchField];
                return searchField.toLowerCase().includes(value.toLowerCase());
            }),
        });
    }
    updateGrid(fromRow, toRow, updated) {
        let rows = this.state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = _.merge(rowToUpdate, updated);
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    }

    updateCallback(row, keyName, index) {
        this.props.onUpdate(row, keyName, index);
    }

    handleGridSort(sortColumn, sortDirection) {

        // TODO: This only sorts by alphabetically, should be able to sort by date and by numbers.  This can be achieved by adding a type property to column
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        const rows = sortDirection === 'NONE' ? this.props.rows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    }

    render() {
        const searchBar = (this.props.searchField) ? (
            <div className="row">
              <div className="col-md-6">
                <div id="custom-search-input">
                  <div className="input-group col-md-12">
                    <input type="text" className="form-control input" placeholder="Search" onChange={this.onSearch} />
                    <span className="input-group-btn">
                    <button className="btn btn-info" type="button">
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </span>
                  </div>
                </div>
              </div>
            </div>
        ) : (<div></div>);

        return (
            <div>
                {searchBar}
              <ReactDataGrid
                  enableCellSelect
                  onGridSort={this.handleGridSort}
                  columns={this.props.columns}
                  onGridRowsUpdated={this.handleGridRowsUpdated}
                  rowGetter={this.rowGetter}
                  rowsCount={this.state.filteredData.length}
                  minHeight={500}
              />
            </div>
        );
    }
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object),
    onUpdate: PropTypes.func,
    searchField: PropTypes.string,
};

DataTable.defaultProps = {
    columns: [],
    rows: [],
    onUpdate: {},
    searchField: '',
};

export default DataTable;

export function createDataTableObject(list, context = {}) {
    return _.map(list, (item) => {
        let cloned = _.cloneDeep(item);
        cloned.context = context;
        return {
            ...cloned,
            rowData: cloned,
        };
    })
}
