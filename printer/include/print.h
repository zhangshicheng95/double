 //Copyright 2017 Accuree Inc. All rights reserved.
 //Author: liding.li@accuree

#pragma once
#ifndef PRINTER_H
#define PRINTER_H

#include "loaddll.hpp"
#include "helper.hpp"
#include <string>
#include <stdio.h>  
#include <windows.h>  
#include <SetupAPI.h>  
#include <iostream>  
#include <Usbiodef.h>  
#include <Usbioctl.h>  
#include <devguid.h>  
#include <winioctl.h>  
#include <INITGUID.h>  
#include <Dbt.h>  
#include <map>  
#include <wchar.h>  
#include <tchar.h>
#pragma comment(lib, "Winmm.lib")  
#pragma comment(lib, "setupapi.lib")  

DEFINE_GUID(GUID_DEVINTERFACE_USB_DEVICE,
            0xA5DCBF10L, 0x6530, 0x11D2, 0x90, 0x1F, 0x00, 0xC0, 0x4F, 0xB9, 0x51, 0xED);
#define GUID_CLASS_USB_DEVICE GUID_DEVINTERFACE_USB_DEVICE    



DEFINE_GUID(GUID_DEVINTERFACE_USB_HUB,
            0xf18a0e88, 0xc30c, 0x11d0, 0x88, 0x15, 0x00, 0xa0, 0xc9, 0x06, 0xbe, 0xd8);

#define GUID_CLASS_USB_HUB GUID_DEVINTERFACE_USB_HUB 

class Print {
public:
  Print();
  ~Print();
  bool IsLoad();
  bool DriveOpen();
  bool UsbOpen();
  bool Close();
  bool Reset();

  bool PrintRawData(const std::string& strData);
  bool PrintUnionData(const std::string& union_pay_data_f,
                      const std::string& union_pay_data_l,
                      const std::string& sign_name);
  bool PrintUnionReceipt(const std::string& union_pay_data_f,
                         const std::string& union_pay_data_l);

  bool IsOnline();

private:
  //��ӡ��ҵ(��������ǰ��ʹ��)  
  bool StartPrintDoc();
  bool EndPrintDoc();
  //��ֽ
  bool FeedLine();
  //��ӡ�ַ���
  bool PrintStr(std::string& str,
                int width,//1~6,���ô�СΪ1
                int height);//1~6���ô�СΪ1
  //��ӡbmpͼƬ
  //path:ͼƬ·�� orgx:������߾����0-65535
  bool PrintBmp(char* path, int orgx);
  //��ӡ������
  bool PrintBarcode(char* barcode);
  //��ֽ
  bool CutPaper(int mode);
  //���ô�ӡ���ƶ���λ
  bool SetMotionUnit(int horizontal,
                     int vertical);
  //���ô�ӡģʽ
  bool SetMode(int mode);
  //�����ַ�����ģʽ
  bool SetAlignMode(int mode);
  //������
  bool SetHandle();
  //��ȡ����
  std::string GetConfigStr(std::string type, std::string data);
private:
  LoadPosDll load_pos_dll_;
  HANDLE printer_handle_;
  bool is_load_;
  int result_;
};
#endif