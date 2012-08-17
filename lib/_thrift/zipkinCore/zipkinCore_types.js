//
// Autogenerated by Thrift Compiler (0.8.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var ttypes = module.exports = {};
ttypes.AnnotationType = {
'BOOL' : 0,
'BYTES' : 1,
'I16' : 2,
'I32' : 3,
'I64' : 4,
'DOUBLE' : 5,
'STRING' : 6
};
var Endpoint = module.exports.Endpoint = function(args) {
  this.ipv4 = null;
  this.port = null;
  this.service_name = null;
  if (args) {
    if (args.ipv4 !== undefined) {
      this.ipv4 = args.ipv4;
    }
    if (args.port !== undefined) {
      this.port = args.port;
    }
    if (args.service_name !== undefined) {
      this.service_name = args.service_name;
    }
  }
};
Endpoint.prototype = {};
Endpoint.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.ipv4 = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I16) {
        this.port = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.service_name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Endpoint.prototype.write = function(output) {
  output.writeStructBegin('Endpoint');
  if (this.ipv4) {
    output.writeFieldBegin('ipv4', Thrift.Type.I32, 1);
    output.writeI32(this.ipv4);
    output.writeFieldEnd();
  }
  if (this.port) {
    output.writeFieldBegin('port', Thrift.Type.I16, 2);
    output.writeI16(this.port);
    output.writeFieldEnd();
  }
  if (this.service_name) {
    output.writeFieldBegin('service_name', Thrift.Type.STRING, 3);
    output.writeString(this.service_name);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Annotation = module.exports.Annotation = function(args) {
  this.timestamp = null;
  this.value = null;
  this.host = null;
  if (args) {
    if (args.timestamp !== undefined) {
      this.timestamp = args.timestamp;
    }
    if (args.value !== undefined) {
      this.value = args.value;
    }
    if (args.host !== undefined) {
      this.host = args.host;
    }
  }
};
Annotation.prototype = {};
Annotation.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.timestamp = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.value = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRUCT) {
        this.host = new ttypes.Endpoint();
        this.host.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Annotation.prototype.write = function(output) {
  output.writeStructBegin('Annotation');
  if (this.timestamp) {
    output.writeFieldBegin('timestamp', Thrift.Type.I64, 1);
    output.writeI64(this.timestamp);
    output.writeFieldEnd();
  }
  if (this.value) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  if (this.host) {
    output.writeFieldBegin('host', Thrift.Type.STRUCT, 3);
    this.host.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var BinaryAnnotation = module.exports.BinaryAnnotation = function(args) {
  this.key = null;
  this.value = null;
  this.annotation_type = null;
  this.host = null;
  if (args) {
    if (args.key !== undefined) {
      this.key = args.key;
    }
    if (args.value !== undefined) {
      this.value = args.value;
    }
    if (args.annotation_type !== undefined) {
      this.annotation_type = args.annotation_type;
    }
    if (args.host !== undefined) {
      this.host = args.host;
    }
  }
};
BinaryAnnotation.prototype = {};
BinaryAnnotation.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.key = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.value = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.annotation_type = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.host = new ttypes.Endpoint();
        this.host.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BinaryAnnotation.prototype.write = function(output) {
  output.writeStructBegin('BinaryAnnotation');
  if (this.key) {
    output.writeFieldBegin('key', Thrift.Type.STRING, 1);
    output.writeString(this.key);
    output.writeFieldEnd();
  }
  if (this.value) {
    output.writeFieldBegin('value', Thrift.Type.STRING, 2);
    output.writeString(this.value);
    output.writeFieldEnd();
  }
  if (this.annotation_type) {
    output.writeFieldBegin('annotation_type', Thrift.Type.I32, 3);
    output.writeI32(this.annotation_type);
    output.writeFieldEnd();
  }
  if (this.host) {
    output.writeFieldBegin('host', Thrift.Type.STRUCT, 4);
    this.host.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var Span = module.exports.Span = function(args) {
  this.trace_id = null;
  this.name = null;
  this.id = null;
  this.parent_id = null;
  this.annotations = null;
  this.binary_annotations = null;
  if (args) {
    if (args.trace_id !== undefined) {
      this.trace_id = args.trace_id;
    }
    if (args.name !== undefined) {
      this.name = args.name;
    }
    if (args.id !== undefined) {
      this.id = args.id;
    }
    if (args.parent_id !== undefined) {
      this.parent_id = args.parent_id;
    }
    if (args.annotations !== undefined) {
      this.annotations = args.annotations;
    }
    if (args.binary_annotations !== undefined) {
      this.binary_annotations = args.binary_annotations;
    }
  }
};
Span.prototype = {};
Span.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.trace_id = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I64) {
        this.id = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I64) {
        this.parent_id = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.annotations = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new ttypes.Annotation();
          elem6.read(input);
          this.annotations.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.LIST) {
        var _size7 = 0;
        var _rtmp311;
        this.binary_annotations = [];
        var _etype10 = 0;
        _rtmp311 = input.readListBegin();
        _etype10 = _rtmp311.etype;
        _size7 = _rtmp311.size;
        for (var _i12 = 0; _i12 < _size7; ++_i12)
        {
          var elem13 = null;
          elem13 = new ttypes.BinaryAnnotation();
          elem13.read(input);
          this.binary_annotations.push(elem13);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Span.prototype.write = function(output) {
  output.writeStructBegin('Span');
  if (this.trace_id) {
    output.writeFieldBegin('trace_id', Thrift.Type.I64, 1);
    output.writeI64(this.trace_id);
    output.writeFieldEnd();
  }
  if (this.name) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 3);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.id) {
    output.writeFieldBegin('id', Thrift.Type.I64, 4);
    output.writeI64(this.id);
    output.writeFieldEnd();
  }
  if (this.parent_id) {
    output.writeFieldBegin('parent_id', Thrift.Type.I64, 5);
    output.writeI64(this.parent_id);
    output.writeFieldEnd();
  }
  if (this.annotations) {
    output.writeFieldBegin('annotations', Thrift.Type.LIST, 6);
    output.writeListBegin(Thrift.Type.STRUCT, this.annotations.length);
    for (var iter14 in this.annotations)
    {
      if (this.annotations.hasOwnProperty(iter14))
      {
        iter14 = this.annotations[iter14];
        iter14.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.binary_annotations) {
    output.writeFieldBegin('binary_annotations', Thrift.Type.LIST, 8);
    output.writeListBegin(Thrift.Type.STRUCT, this.binary_annotations.length);
    for (var iter15 in this.binary_annotations)
    {
      if (this.binary_annotations.hasOwnProperty(iter15))
      {
        iter15 = this.binary_annotations[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ttypes.CLIENT_SEND = 'cs';
ttypes.CLIENT_RECV = 'cr';
ttypes.SERVER_SEND = 'ss';
ttypes.SERVER_RECV = 'sr';