// copyright
// 

#ifndef INDICATOR_H
#define INDICATOR_H

#include <node.h>
#include <node_object_wrap.h>
#include "light.h"

class Indicator : public node::ObjectWrap {
public:
  static void Init(v8::Local<v8::Object> exports);

private:
  Indicator();
  ~Indicator();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void Open(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void Close(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void SetWhite(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void SetRed(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void SetGreen(const v8::FunctionCallbackInfo<v8::Value>& args);

  static void Set(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;

  light light_;
};


#endif // INDICATOR_H 