#ifndef LIGHT_H
#define LIGHT_H

#ifdef LIGHT_H
#define LIGHT_API __declspec(dllexport)
#else
#define LIGHT_API __declspec(dllimport)
#endif

#include <system_error>
#include <string>
#include "light_status.hpp"

class LIGHT_API light {
public:
	light();
	~light();

	bool is_open();
	std::error_code open(const std::string& device, std::error_code& ec);
	std::error_code close(std::error_code& ec);
	std::error_code status(light_status& stu, std::error_code& ec);
	
	std::error_code set_all(led_state st, std::error_code& ec);
	std::error_code set_white(led_state st, std::error_code& ec);
	std::error_code set_red(led_state st, std::error_code& ec);
	std::error_code set_green(led_state st, std::error_code& ec);
	std::error_code set_cash_in(led_state st, std::error_code& ec);
	std::error_code set_cash_out(led_state st, std::error_code& ec);
	std::error_code set_epp(led_state st, std::error_code& ec);
	std::error_code set_card(led_state st, std::error_code& ec);
	std::error_code set_epp_l(led_state st, std::error_code& ec);
	std::error_code set_cash_out_l(led_state st, std::error_code& ec);
	std::error_code set_lock_l(led_state st, std::error_code& ec);

	void open(const std::string& device);
	void close();
	light_status status();

	void set_white(led_state st);
	void set_red(led_state st);
	void set_green(led_state st);
	void set_cash_in(led_state st);
	void set_cash_out(led_state st);
	void set_epp(led_state st);
	void set_card(led_state st);
	void set_epp_l(led_state st);
	void set_cash_out_l(led_state st);
	void set_lock_l(led_state st);
	void set_all(led_state st);
private:
	struct impl;
	impl* pImpl;
};

#endif
