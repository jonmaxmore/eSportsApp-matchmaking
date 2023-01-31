// Code generated by protoc-gen-go. DO NOT EDIT.
// source: valve_extensions.proto

package protocol

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	descriptorpb "google.golang.org/protobuf/types/descriptorpb"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

var E_BoxedType = &proto.ExtensionDesc{
	ExtendedType:  (*descriptorpb.FieldOptions)(nil),
	ExtensionType: (*string)(nil),
	Field:         50001,
	Name:          "protocol.boxed_type",
	Tag:           "bytes,50001,opt,name=boxed_type",
	Filename:      "valve_extensions.proto",
}

var E_AdditionalIncludes = &proto.ExtensionDesc{
	ExtendedType:  (*descriptorpb.FileOptions)(nil),
	ExtensionType: (*string)(nil),
	Field:         50002,
	Name:          "protocol.additional_includes",
	Tag:           "bytes,50002,opt,name=additional_includes",
	Filename:      "valve_extensions.proto",
}

func init() {
	proto.RegisterExtension(E_BoxedType)
	proto.RegisterExtension(E_AdditionalIncludes)
}

func init() {
	proto.RegisterFile("valve_extensions.proto", fileDescriptor_69799220494dcc78)
}

var fileDescriptor_69799220494dcc78 = []byte{
	// 169 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x2b, 0x4b, 0xcc, 0x29,
	0x4b, 0x8d, 0x4f, 0xad, 0x28, 0x49, 0xcd, 0x2b, 0xce, 0xcc, 0xcf, 0x2b, 0xd6, 0x2b, 0x28, 0xca,
	0x2f, 0xc9, 0x17, 0xe2, 0x00, 0x53, 0xc9, 0xf9, 0x39, 0x52, 0x0a, 0xe9, 0xf9, 0xf9, 0xe9, 0x39,
	0xa9, 0xfa, 0x60, 0x81, 0xa4, 0xd2, 0x34, 0xfd, 0x94, 0xd4, 0xe2, 0xe4, 0xa2, 0xcc, 0x82, 0x92,
	0xfc, 0x22, 0x88, 0x5a, 0x2b, 0x3b, 0x2e, 0xae, 0xa4, 0xfc, 0x8a, 0xd4, 0x94, 0xf8, 0x92, 0xca,
	0x82, 0x54, 0x21, 0x59, 0x3d, 0x88, 0x06, 0x3d, 0x98, 0x06, 0x3d, 0xb7, 0xcc, 0xd4, 0x9c, 0x14,
	0xff, 0x82, 0x12, 0x90, 0xf1, 0x12, 0x17, 0xdb, 0x98, 0x15, 0x18, 0x35, 0x38, 0x83, 0x38, 0xc1,
	0x5a, 0x42, 0x2a, 0x0b, 0x52, 0xad, 0xfc, 0xb9, 0x84, 0x13, 0x53, 0x52, 0x32, 0x41, 0xf2, 0x89,
	0x39, 0xf1, 0x99, 0x79, 0xc9, 0x39, 0xa5, 0x29, 0xa9, 0xc5, 0x42, 0x32, 0x58, 0x0c, 0xca, 0x49,
	0x85, 0x99, 0x73, 0x09, 0x6a, 0x8e, 0x10, 0x42, 0xab, 0x27, 0x54, 0x27, 0x20, 0x00, 0x00, 0xff,
	0xff, 0xd6, 0xe0, 0x92, 0x7a, 0xd5, 0x00, 0x00, 0x00,
}
