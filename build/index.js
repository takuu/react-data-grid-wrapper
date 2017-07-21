'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createDataTableObject = createDataTableObject;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDataGrid = require('react-data-grid');

var _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_React$Component) {
    _inherits(DataTable, _React$Component);

    function DataTable() {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this));

        _this.rowGetter = _this.rowGetter.bind(_this);
        _this.handleGridRowsUpdated = _this.handleGridRowsUpdated.bind(_this);

        _this.updateCallback = _this.updateCallback.bind(_this);
        _this.updateGrid = _this.updateGrid.bind(_this);
        _this.handleGridSort = _this.handleGridSort.bind(_this);
        _this.onSearch = _this.onSearch.bind(_this);
        _this.state = {
            rows: [],
            filteredData: [],
            sortColumn: null,
            sortDirection: null
        };
        return _this;
    }

    _createClass(DataTable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state = {
                rows: _lodash2.default.cloneDeep(this.props.rows),
                filteredData: _lodash2.default.cloneDeep(this.props.rows)
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                rows: _lodash2.default.cloneDeep(nextProps.rows),
                filteredData: _lodash2.default.cloneDeep(nextProps.rows)
            });
        }
    }, {
        key: 'rowGetter',
        value: function rowGetter(i) {
            return this.state.filteredData[i];
        }
    }, {
        key: 'handleGridRowsUpdated',
        value: function handleGridRowsUpdated(_ref) {
            var fromRow = _ref.fromRow,
                toRow = _ref.toRow,
                updated = _ref.updated,
                cellKey = _ref.cellKey;

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
    }, {
        key: 'onSearch',
        value: function onSearch(event) {
            var _this2 = this;

            var value = event.target.value;

            this.setState({
                filteredData: _lodash2.default.filter(this.state.rows, function (item) {
                    var searchField = item[_this2.props.searchField];
                    return searchField.toLowerCase().includes(value.toLowerCase());
                })
            });
        }
    }, {
        key: 'updateGrid',
        value: function updateGrid(fromRow, toRow, updated) {
            var rows = this.state.rows.slice();
            for (var i = fromRow; i <= toRow; i++) {
                var rowToUpdate = rows[i];
                var updatedRow = _lodash2.default.merge(rowToUpdate, updated);
                rows[i] = updatedRow;
            }

            this.setState({ rows: rows });
        }
    }, {
        key: 'updateCallback',
        value: function updateCallback(row, keyName, index) {
            this.props.onUpdate(row, keyName, index);
        }
    }, {
        key: 'handleGridSort',
        value: function handleGridSort(sortColumn, sortDirection) {

            // TODO: This only sorts by alphabetically, should be able to sort by date and by numbers.  This can be achieved by adding a type property to column
            var comparer = function comparer(a, b) {
                if (sortDirection === 'ASC') {
                    return a[sortColumn] > b[sortColumn] ? 1 : -1;
                } else if (sortDirection === 'DESC') {
                    return a[sortColumn] < b[sortColumn] ? 1 : -1;
                }
            };

            var rows = sortDirection === 'NONE' ? this.props.rows.slice(0) : this.state.rows.sort(comparer);

            this.setState({ rows: rows });
        }
    }, {
        key: 'render',
        value: function render() {
            var searchBar = this.props.searchField ? _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-6' },
                    _react2.default.createElement(
                        'div',
                        { id: 'custom-search-input' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group col-md-12' },
                            _react2.default.createElement('input', { type: 'text', className: 'form-control input', placeholder: 'Search', onChange: this.onSearch }),
                            _react2.default.createElement(
                                'span',
                                { className: 'input-group-btn' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-info', type: 'button' },
                                    _react2.default.createElement('i', { className: 'glyphicon glyphicon-search' })
                                )
                            )
                        )
                    )
                )
            ) : _react2.default.createElement('div', null);

            return _react2.default.createElement(
                'div',
                null,
                searchBar,
                _react2.default.createElement(_reactDataGrid2.default, {
                    enableCellSelect: true,
                    onGridSort: this.handleGridSort,
                    columns: this.props.columns,
                    onGridRowsUpdated: this.handleGridRowsUpdated,
                    rowGetter: this.rowGetter,
                    rowsCount: this.state.filteredData.length,
                    minHeight: 500
                })
            );
        }
    }]);

    return DataTable;
}(_react2.default.Component);

DataTable.propTypes = {
    columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
    rows: _propTypes2.default.arrayOf(_propTypes2.default.object),
    onUpdate: _propTypes2.default.func,
    searchField: _propTypes2.default.string
};

DataTable.defaultProps = {
    columns: [],
    rows: [],
    onUpdate: {},
    searchField: ''
};

exports.default = DataTable;
function createDataTableObject(list) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return _lodash2.default.map(list, function (item) {
        var cloned = _lodash2.default.cloneDeep(item);
        cloned.context = context;
        return _extends({}, cloned, {
            rowData: cloned
        });
    });
}