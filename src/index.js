import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import _ from 'lodash';

class DataTable extends React.Component {
  constructor() {
    super();
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);

    this.updateCallback = this.updateCallback.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.state = {
      rows: [],
      sortColumn: null,
      sortDirection: null,
    };
  }
  componentWillMount() {
    this.state = {
      rows: _.cloneDeep(this.props.rows),
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: _.cloneDeep(nextProps.rows),
    });
  }
  rowGetter(i) {
    return this.state.rows[i];
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
    return (
      <div>
        <ReactDataGrid
          enableCellSelect={true}
          onGridSort={this.handleGridSort}
          columns={this.props.columns}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
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
};

DataTable.defaultProps = {
  columns: [],
  rows: [],
  onUpdate: {},
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

