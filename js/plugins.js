<video id="video1" controls style="width: 100%;height:5.96rem"></video>

window.plugins.html5Video.initialize({
            "video1" : "video/mov_aaa.mp4"
})

$scope.payGo =function(){
    //设置支付测试数据
    var charge={"id":"ch_ez9a5O9GSCy5fj5afHTGmvHG","object":"charge","created":1442542657,"livemode":false,"paid":false,"refunded":false,"app":"app_ir1uHKe9aHaL9SWn","channel":"upacp","order_no":"123456789","client_ip":"127.0.0.1","amount":100,"amount_settle":0,"currency":"cny","subject":"Your Subject","body":"Your Body","extra":{},"time_paid":null,"time_expire":1442546257,"time_settle":null,"transaction_no":null,"refunds":{"object":"list","url":"/v1/charges/ch_ez9a5O9GSCy5fj5afHTGmvHG/refunds","has_more":false,"data":[]},"amount_refunded":0,"failure_code":null,"failure_msg":null,"metadata":{},"credential":{"object":"credential","upacp":{"tn":"201509181017374044084","mode":"00"}},"description":null};
    try{
        pingpp.createPayment(charge, function(result){
            alert('suc: '+result);  //"success"
        })
        }, function(result){
            alert('err: '+result);  //"fail"|"cancel"|"invalid"
        });
    }
    catch(e){
        alert(e);
    }
}