#ifndef LOAD_DLL_HPP
#define LOAD_DLL_HPP

/*说明*/
//调用驱动打印时要在与打印机建立连接后调用打印

#include <Windows.h>

/*函数返回值*/
#define POS_SUCCESS 1001 //成功
#define POS_FAIL 1002 //失败
#define POS_ERROR_INVALID_HANDLE 1101 //端口或文件的句柄无效
#define POS_ERROR_INVALID_PARAMETER 1102 //参数无效
#define POS_ERROR_NOT_BITMAP 1103 //不是位图格式文件
#define POS_ERROR_NOT_MONO_BITMAP 1104 //位图不是单色的
#define POS_ERROR_BEYONG_AREA 1105 //位图超出打印机可处理大小
#define POS_ERROR_INVALID_PATH 1106 //没有找到指定的文件路径或名
#define POS_ERROR_FILE 1301 //错误的文件

/*指定串口通讯时的数据停止位*/
#define POS_COM_ONESTOPBIT 0x00 //停止位为1
#define POS_COM_ONE5STOPBIT 0x00 //停止位为1.5
#define POS_COM_TWOSTOPBIT 0x00 //停止位为2

/*指定串口的奇偶校验*/
#define POS_COM_NOPARITY 0x00 //无校验
#define POS_COM_ODDPARITY 0x01 //奇校验
#define POS_COM_EVENPARITY 0x02 //偶校验
#define POS_COM_MARKPARITY 0x03 //标记校验
#define POS_COM_SPACEPARITY 0x04 //空格校验

/*通讯方式*/
#define POS_COM_DTR_DSR 0x00 //控制流为DTR/DST
#define POS_COM_RTS_CTS 0x00 //控制流为RTS/CTS
#define POS_COM_XON_XOFF 0x00 //控制流为XON/OFF
#define POS_COM_NO_HANDSHAKE 0x00 //无握手
#define POS_OPEN_PARALLEL_PORT 0x12 //打开并口通讯端口
#define POS_OPEN_BYUSB_PORT 0x13 // 打开USB通讯端口 
#define POS_OPEN_PRINTNAME 0X14 //打开驱动程序端口
#define POS_OPEN_NETPORT 0X14 //打开网络接口

/*切纸模式*/
#define POS_CUT_MODE_FULL 0x00 //全切
#define POS_CUT_MODE_PARTIAL 0x01 //走纸一段并半切
#define POS_CUT_MODE_FULL_EX 0x02 //走纸一段并全切
#define POS_CUT_MODE_PARTIAL_EX 0x03 //半切

/*指定条码类型*/
#define POS_BARCODE_TYPE_UPC_A 0x41
#define POS_BARCODE_TYPE_UPC_E 0x42
#define POS_BARCODE_TYPE_JAN13 0x43
#define POS_BARCODE_TYPE_JAN8 0x44
#define POS_BARCODE_TYPE_CODE39 0x45
#define POS_BARCODE_TYPE_ITF 0x46
#define POS_BARCODE_TYPE_CODEBAR 0x47
#define POS_BARCODE_TYPE_CODE93 0x48
#define POS_BARCODE_TYPE_CODE128 0x49

/*位图打印模式*/
#define POS_BITMAP_MODE_8SINGLE_DENSITY 0x00 //8点单密度
#define POS_BITMAP_MODE_8DOUBLE_DENSITY 0x01 //8点双密度
#define POS_BITMAP_MODE_24SINGLE_DENSITY 0x20 //24点单密度
#define POS_BITMAP_MODE_24DOUBLE_DENSITY 0x21 //24点双密度

/*指定HRI字符位置*/
#define POS_HRI_POSITION_NONE 0x00 //不打印
#define POS_HRI_POSITION_ABOVE 0x01 //只在条码上方打印 
#define POS_HRI_POSITION_BELOW 0x02 //只在条码下方打印 
#define POS_HRI_POSITION_BOTH  0x03 //条码上、下方都打印

/*指定字符的字体类型*/
#define POS_FONT_TYPE_STANDARD 0x00//标准ASCII码打印
#define POS_FONT_TYPE_COMPRESSED 0x01//压缩ASCII码
#define POS_FONT_TYPE_UDC 0x02 //用户自定义字符
#define POS_FONT_TYPE_CHINESE 0x03//标准“宋体”

/*指定字符的字体风格*/
#define POS_FONT_STYLE_NORMAL 0x00 //正常
#define POS_FONT_STYLE_BOLD 0x08 //加粗

/*指定打印模式*/
#define POS_PRINT_MODE_STANDARD 0x00 //标准模式（行模式）
#define POS_PRINT_MODE_PAGE 0x01 //页模式
#define POS_PRINT_MODE_BLACK_MARK_LABEL 0x02 //黑标记标签模式
#define POS_PRINT_MODE_WHITE_MARK_LABEL 0x03 //白标记标签模式

/*指定字符对齐模式*/
#define POS_ALIGN_LEFT 0x00//居左对齐
#define POS_ALIGN_CENTER 0x01//居中对齐
#define POS_ALIGN_RIGHT 0x02 //居右对齐

class LoadPosDll {
public:
  //posdll.dll's hmodule
  HMODULE printer_dll = NULL;

  HMODULE GetHmodule() {
    return printer_dll;
  }

  //open
  typedef HANDLE(__stdcall *printer_open)(LPCSTR lpName,//需要打开的设备名称路径或串口号
                                          int nComBaudrate,
                                          int nComDataBits,
                                          int nComStopBits,
                                          int nComParity,
                                          int nParam);
  printer_open PrinterOpen = NULL;

