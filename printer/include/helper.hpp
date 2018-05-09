// Copyright 2016 Accuree Inc. All rights reserved.
// author: (owen.li@accuree.com) owen.li

#ifndef HELPER_HPP
#define HELPER_HPP
#include <string>
#include <vector>
#include <array>
#include <windows.h>
#include <ctime>

class helper {
 public:
	static std::string wstring_to_string(const std::wstring& wstr) {
    int ascii_len = ::WideCharToMultiByte(CP_ACP, 0, wstr.c_str(), 
                                            -1, NULL, 0, NULL, NULL);
    std::string str(ascii_len, 0x00);
    ::WideCharToMultiByte(CP_ACP, 0, wstr.c_str(), -1, &str[0], 
                          ascii_len, NULL, NULL);
    return str.c_str();
	}

	static std::wstring string_to_wstring(const std::string& str) {
    int wide_len = ::MultiByteToWideChar(CP_ACP, 0, str.c_str(), 
                                          -1, NULL, 0);
    std::wstring wstr(wide_len, 0x00);
    ::MultiByteToWideChar(CP_ACP, 0, str.c_str(), -1, &wstr[0], wide_len);
    return wstr.c_str();
	}

	static std::string GetAppPath() {
		char szPath[MAX_PATH] = { 0 };
		GetModuleFileNameA(NULL, szPath, MAX_PATH);
		std::string strPath = szPath;
		std::size_t pos = strPath.find_last_of('\\');
		strPath = strPath.substr(0, pos);
		return strPath;
	}

	static bool is_ansi_string(const unsigned char* str, std::size_t nLen) {
		for (std::size_t i = 0; i != nLen; ++i) {
			unsigned char uc = str[i];
			if (uc & 0x80) {
				return false;
			}
		}
		return true;
	}

  static std::wstring utf8_to_utf16(const std::string& utf8_str) {
    int widesizde = ::MultiByteToWideChar(CP_UTF8, 0, 
                                          utf8_str.c_str(), -1, NULL, 0);
    std::vector<wchar_t> resultstring(widesizde);
    ::MultiByteToWideChar(CP_UTF8, 0, utf8_str.c_str(), -1, 
                          &resultstring[0], widesizde);
    return &resultstring[0];
  }

  static std::string uft16_to_utf8(const std::wstring& uft16_str) {
    int utf8size = ::WideCharToMultiByte(CP_UTF8, 0, uft16_str.c_str(), 
                                          -1, NULL, 0, NULL, NULL);
    std::vector<char> resultstring(utf8size);
    ::WideCharToMultiByte(CP_UTF8, 0, uft16_str.c_str(), -1, 
                          &resultstring[0], utf8size, NULL, NULL);
    return &resultstring[0];
  }


  static std::string utf8_to_ansi(const std::string& utf8_str) {
    return wstring_to_string(utf8_to_utf16(utf8_str));
  }

  static std::string ansi_to_utf8(const std::string& str) {
    return uft16_to_utf8(string_to_wstring(str));
  }

  static std::vector<unsigned char> hex_string_to_byte(
        const std::string & strHex) {
    std::vector<unsigned char> vbyte;
    if (strHex.length() % 2) {
	    return vbyte;
    }

    for (std::size_t i = 0; i != strHex.length(); ++i) {
	    std::array<char, 3> arr_hex = {strHex[i], strHex[++i]};
	    unsigned int b = 0;
	    sscanf_s(arr_hex.data(), "%x", &b);
	    vbyte.push_back((unsigned char)b);
    }

    return vbyte;
  }

	static std::string bytes_to_hex_string(const unsigned char* pbyte, 
                                         std::size_t len) {
		std::string str;
		for (std::size_t i = 0; i != len; ++i) {
			std::array<char, 3> b = { 0 };
			sprintf_s(b.data(), 3, "%02X", pbyte[i]);
			str += b.data();
		}
		return str;
	}

	static std::vector<std::string> split_with_null(const char* pstr) {
		std::vector<std::string> vRet;
		if (pstr == nullptr) {
			return vRet;
		}
		auto pbeg = pstr;
		auto pend = pstr;
		while (true) {
			if (*pend == 0x00) {
				vRet.push_back(std::string(pbeg, pend));
				pbeg = ++pend;
				if (*pend == 0x00) {
					break;
				}
			}
			++pend;
		}
		return vRet;
	}

	static std::string to_price(int nprice) {
		std::array<char, 20> arr_price = { 0 };
		sprintf_s(arr_price.data(), arr_price.size(), "%.2f", nprice/100.0);
		return std::string(arr_price.data());
	}

  static std::string to_price(double nprice) {
    std::array<char, 20> arr_price = {0};
    sprintf_s(arr_price.data(), arr_price.size(), "%.2f", nprice);
    return std::string(arr_price.data());
  }

	static std::wstring to_wprice(int nprice) {
		std::string strPrice = to_price(nprice);
		return string_to_wstring(strPrice);
	}

  static std::wstring to_wprice(double price) {
    std::array<char, 16> arr_price = { 0 };
    sprintf_s(arr_price.data(), arr_price.size(), "%.2f", price);
    return string_to_wstring(std::string(arr_price.data()));
  }

  static std::string get_date() {
		char szDate[11] = { 0 };
		time_t now = time(0);
		tm localtm = { 0 };
		localtime_s(&localtm, &now);
		strftime(szDate, 11, "%Y-%m-%d", &localtm);
		return szDate;
	}

  static std::string get_date_time() {
		char szDateTime[15] = { 0 };
		time_t now = time(0);
		tm localtm = { 0 };
		localtime_s(&localtm, &now);
		strftime(szDateTime, 15, "%Y%m%d%H%M%S", &localtm);
		return szDateTime;
	}

  static std::string date_time() {
		char szDateTime [20] = { 0 };
		time_t now = time(0);
		tm localtm = { 0 };
		localtime_s(&localtm, &now);
		strftime(szDateTime, 20, "%Y-%m-%d %H:%M:%S", &localtm);
		return szDateTime;
	}

  static std::string get_previous_time_(long long ti) {
		char szDateTime[15] = { 0 };
		time_t now_time = time(0);
		time_t pre_time(ti);
		now_time -= pre_time;
		tm localtm = { 0 };
		localtime_s(&localtm, &now_time);
		strftime(szDateTime, 15, "%Y%m%d%H%M%S", &localtm);
		return szDateTime;
	}
};

#endif
