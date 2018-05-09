#include <node.h>
#include "indicator.h"

using namespace v8;


void InitAll(Local<Object> exports) {
  Indicator::Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)