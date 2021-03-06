// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE
'use strict';

var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var SemanticUiReact = require("semantic-ui-react");

function make(name, size, children) {
  return ReasonReact.wrapJsForReason(SemanticUiReact.Icon, {
              name: name,
              size: Js_null_undefined.fromOption(size)
            }, children);
}

exports.make = make;
/* ReasonReact Not a pure module */
