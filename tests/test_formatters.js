// Copyright 2012 Rackspace Hosting, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var util = require('util');

var _ = require('underscore');
var tprotocol = require('../node_modules/thrift/lib/thrift/protocol');
var ttransport = require('../node_modules/thrift/lib/thrift/transport');

var formatters = require('..').formatters;
var trace = require('..').trace;
var zipkinCore_types = require('../lib/_thrift/zipkinCore/zipkinCore_types');

// The test cases for the formatters - basic formatting of trace with
// timestamp annotation and other annotation, one with a parentSpanId in the
// trace, and one with an endpoint in one of the annotations
var testcases = {
  basic_trace_and_annotations: {
    trace: new trace.Trace('test', {spanId: 10, traceId:1, debug:true}),
    annotations: [new trace.Annotation.timestamp('name1', 1),
                  new trace.Annotation.string('name2', '2')]
  },
  trace_with_parentSpanId: {
    trace: new trace.Trace('test', {parentSpanId:5, spanId: 10, traceId:1, debug:false}),
    annotations: []
  },
  trace_with_no_parentSpanId_and_annotations: {
    trace: new trace.Trace('test', {parentSpanId:null, spanId:10, traceId:1, debug:false}),
    annotations: [new trace.Annotation.timestamp('name1', 1),
      new trace.Annotation.string('name2', '2')]
  },
  trace_with_no_parentSpanId_and_bad_annotations: {
    trace: new trace.Trace('test', {parentSpanId:null, spanId:10, traceId:1, debug:false}),
    annotations: [new trace.Annotation.timestamp('name1', 1),
      new trace.Annotation.string('name2', null)]
  },
  trace_with_annotation_with_endpoint: {
    trace: new trace.Trace('test', {spanId: 10, traceId:1, debug:false}),
    annotations: [
      new trace.Annotation(
        'name1', 1, 'timestamp', (new trace.Endpoint('1.1.1.1', 5, 'service'))
      )]
  }
};

// Helper function to test formatting for Reskin - takes a test object,
// one of the test cases from above, and the expected object represented
// by the formatted json string
var testRestkinFormatter = function (test, testcase, expected) {
  formatters.formatForRestkin([[testcase.trace, testcase.annotations]],
    function(err, jsonStr) {
      test.equal(err, null);
      test.deepEqual(JSON.parse(jsonStr), expected);
      test.done();
    });
};

// Helper function to test formatting for Zipkin - takes a test object,
// one of the test cases from above, and the expected zipkinCore_types object
// represented base64 encoded string
var testZipkinFormatter = function (test, testcase, expected) {
  formatters.formatForZipkin(testcase.trace, testcase.annotations,
    function(formatError, base64str) {
      var b = new Buffer(base64str, "base64");
      var trans_receiver = ttransport.TBufferedTransport.receiver(function(trans) {
        var prot = new tprotocol.TBinaryProtocol(trans);
        var span = new zipkinCore_types.Span();
        span.read(prot);
        span.trace_id = span.trace_id.toNumber();
        span.id = span.id.toNumber();
        var parent_span_id = span.parent_id ? span.parent_id.toNumber() : null;
        if (parent_span_id) span.parent_id = parent_span_id;
        span.annotations.forEach(function(a){
          var val = a.timestamp ? a.timestamp.toNumber() : null;
          if (val) a.timestamp = val;
        });
        test.deepEqual(span, expected);
        test.done();
      });

      test.equal(formatError, null);
      trans_receiver(b);
    });
};

