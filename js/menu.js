$(function(){
    let $data;
    $.ajax({
        url:"./menu/menu.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.menus($data);
        },
        error:function(){
            console.log("통신오류")
        }
    });

    $.fn.menus=function($data){

        var $uls="<ul></ul><ul></ul>"
        $("#box3_sp").append($uls);
        $($data).each(function($a1,$a2){
            
            if($a1<6){

                var $ullis="<li id='liid"+$a1+"'>"+$data[$a1]["menus"]+"<ol></ol></li>"
                $("#box3_sp>ul").eq(0).append($ullis);
                if($data[$a1]["cate"][0]!=""){
                    
                    $($data[$a1]["cate"]).each(function($b1,$b2){
                        var $ollis="<li>"+$data[$a1]["cate"][$b1]+"</li>"
                        $("#liid"+$a1+">ol").append($ollis);
                    })

                    $("#liid"+$a1).bind({
                        "mouseenter":function(){
                            $("#liid"+$a1+">ol").slideDown(300)
                        },
                        "mouseleave":function(){
                            $("#liid"+$a1+">ol").slideUp(100)
                        }
                    })
                }
            }
            else{
                var $ullis="<li>"+$data[$a1]["menus"]+"</li>"
                $("#box3_sp>ul").eq(1).append($ullis);
            }

        })
    }
})