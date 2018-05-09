#include "indicator.h"
#include <thread>
#include <string>

using namespace v8;

// 灯设置部分代码类似，采用宏定义
#define SET(name,call_fn)   \
void Indicator:: ## name( const FunctionCallbackInfo<Value>& args) { \
  Isolate* isolate = args.GetIsolate(); \
  if (args.Length() != 1) { \
    isolate->ThrowException(Exception::TypeError( \
      String::NewFromUtf8(isolate, "argument number error"))); \
    return; \
  } \
  if (!args[0]->IsString()) { \
    isolate->ThrowException(Exception::TypeError( \
      String::NewFromUtf8(isolate, "argument error"))); \
    return; \
  } \
  led_state state = led_state::on; \
  String::Utf8Value utf8_port(args[0]->ToString()); \
  std::string state_str = *utf8_port;      \
  if (state_str == "on") { \
    state = led_state::on; \
  } else if (state_str == "off") { \
    state = led_state::off; \
  } else if (state_str == "blink") { \
    state = led_state::blink; \
  } else { \
    isolate->ThrowException(Exception::TypeError( \
      String::NewFromUtf8(isolate, "led state error"))); \
    return; \
  } \
  Indicator* indicator = ObjectWrap::Unwrap<Indicator>(args.Holder()); \
  std::error_code ec; \
  if (indicator->light_. ## call_fn(state, ec)) { \
    isolate->ThrowException(Exception::TypeError( \
        String::NewFromUtf8(isolate, ec.message().c_str()))); \
    return; \
  } \
}

Persistent<Function> Indicator::constructor;

Indicator::Indicator() {

}

Indicator::~Indicator() {

}

void Indicator::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "Indicator"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  NODE_SET_PROTOTYPE_METHOD(tpl, "open", Open);
  NODE_SET_PROTOTYPE_METHOD(tpl, "close", Close);
  NODE_SET_PROTOTYPE_METHOD(tpl, "setWhite", SetWhite);
  NODE_SET_PROTOTYPE_METHOD(tpl, "setRed", SetRed);
  NODE_SET_PROTOTYPE_METHOD(tpl, "setGreen", SetGreen);
  
  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "indicator"), tpl->GetFunction());
}

void Indicator::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    Indicator* indicator = new Indicator;
    indicator->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    //const int argc = 1;
    //Local<Value> argv[argc] = { args[0] };
    Local<Context> context = isolate->GetCurrentContext();
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> result = 
        cons->NewInstance(context, 0, nullptr).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

void Indicator::Open(const FunctionCallbackInfo<Value>& args) {
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
  String::Utf8Value utf8_port(args[0]->ToString());
  std::string port = *utf8_port;
  Indicator* indicator = ObjectWrap::Unwrap<Indicator>(args.Holder());
  std::error_code ec;
  if (indicator->light_.open(port, ec)) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, ec.message().c_str())));
    return;
  }
}

void Indicator::Close(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Indicator* indicator = ObjectWrap::Unwrap<Indicator>(args.Holder());
  std::error_code ec;
  if (indicator->light_.close(ec)) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, ec.message().c_str())));
    return;
  }
}


SET(SetWhite, set_white)

SET(SetRed, set_red)

SET(SetGreen, set_green)