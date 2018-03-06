'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PropTypes = require('prop-types');

exports.default = isTag;

var babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || PropTypes.any;

function isTag(target) /* : %checks */{
  return typeof target === 'string';
}
module.exports = exports['default'];
