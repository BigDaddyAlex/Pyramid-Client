'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  searchBoxStyle: {
    width: '100%'

  },
  searchBoxWrapper: {
  },
  resultsStyle: {
    backgroundColor: '#fff',
    padding: '12px',
    color: '#666',
    fontSize: 14,
    cursor: 'pointer'
  },
  selectedResultStyle: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    padding: '12px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: 14,
    cursor: 'pointer',
    width: '50%'
  },
  resultsWrapperStyle: {
    borderTop: 0,
    overflow: 'auto',
    position: 'relative'
  }
};

function defaultResultsTemplate(props, state, styl, clickHandler) {
  return state.results.map(function (val, i) {
    var style = state.selectedIndex === i ? (0, _extends3.default)({}, styl.selectedResultStyle, props.selectedListItemStyle) : (0, _extends3.default)({}, styl.resultsStyle, props.listItemStyle);
    return _react2.default.createElement(
      'div',
      {
        tabIndex: '0', key: i, style: style, onClick: function onClick() {
          return clickHandler(i);
        }
      },
      val[props.keyForDisplayName]
    );
  });
}

var FuzzySearch = function (_Component) {
  (0, _inherits3.default)(FuzzySearch, _Component);

  function FuzzySearch(props) {
    (0, _classCallCheck3.default)(this, FuzzySearch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FuzzySearch.__proto__ || (0, _getPrototypeOf2.default)(FuzzySearch)).call(this, props));

    _this.state = {
      isOpen: !_this.props.shouldShowDropdownAtStart,
      results: [],
      selectedIndex: 0,
      value: props.inputProps.defaultValue || ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleMouseClick = _this.handleMouseClick.bind(_this);
    _this.fuse = new _fuse2.default(props.list, _this.getOptions());
    _this.setDropdownRef = function (ref) {
      _this.dropdownRef = ref;
    };
    return _this;
  }

  (0, _createClass3.default)(FuzzySearch, [{
    key: 'getOptions',
    value: function getOptions() {
      var _props = this.props,
        caseSensitive = _props.caseSensitive,
        id = _props.id,
        include = _props.include,
        keys = _props.keys,
        shouldSort = _props.shouldSort,
        sortFn = _props.sortFn,
        tokenize = _props.tokenize,
        verbose = _props.verbose,
        maxPatternLength = _props.maxPatternLength,
        distance = _props.distance,
        threshold = _props.threshold,
        location = _props.location,
        options = _props.options;


      return (0, _extends3.default)({
        caseSensitive: caseSensitive,
        id: id,
        include: include,
        keys: keys,
        shouldSort: shouldSort,
        sortFn: sortFn,
        tokenize: tokenize,
        verbose: verbose,
        maxPatternLength: maxPatternLength,
        distance: distance,
        threshold: threshold,
        location: location
      }, options);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      e.persist();

      if (this.props.inputProps.onChange) {
        this.props.inputProps.onChange(e);
      }

      var shouldDisplayAllListItems = this.props.shouldShowDropdownAtStart && !e.target.value;

      this.setState({
        isOpen: true,
        results: shouldDisplayAllListItems ? this.props.list : this.fuse.search(e.target.value).slice(0, this.props.maxResults - 1),
        value: e.target.value
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
        results = _state.results,
        selectedIndex = _state.selectedIndex;

      if (e.keyCode === 40 && selectedIndex < results.length - 1) {
        this.setState({
          selectedIndex: selectedIndex + 1
        });

      } else if (e.keyCode === 38 && selectedIndex > 0) {
        this.setState({
          selectedIndex: selectedIndex - 1
        });

      } else if (e.keyCode === 13) {
        this.selectItem();
      }
    }
  }, {
    key: 'selectItem',
    value: function selectItem(index) {
      var results = this.state.results;

      var selectedIndex = index || this.state.selectedIndex;
      var result = results[selectedIndex];
      if (result) {
        // send result to onSelectMethod
        this.props.onSelect(result);
        // and set it as input value
        this.setState({
          value: result[this.props.keyForDisplayName]
        });
      }
      // hide dropdown
      this.setState({
        results: [],
        selectedIndex: 0
      });
    }
  }, {
    key: 'handleMouseClick',
    value: function handleMouseClick(clickedIndex) {
      this.selectItem(clickedIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
        autoFocus = _props2.autoFocus,
        className = _props2.className,
        inputProps = _props2.inputProps,
        isDropdown = _props2.isDropdown,
        list = _props2.list,
        placeholder = _props2.placeholder,
        resultsTemplate = _props2.resultsTemplate,
        shouldShowDropdownAtStart = _props2.shouldShowDropdownAtStart,
        width = _props2.width;

      // Update the search space list

      if (this.fuse.setCollection && list) {
        this.fuse.setCollection(list);
      }

      var mainClass = (0, _classnames2.default)('react-fuzzy-search mt-2', className);

      return _react2.default.createElement(
        'div',
        {
          className: mainClass,
          ref: this.setDropdownRef,
          style: { width: width },
          onBlur: function onBlur(e) {
            if (_this2.dropdownRef.contains(e.relatedTarget)) return;

            // Check shouldShowDropdownAtStart for backwards-compatibility.
            if (isDropdown || shouldShowDropdownAtStart) {
              _this2.setState({
                isOpen: false
              });
            }
          },
          onKeyDown: this.handleKeyDown
        },

        _react2.default.createElement('input', (0, _extends3.default)({}, inputProps, {
          className : 'form-control',
          autoFocus: autoFocus,
          onChange: this.handleChange,
          placeholder: placeholder,
          type: 'text',
          value: this.state.value,
          onFocus: function onFocus(e) {
            if (shouldShowDropdownAtStart) {
              _this2.setState({
                isOpen: true,
                results: _this2.state.value ? _this2.state.results : list
              });
            }

            if (inputProps.onFocus) {
              inputProps.onFocus(e);
            }
          }
        }))
        ,
        this.state.isOpen && this.state.results && this.state.results.length > 0 && _react2.default.createElement(
          'div',
          { style: (0, _extends3.default)({}, styles.resultsWrapperStyle, this.props.listWrapperStyle) },
          resultsTemplate(this.props, this.state, styles, this.handleMouseClick)
        )
      );
    }
  }]);
  return FuzzySearch;
}(_react.Component);

FuzzySearch.propTypes = {
  caseSensitive: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  distance: _propTypes2.default.number,
  id: _propTypes2.default.string,
  include: _propTypes2.default.array,
  inputProps: _propTypes2.default.object,
  isDropdown: _propTypes2.default.bool,
  maxPatternLength: _propTypes2.default.number,
  onSelect: _propTypes2.default.func.isRequired,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  keyForDisplayName: _propTypes2.default.string,
  keys: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  list: _propTypes2.default.array.isRequired,
  location: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  resultsTemplate: _propTypes2.default.func,
  shouldShowDropdownAtStart: _propTypes2.default.bool,
  shouldSort: _propTypes2.default.bool,
  sortFn: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  tokenize: _propTypes2.default.bool,
  verbose: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  maxResults: _propTypes2.default.number,
  options: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  inputWrapperStyle: _propTypes2.default.object,
  listItemStyle: _propTypes2.default.object,
  listWrapperStyle: _propTypes2.default.object,
  selectedListItemStyle: _propTypes2.default.object
};
FuzzySearch.defaultProps = {
  caseSensitive: false,
  distance: 100,
  include: [],
  inputProps: {},
  isDropdown: false,
  keyForDisplayName: 'title',
  location: 0,
  width: 100,
  placeholder: 'Search',
  resultsTemplate: defaultResultsTemplate,
  shouldShowDropdownAtStart: false,
  shouldSort: true,
  sortFn: function sortFn(a, b) {
    return a.score - b.score;
  },

  threshold: 0.6,
  tokenize: false,
  verbose: false,
  autoFocus: false,
  maxResults: 10,
  inputStyle: {},
  inputWrapperStyle: {},
  listItemStyle: {},
  listWrapperStyle: {},
  selectedListItemStyle: {}
};
exports.default = FuzzySearch;