var language = "Chinese";								//用作中英文切换的字符
function changeLanguage() {
    if(language=="Chinese") {
	//entrance
	$("#acupos").text("Welcome to use the machine");
	$("#language_change").text("中文");
	$("#way_choice").text("Shopping Way");
	$("#way_member").text("Shopping");
	$("#help_entrance").text("Help");
	//vip
	$("#vip_text").text("Please Scan QR code");
	$("#back_vip").text("Back");
	$("#vip_code_clean").text("Clean");
	$("#vip_code_submit").text("Submit");
	$("#vipno").text("vip card :");
	$("#vipno_point").text("vip point:");
	//container
	//清单页
	$("#nogoodswarning_container strong").text("prompt：");
	$("#nogoodswarning_container b").text("goods not exist");
	$("#scan_type strong").text("prompt：");
	$("#scan_type b").text("Please put the goods in “Scanned goods”");
	$("#list_title").text("Commodity List");
	$("#extratb tr th:eq(0)").text("No");
	$("#extratb tr th:eq(1)").text("Product Name");
	$("#extratb tr th:eq(2)").text("Price");
	$("#extratb tr th:eq(3)").text("Number");
	$("#extratb tr th:eq(4)").text("Money");
	$("#list_num b").text("Amount: ");
	$("#list_num strong").text(" piece");
	$("#list_sum b").text("Total:");
	
	$("#pay_text").text("Please Select Payment Method");
	$("#alipay div").text("Alipay");
	$("#wechat div").text("WeChat");
	$("#artificialpay div").text("Manpower");
	$("#prepaidcard div").text("Gift Card");
	$("#bankcard div").text("Bankcard");
	$("#cash div").text("Cash");
	$("#total_text").text("Total:");
	$("#total_box_text").text("Total:");
	$("#discount").text("Discount:");
	$("#pocket").text("Payment:");
	$("#paidamount").text("Paid:");
	$("#copylist_method_word").text("Please wait for administrator authorization");
	$("#cash_method_word").text("Please Cash");
	$("#bankcard_method_word").text("Please use Bank Card");
	$("#bankcard_pwd_word").text("Please enter the bank card password");
	
	$("#bankcard_reminder").text("(Friendly Reminder：Enter password and click“确认”)");
	$("#bankcard_reminder_bottom").text("(Warm Prompt：Please take away the bank card at the end of the transaction)");
	//银行卡一大堆东西
	$("#play_signature").text("Please Signature:");
	$("#white_again").text("Again");
	$("#I_Will").text("Notarize");
	$("#transition_now_word_text").text("Wait a moment");
	//预付卡
	$("#petcard_method_word").text("Please use Gift Card");
	$("#petcard_pwd_word").text("Please enter the Gift Card password");
	$("#pet_code_clean").text("Clean");
	$("#pet_code_submit").text("Submit");
	$("#combination_method_word").text("If the prepaid card is insufficient, the payment will be made in other ways to make complement.");
	$("#combination_method_yes").text("Yes");
	$("#combination_method_no").text("No");
	//container 底部保留的东西
	$("#barcode_container").text("Input Barcode");
	$("#paynow_method_pay").text("Payment");
	$("#canceldeal_container").text("CANCELLED");
	$("#back_screen_pay").text("CANCELLED");
	
	$("#beginclosetrans_text").text("CANCELLED??")
	$("#beginclosetrans_false b").text("No");
	$("#beginclosetrans_true b").text("Yes");
	
	$("#help_container").text("Help");
	$("#back_container").text("Back");
	$("#help_container_pay").text("Help");
	$("#back_container_pay").text("Back");
	
	//barcode
	$("#code_clean").text("clean");
	$("#code_submit").text("submit");
	$("#help_barcode").text("Help");
	$("#back_barcode").text("Back");
	
	$("#word_paysuccess").text("Payment Success");
	$("#word2_paysuccess").text("Please take your receipts and take your goods");
	$("#cancelhelp_needhelp").text("Back");
	
	$("#word_needhelp>div>div:eq(0)").text("Wait a moment");
	$("#word_needhelp>div>div:eq(1)").text("Contacting administrator");
	
	language = "English";
    }else{
	$("#language_change").text("English");
	$("#acupos").text("欢迎光临24h自助超市");
	$("#way_choice").text("请 选 择 购 物 方 式");
	$("#way_member").text("开始购物");
	$("#help_entrance").text("帮 助");
	
	$("#vip_text").text("请 扫 码 登 录");
	$("#back_vip").text("返 回");
	$("#vip_code_clean").text("清空");
	$("#vip_code_submit").text("确认");
	$("#vipno").text("会员卡号:");
	$("#vipno_point").text("会员积分:");
	//清单页
	$("#nogoodswarning_container strong").text("提示：");
	$("#nogoodswarning_container b").text("该商品不存在");
	$("#scan_type strong").text("提示：");
	$("#scan_type b").text("请将扫描好的商品放在“已扫描商品放置区”");
	$("#list_title").text("商品清单");
	$("#extratb tr th:eq(0)").text("序号");
	$("#extratb tr th:eq(1)").text("商品名称");
	$("#extratb tr th:eq(2)").text("单价");
	$("#extratb tr th:eq(3)").text("数量");
	$("#extratb tr th:eq(4)").text("金额");
	$("#list_num b").text("商品总数：");
	$("#list_num strong").text("件");
	$("#list_sum b").text("商品总价：");
	
	$("#pay_text").text("请 选 择 支 付 方 式");
	$("#alipay div").text("支付宝支付");
	$("#wechat div").text("微信支付");
	$("#artificialpay div").text("人工收银");
	$("#prepaidcard div").text("预付卡支付");
	$("#bankcard div").text("银行卡支付");
	$("#cash div").text("现金支付");
	$("#total_text").text("总价:");
	$("#total_box_text").text("总价:");
	$("#discount").text("折扣:");
	$("#pocket").text("应付:");
	$("#paidamount").text("已付:");
	$("#copylist_method_word").text("请 等 待 管 理 员 授 权");
	$("#cash_method_word").text("请 投 放 现 金");
	$("#bankcard_method_word").text("请 使 用 银 行 卡");
	$("#bankcard_pwd_word").text("请 输 入 银 行 卡 密 码");
	$("#bankcard_reminder").text("((友情提示：密码输入完成，请按“确认”键结束))");
	$("#bankcard_reminder_bottom").text("(温馨提示：交易完成后，请取走您的“银行卡”)");
	
	$("#play_signature").text("请 您 签 字：");
	$("#white_again").text("重新书写");
	$("#I_Will").text("确认签字");
	$("#transition_now_word_text").text("正 在 处 理 请 稍 候");
	//预付卡暂时没处理
	$("#petcard_method_word").text("请 使 用 预 付 卡");
	$("#petcard_pwd_word").text("请 输 入 预 付 卡 密 码");
	$("#pet_code_clean").text("清空");
	$("#pet_code_submit").text("确认");
	$("#combination_method_word").text("预付卡余额不足，是否使用其他方式组合支付");
	$("#combination_method_yes").text("是");
	$("#combination_method_no").text("否");
	
	$("#barcode_container").text("手动输入条码");
	$("#paynow_method_pay").text("准备付款");
	$("#canceldeal_container").text("取消交易");
	$("#back_screen_pay").text("取消交易");
	
	$("#beginclosetrans_text").text("是否取消此次操作?")
	$("#beginclosetrans_false b").text("否");
	$("#beginclosetrans_true b").text("是");
	
	$("#help_container").text("帮 助");
	$("#help_container_pay").text("帮 助");
	$("#back_container").text("返 回");
	$("#back_container_pay").text("返 回");
	
	$("#code_clean").text("清空");
	$("#code_submit").text("确认");
	$("#help_barcode").text("帮 助");
	$("#back_barcode").text("返 回");
	
	$("#word_paysuccess").text("支 付 成 功");
	$("#word2_paysuccess").text("请 取 走 小 票，拿 好 商 品");
	$("#cancelhelp_needhelp").text("取 消");
	
	$("#word_needhelp>div>div:eq(0)").text("请稍候");
	$("#word_needhelp>div>div:eq(1)").text("正在联系管理员");
	
	language = "Chinese";
    }
}
