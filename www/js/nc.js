var __nc = {
    post:function(a,b,c,f){
        console.log(a);
        console.log(b);
        return;
        $.ajax({
            type:"POST",
            url:a,
            data:b,
            dataType:"jsonp",
            timeout:25000,
            success:function(d){
                c(d);
            },
            error:function(request,status,err){
                f(request,status,err);
            }
        })
    }
}