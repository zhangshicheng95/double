#ifndef LOAD_DLL_HPP
#define LOAD_DLL_HPP

/*˵��*/
//����������ӡʱҪ�����ӡ���������Ӻ���ô�ӡ

#include <Windows.h>

/*��������ֵ*/
#define POS_SUCCESS 1001 //�ɹ�
#define POS_FAIL 1002 //ʧ��
#define POS_ERROR_INVALID_HANDLE 1101 //�˿ڻ��ļ��ľ����Ч
#define POS_ERROR_INVALID_PARAMETER 1102 //������Ч
#define POS_ERROR_NOT_BITMAP 1103 //����λͼ��ʽ�ļ�
#define POS_ERROR_NOT_MONO_BITMAP 1104 //λͼ���ǵ�ɫ��
#define POS_ERROR_BEYONG_AREA 1105 //λͼ������ӡ���ɴ����С
#define POS_ERROR_INVALID_PATH 1106 //û���ҵ�ָ�����ļ�·������
#define POS_ERROR_FILE 1301 //������ļ�

/*ָ������ͨѶʱ������ֹͣλ*/
#define POS_COM_ONESTOPBIT 0x00 //ֹͣλΪ1
#define POS_COM_ONE5STOPBIT 0x00 //ֹͣλΪ1.5
#define POS_COM_TWOSTOPBIT 0x00 //ֹͣλΪ2

/*ָ�����ڵ���żУ��*/
#define POS_COM_NOPARITY 0x00 //��У��
#define POS_COM_ODDPARITY 0x01 //��У��
#define POS_COM_EVENPARITY 0x02 //żУ��
#define POS_COM_MARKPARITY 0x03 //���У��
#define POS_COM_SPACEPARITY 0x04 //�ո�У��

/*ͨѶ��ʽ*/
#define POS_COM_DTR_DSR 0x00 //������ΪDTR/DST
#define POS_COM_RTS_CTS 0x00 //������ΪRTS/CTS
#define POS_COM_XON_XOFF 0x00 //������ΪXON/OFF
#define POS_COM_NO_HANDSHAKE 0x00 //������
#define POS_OPEN_PARALLEL_PORT 0x12 //�򿪲���ͨѶ�˿�
#define POS_OPEN_BYUSB_PORT 0x13 // ��USBͨѶ�˿� 
#define POS_OPEN_PRINTNAME 0X14 //����������˿�
#define POS_OPEN_NETPORT 0X14 //������ӿ�

/*��ֽģʽ*/
#define POS_CUT_MODE_FULL 0x00 //ȫ��
#define POS_CUT_MODE_PARTIAL 0x01 //��ֽһ�β�����
#define POS_CUT_MODE_FULL_EX 0x02 //��ֽһ�β�ȫ��
#define POS_CUT_MODE_PARTIAL_EX 0x03 //����

/*ָ����������*/
#define POS_BARCODE_TYPE_UPC_A 0x41
#define POS_BARCODE_TYPE_UPC_E 0x42
#define POS_BARCODE_TYPE_JAN13 0x43
#define POS_BARCODE_TYPE_JAN8 0x44
#define POS_BARCODE_TYPE_CODE39 0x45
#define POS_BARCODE_TYPE_ITF 0x46
#define POS_BARCODE_TYPE_CODEBAR 0x47
#define POS_BARCODE_TYPE_CODE93 0x48
#define POS_BARCODE_TYPE_CODE128 0x49

/*λͼ��ӡģʽ*/
#define POS_BITMAP_MODE_8SINGLE_DENSITY 0x00 //8�㵥�ܶ�
#define POS_BITMAP_MODE_8DOUBLE_DENSITY 0x01 //8��˫�ܶ�
#define POS_BITMAP_MODE_24SINGLE_DENSITY 0x20 //24�㵥�ܶ�
#define POS_BITMAP_MODE_24DOUBLE_DENSITY 0x21 //24��˫�ܶ�

/*ָ��HRI�ַ�λ��*/
#define POS_HRI_POSITION_NONE 0x00 //����ӡ
#define POS_HRI_POSITION_ABOVE 0x01 //ֻ�������Ϸ���ӡ 
#define POS_HRI_POSITION_BELOW 0x02 //ֻ�������·���ӡ 
#define POS_HRI_POSITION_BOTH  0x03 //�����ϡ��·�����ӡ

/*ָ���ַ�����������*/
#define POS_FONT_TYPE_STANDARD 0x00//��׼ASCII���ӡ
#define POS_FONT_TYPE_COMPRESSED 0x01//ѹ��ASCII��
#define POS_FONT_TYPE_UDC 0x02 //�û��Զ����ַ�
#define POS_FONT_TYPE_CHINESE 0x03//��׼�����塱

/*ָ���ַ���������*/
#define POS_FONT_STYLE_NORMAL 0x00 //����
#define POS_FONT_STYLE_BOLD 0x08 //�Ӵ�

/*ָ����ӡģʽ*/
#define POS_PRINT_MODE_STANDARD 0x00 //��׼ģʽ����ģʽ��
#define POS_PRINT_MODE_PAGE 0x01 //ҳģʽ
#define POS_PRINT_MODE_BLACK_MARK_LABEL 0x02 //�ڱ�Ǳ�ǩģʽ
#define POS_PRINT_MODE_WHITE_MARK_LABEL 0x03 //�ױ�Ǳ�ǩģʽ

/*ָ���ַ�����ģʽ*/
#define POS_ALIGN_LEFT 0x00//�������
#define POS_ALIGN_CENTER 0x01//���ж���
#define POS_ALIGN_RIGHT 0x02 //���Ҷ���

class LoadPosDll {
public:
  //posdll.dll's hmodule
  HMODULE printer_dll = NULL;

  HMODULE GetHmodule() {
    return printer_dll;
  }

  //open
  typedef HANDLE(__stdcall *printer_open)(LPCSTR lpName,//��Ҫ�򿪵��豸����·���򴮿ں�
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