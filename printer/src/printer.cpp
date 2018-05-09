#include "printer.h"

using namespace v8;
Print print_;

void IsLoad(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (!print_.IsLoad()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "load failed")));
    return;
  }
}

void Open(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (!print_.DriveOpen()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "open failed")));
    return;
  }
}

void Close(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (!print_.Close()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "close failed")));
    return;
  }
}

void Reset(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (!print_.Reset()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "reset failed")));
    return;
  }
}

void PrintRawData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (args.Length() != 1) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument number error")));
    return;
  }
  if (!args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument error")));
    return;
  }
  String::Utf8Value utf8_str(args[0]->ToString());
  std::string print_str = helper::utf8_to_ansi(*utf8_str);
  if (!print_.PrintRawData(print_str)) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "print failed")));
    return;
  }
}

void PrintUnionData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (args.Length() != 3) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument number error")));
    return;
  }
  if (!args[0]->IsString() &&
      !args[1]->IsString() &&
      !args[2]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument error")));
    return;
  }
  String::Utf8Value utf8_str_f(args[0]->ToString());
  std::string print_str_f = helper::utf8_to_ansi(*utf8_str_f);
  String::Utf8Value utf8_str_l(args[1]->ToString());
  std::string print_str_l = helper::utf8_to_ansi(*utf8_str_l);
  String::Utf8Value utf8_sgin_name(args[2]->ToString());
  std::string print_path = helper::utf8_to_ansi(*utf8_sgin_name);
  if (!print_.PrintUnionData(print_str_f,
                             print_str_l,
                             print_path)) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "print failed")));
    return;
  }
}

void PrintUnionReceipt(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (args.Length() != 2) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument number error")));
    return;
  }
  if (!args[0]->IsString() &&
      !args[1]->IsString() &&
      !args[2]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "argument error")));
    return;
  }
  String::Utf8Value utf8_str_f(args[0]->ToString());
  std::string print_str_f = helper::utf8_to_ansi(*utf8_str_f);
  String::Utf8Value utf8_str_l(args[1]->ToString());
  std::string print_str_l = helper::utf8_to_ansi(*utf8_str_l);
  if (!print_.PrintUnionReceipt(print_str_f, print_str_l)) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "print failed")));
    return;
  }
}

void IsOnline(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if (!print_.IsOnline()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "device not online")));
    return;
  }
}

void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "is_load", IsLoad);
  NODE_SET_METHOD(exports, "open", Open);
  NODE_SET_METHOD(exports, "close", Close);
  NODE_SET_METHOD(exports, "reset", Reset);
  NODE_SET_METHOD(exports, "print_raw_data", PrintRawData);
  NODE_SET_METHOD(exports, "print_union_data", PrintUnionData);
  NODE_SET_METHOD(exports, "print_union_receipt", PrintUnionReceipt);
  NODE_SET_METHOD(exports, "is_online", IsOnline);
}

void InitAll(Local<Object> exports) {
  Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)