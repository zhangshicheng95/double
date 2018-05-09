#include "print.h"

Print::Print() :printer_handle_(NULL),
is_load_(false),
result_(POS_FAIL) {
  is_load_ = load_pos_dll_.LoadDll();
}

Print::~Print() {
  load_pos_dll_.UnLoad();
}

bool Print::IsLoad() {
  return is_load_;
}

bool Print::DriveOpen() {
  std::string printer_name = GetConfigStr("Printer", "Type");
  printer_handle_ = load_pos_dll_.PrinterOpen(printer_name.c_str(),
                                              0, 0, 0, 0,
                                              POS_OPEN_PRINTNAME);
  if (INVALID_HANDLE_VALUE == printer_handle_)
    return false;
  return true;
}

bool Print::UsbOpen() {
  std::string port = GetConfigStr("Printer", "Type");
  printer_handle_ = load_pos_dll_.PrinterOpen(port.c_str(),
                                              0, 0, 0, 0,
                                              POS_OPEN_PARALLEL_PORT);
  if (INVALID_HANDLE_VALUE == printer_handle_)
    return false;
  return true;
}

bool Print::Close() {
  if (!load_pos_dll_.PrinterClose())
    return false;
  return true;
}

bool Print::Reset() {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.PrinterReset();
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::StartPrintDoc() {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.PrinterStartDoc();
  if (!result_)
    return false;
  return true;
}

bool Print::EndPrintDoc() {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.PrinterEndDoc();
  if (!result_)
    return false;
  return true;
}

bool Print::FeedLine() {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSFeedLine();
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::PrintStr(std::string& str,
                       int width,
                       int height) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSPrintStr((char*)str.c_str(),
                                      20, width, height,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::PrintBmp(char* path, int orgx) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSPrintImg(path, orgx,
                                      POS_BITMAP_MODE_8SINGLE_DENSITY);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::PrintBarcode(char* barcode) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSPrintBarcode(barcode,
                                          40, POS_BARCODE_TYPE_CODE128,
                                          2, 50, POS_FONT_TYPE_COMPRESSED,
                                          POS_HRI_POSITION_BOTH, 13);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::CutPaper(int mode) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSCutPaper(mode, 0);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::SetMotionUnit(int morizontal,
                            int vertical) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSMotionUnit(morizontal, vertical);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::SetMode(int mode) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSPrinterMode(mode);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::SetAlignMode(int align_mode) {
  result_ = POS_FAIL;
  result_ = load_pos_dll_.POSAlignMode(align_mode);
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::SetHandle() {
  if (INVALID_HANDLE_VALUE ==
      load_pos_dll_.POSSetHandle(printer_handle_))
    return false;
  return true;
}

bool Print::PrintRawData(const std::string& strData) {
  result_ = POS_FAIL;
  if (!load_pos_dll_.PrinterStartDoc())
    return false;
  result_ = load_pos_dll_.POSPrintStr((char*)strData.c_str(),
                                      20, 1, 1,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  if (POS_SUCCESS != result_)
    return false;
  result_ = load_pos_dll_.POSFeedLine();
  if (POS_SUCCESS != result_)
    return false;
  result_ = load_pos_dll_.POSFeedLine();
  if (POS_SUCCESS != result_)
    return false;
  result_ = load_pos_dll_.POSCutPaper(POS_CUT_MODE_PARTIAL, 0);
  if (POS_SUCCESS != result_)
    return false;
  if (!load_pos_dll_.PrinterEndDoc()) {
    return false;
  }
  return true;
}

bool Print::PrintUnionData(const std::string& union_pay_data_f,
                           const std::string& union_pay_data_l,
                           const std::string& sign_name) {
  result_ = POS_FAIL;
  if (!load_pos_dll_.PrinterStartDoc())
    return false;
  result_ = load_pos_dll_.POSPrintStr((char*)union_pay_data_f.c_str(),
                                      20, 1, 1,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  result_ = load_pos_dll_.POSFeedLine();
  result_ = load_pos_dll_.POSPrintImg((char*)sign_name.c_str(), 50,
                                      POS_BITMAP_MODE_8SINGLE_DENSITY);
  result_ = load_pos_dll_.POSFeedLine();
  result_ = load_pos_dll_.POSPrintStr((char*)union_pay_data_l.c_str(),
                                      20, 1, 1,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  result_ = load_pos_dll_.POSCutPaper(POS_CUT_MODE_PARTIAL, 0);
  result_ = load_pos_dll_.POSFeedLine();
  load_pos_dll_.PrinterEndDoc();
  if (POS_SUCCESS != result_)
    return false;
  return true;
}

bool Print::PrintUnionReceipt(const std::string& union_pay_data_f,
                              const std::string& union_pay_data_l) {
  result_ = POS_FAIL;
  if (!load_pos_dll_.PrinterStartDoc())
    return false;
  result_ = load_pos_dll_.POSPrintStr((char*)union_pay_data_f.c_str(),
                                      20, 1, 1,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  result_ = load_pos_dll_.POSFeedLine();
  result_ = load_pos_dll_.POSPrintStr((char*)union_pay_data_l.c_str(),
                                      20, 1, 1,
                                      POS_FONT_TYPE_STANDARD,
                                      POS_FONT_STYLE_NORMAL);
  result_ = load_pos_dll_.POSCutPaper(POS_CUT_MODE_PARTIAL, 0);
  result_ = load_pos_dll_.POSFeedLine();
  load_pos_dll_.PrinterEndDoc();
  if (POS_SUCCESS != result_)
    return false;
  return true;
}


bool Print::IsOnline() {
  LPGUID lp_guid = (LPGUID)&GUID_CLASS_USB_DEVICE;//  
  HDEVINFO info = SetupDiGetClassDevs(lp_guid,
                                      NULL, NULL,
                                      DIGCF_PRESENT | DIGCF_INTERFACEDEVICE);

  //enumerate device information    
  DWORD required_size = 0;
  int i;
  SP_DEVINFO_DATA device_info_data = { sizeof(device_info_data) };

  DWORD data;
  DWORD buffersize = 1024;
  DWORD req_bufsize = 0;

  for (i = 0; SetupDiEnumDeviceInfo(info, i, &device_info_data); i++) {
    WCHAR did[512] = L"";
    WCHAR hardwareid[512] = L"";
    WCHAR hope_result[512] = L"";
    std::wstring printer_info =
        helper::string_to_wstring(GetConfigStr("Printer", "DeviceInfo"));
    swprintf(hope_result,
             printer_info.size() + 1,
             L"%s",
             printer_info.c_str());
    //get device description information  
    if (!SetupDiGetDeviceInstanceId(info,
      &device_info_data,
      (PTSTR)did,
      buffersize,
      &req_bufsize))
      continue;
    if (!SetupDiGetDeviceRegistryPropertyW(info,
      &device_info_data,
      SPDRP_HARDWAREID,
      &data,
      (LPBYTE)hardwareid,
      buffersize,
      &req_bufsize))
      continue;
    if (0 == memcmp(hardwareid, hope_result, 30)) {
      SetupDiDestroyDeviceInfoList(info);
      return true;
    }
  }
  SetupDiDestroyDeviceInfoList(info);
  return false;
}

std::string Print::GetConfigStr(std::string type, std::string data) {
  std::string s_path = "C:\\QYI\\config.ini";
  char c_data[256] = { 0 };
  memset(c_data, 0x00, sizeof(c_data));
  GetPrivateProfileStringA(type.c_str(), data.c_str(), "get_error",
                           c_data, sizeof(c_data), s_path.c_str());
  std::string result = c_data;
  return result;
}