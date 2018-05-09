#ifndef LIGHT_STATUS_HPP
#define LIGHT_STATUS_HPP

#include <vector>
#include <accuree_define.hpp>

enum class led_state {
	off = 0x00,
	on = 0x01,
	blink = 0x04
};

class light_status {
public:
	light_status() { }
	light_status(std::vector<byte>& vstu) : data_(vstu) { }

	bool is_cash_unit_full() {
		return data_[0] == 0x01;
	}

	bool is_cash_unit_arrived() {
		return data_[1] == 0x01;
	}

	bool is_custom_arrived() {
		return data_[2] == 0x00;
	}

	led_state get_red_state() {
		return get_led_state(data_[3]);
	}

	led_state get_white_state() {
		return get_led_state(data_[4]);
	}

	led_state get_card_state() {
		return get_led_state(data_[9]);
	}

private:
	led_state get_led_state(byte b) {
		if (b == 0x00) {
			return led_state::off;
		}
		else if (b == 0x01) {
			return led_state::off;
		}
		else {
			return led_state::blink;
		}
	}
private:
	std::vector<byte> data_;
};

#endif