  //close
  typedef int(__stdcall *printer_close)(void);
  printer_close PrinterClose = NULL;

  //reset
  typedef int(__stdcall *printer_reset)(void);
  printer_reset PrinterReset = NULL;

  //start doc
  typedef BOOL(__stdcall *printer_start_doc)(void);
  printer_start_doc PrinterStartDoc = NULL;

  //end doc
  typedef BOOL(__stdcall *printer_end_doc)(void);
  printer_end_doc PrinterEndDoc = NULL;

  //save to file
  typedef bool(__stdcall *printer_begin_save_file)(
    LPCSTR file_name,
    bool to_printer);
  printer_begin_save_file POSBeginSaveFile = NULL;

  //feed line
  typedef int(__stdcall *feed_line)();
  feed_line POSFeedLine = NULL;

  //cut paper
  typedef int(__stdcall * cut_paper)(int mode,
                                     int distance);
  cut_paper POSCutPaper = NULL;

  //print str
  typedef int(__stdcall *print_str)(char *pszString,
                                    int n_orgx,
                                    int n_width_times,
                                    int n_heightTimes,
                                    int n_font_type,
                                    int n_font_style);
  print_str POSPrintStr = NULL;

  //print img (now)
  typedef int(__stdcall * print_img)(char *psz_path,
                                     int n_orgx,
                                     int n_mode);
  print_img POSPrintImg = NULL;

  //set and print barcode
  typedef int(__stdcall * print_barcode)(char *psz_info_buffer,
                                         int n_orgx,
                                         int n_type,
                                         int n_width,
                                         int n_height,
                                         int n_hri_font_type,
                                         int n_hri_font_position,
                                         int n_bytes_to_print);
  print_barcode POSPrintBarcode = NULL;

  //set printer motion unit
  typedef int(__stdcall * printer_motion_unit)(
    int n_morizontal,
    int n_vertical);
  printer_motion_unit POSMotionUnit = NULL;

  //set printer print mode
  typedef int(__stdcall * printer_mode)(int n_print_node);
  printer_mode POSPrinterMode = NULL;

  //set align mode
  typedef int(__stdcall * align_mode)(int n_align_node);
  align_mode POSAlignMode = NULL;

  //set another handle
  typedef HANDLE(__stdcall * set_handle)(HANDLE new_handle);
  set_handle POSSetHandle = NULL;

  //load POSDLL.dll
  bool LoadDll(void) {
    printer_dll = LoadLibrary(L"POSDLL.dll");
    if (!printer_dll)
      return false;

    //open 
    PrinterOpen = (printer_open)GetProcAddress(
      printer_dll,
      "POS_Open");
    if (PrinterOpen == NULL) {
      return false;
    }
    //close
    PrinterClose = (printer_close)GetProcAddress(
      printer_dll,
      "POS_Close");
    if (NULL == PrinterClose)
      return false;
    PrinterStartDoc = (printer_start_doc)GetProcAddress(
      printer_dll,
      "POS_StartDoc");
    if (NULL == PrinterStartDoc)
      return false;
    //end doc
    PrinterEndDoc = (printer_end_doc)GetProcAddress(
      printer_dll,
      "POS_EndDoc");
    if (NULL == PrinterEndDoc)
      return false;
    //reset
    PrinterReset = (printer_reset)GetProcAddress(
      printer_dll,
      "POS_Reset");
    if (NULL == PrinterReset)
      return false;
    //feed line
    POSFeedLine = (feed_line)GetProcAddress(
      printer_dll,
      "POS_FeedLine");
    if (NULL == PrinterReset)
      return false;
    //cut paper
    POSCutPaper = (cut_paper)GetProcAddress(
      printer_dll,
      "POS_CutPaper");
    if (NULL == POSCutPaper)
      return false;
    //print str
    POSPrintStr = (print_str)GetProcAddress(
      printer_dll,
      "POS_S_TextOut");
    if (NULL == POSPrintStr)
      return false;
    //print img (now)
    POSPrintImg = (print_img)GetProcAddress(
      printer_dll,
      "POS_S_DownloadAndPrintBmp");
    if (NULL == POSPrintImg)
      return false;
    //print and set barcode
    POSPrintBarcode = (print_barcode)GetProcAddress(
      printer_dll,
      "POS_S_SetBarcode");
    if (NULL == POSPrintBarcode)
      return false;
    //set printer motion unit
    POSMotionUnit = (printer_motion_unit)GetProcAddress(
      printer_dll,
      "POS_SetMotionUnit");
    if (NULL == POSMotionUnit)
      return false;
    //set printer print mode
    POSPrinterMode = (printer_mode)GetProcAddress(
      printer_dll,
      "POS_SetMode");
    if (NULL == POSPrinterMode)
      return false;
    //set align mode
    POSAlignMode = (printer_mode)GetProcAddress(
      printer_dll,
      "POS_S_SetAlignMode");
    if (NULL == POSAlignMode)
      return false;
    //save to file 
    POSBeginSaveFile = (printer_begin_save_file)GetProcAddress(
      printer_dll,
      "POS_BeginSaveFile");
    if (NULL == POSBeginSaveFile)
      return false;
    //set new handle
    POSSetHandle = (set_handle)GetProcAddress(
      printer_dll,
      "POS_SetHandle");
    if (NULL == POSSetHandle)
      return false;

    return true;
  }

  void UnLoad() {
    FreeLibrary(printer_dll);
  }
};


#endif