module.exports = {
  restkinFormatterTests: {
    test_basic_trace_and_annotations: function(test){
      testRestkinFormatter(test, testcases.basic_trace_and_annotations, [{
        trace_id: '0000000000000001',
        span_id: '000000000000000a',
        name: 'test',
        annotations: [
          {
            key: 'name1',
            value: 1,
            type: 'timestamp'
          },
          {
            key: 'name2',
            value: '2',
            type: 'string'
          }
        ]
      }]);
    },
    test_trace_with_parentSpanId: function(test){
      testRestkinFormatter(test, testcases.trace_with_parentSpanId, [{
        trace_id: '0000000000000001',
        parent_span_id: '0000000000000005',
        span_id: '000000000000000a',
        name: 'test',
        annotations: []
      }]);
    },
    test_trace_with_annotation_with_endpoint: function(test) {
      testRestkinFormatter(
        test, testcases.trace_with_annotation_with_endpoint, [{
          trace_id: '0000000000000001',
          span_id: '000000000000000a',
          name: 'test',
          annotations: [
            {
              key: 'name1',
              value: 1,
              type: 'timestamp',
              host: {
                ipv4: '1.1.1.1',
                port: 5,
                service_name: 'service'
              }
            }
          ]
        }]);
    }
  },
  zipkinFormatterTests: {
    test_basic_trace_and_annotations: function(test){
      testZipkinFormatter(
        test, testcases.basic_trace_and_annotations,
        new zipkinCore_types.Span({
          trace_id: 1,
          id: 10,
          name: 'test',
          annotations: [ new zipkinCore_types.Annotation({
            timestamp: 1,
            value: 'name1'
          })],
          binary_annotations: [ new zipkinCore_types.BinaryAnnotation({
            value: '2',
            key: 'name2',
            annotation_type: zipkinCore_types.AnnotationType.STRING
          })],
          debug: true
        }));
    },
    test_trace_with_parentSpanId: function(test){
      testZipkinFormatter(
        test, testcases.trace_with_parentSpanId,
        new zipkinCore_types.Span({
          trace_id: 1,
          parent_id: 5,
          id: 10,
          name: 'test',
          annotations: [],
          binary_annotations: [],
          debug: false
        }));
    },
    test_trace_with_annotation_with_endpoint: function(test) {
      testZipkinFormatter(
        test, testcases.trace_with_annotation_with_endpoint,
        new zipkinCore_types.Span({
          trace_id: 1,
          id: 10,
          name: 'test',
          annotations: [ new zipkinCore_types.Annotation({
            timestamp: 1,
            value: 'name1',
            host: new zipkinCore_types.Endpoint({
              // formula is (first octet * 256^3) + (second octet * 256^2) +
              // (third octet * 256) + (fourth octet)
              ipv4: Math.pow(256, 3) + Math.pow(256, 2) + 256 + 1,
              port: 5,
              service_name: 'service'
            })
          })],
          binary_annotations: [],
          debug: false
        }));
    },
    trace_with_no_parentSpanId_and_annotations: function(test){
      testZipkinFormatter(
        test, testcases.trace_with_no_parentSpanId_and_annotations,
        new zipkinCore_types.Span({
          trace_id: 1,
          id: 10,
          parent_id: null,
          name: 'test',
          annotations: [ new zipkinCore_types.Annotation({
            timestamp: 1,
            value: 'name1'
          })],
          binary_annotations: [ new zipkinCore_types.BinaryAnnotation({
            value: '2',
            key: 'name2',
            annotation_type: zipkinCore_types.AnnotationType.STRING
          })],
          debug: false
        }));
    }, trace_with_no_parentSpanId_and_bad_annotations: function(test){
      testZipkinFormatter(
        test, testcases.trace_with_no_parentSpanId_and_bad_annotations,
        new zipkinCore_types.Span({
          trace_id: 1,
          id: 10,
          parent_id: null,
          name: 'test',
          annotations: [ new zipkinCore_types.Annotation({
            timestamp: 1,
            value: 'name1'
          })],
          binary_annotations: [ new zipkinCore_types.BinaryAnnotation({
            value: null,
            key: 'name2',
            annotation_type: zipkinCore_types.AnnotationType.STRING
          })],
          debug: false
        }));
    }
  }
};
