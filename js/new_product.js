$(function(){
    var $data;
    $.ajax({
        url:"./newproduct/new_product.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.nproduct($data);
        },
        error:function(){
            console.log("통신오류")
        }
    })

    $.fn.nproduct=function($data){

        $($data["new_product"]).map(function($a1,$a2){

            $("#nproduct_list").append("<li><ol></ol></li>")
            var $nproduct_div="<div class='nproduct_div' id='nproduct_div"+$a1+"'></div>"
            var $nproduct_ico1="<label><img src='./newproduct/info_icon02.gif'></label>"
            var $nproduct_ico2="<label><img src='./newproduct/info_icon03.gif'></label>"
            $("#nproduct_list>li").eq($a1).append($nproduct_div)
            $("#nproduct_list>li>div").eq($a1).append($nproduct_ico1+$nproduct_ico2)
            
            if($data["new_product"][$a1]["product_dc"]!=""){
                var $nproduct_lb="<label>"+$data["new_product"][$a1]["product_dc"]+"</label>"
                $("#nproduct_list>li").eq($a1).append($nproduct_lb)
            }
            $(Object.keys($data["new_product"][$a1])).each(function($b1,$b2){
                // console.log($b2)
                if($b2!="product_dc"){

                    var $html="";
                    if($b2=="product_img"){
                        $html="<li><img src="+$data["new_product"][$a1]["product_img"]+"></li>"
                        $("#nproduct_list>li:eq("+$a1+")>ol").prepend($html)
                    }
                    else if($b2=="product_nm"){
                        $html="<li>"+$data["new_product"][$a1]["product_nm"]+"</li>"
                        $("#nproduct_list>li:eq("+$a1+")>ol").append($html)
                    }
                    else if($b2=="product_info"){
                        $html="<li>"+$data["new_product"][$a1]["product_info"]+"</li>"
                        $("#nproduct_list>li:eq("+$a1+")>ol").append($html)
                    }
                    else if($b2=="product_money"){
                        if($data["new_product"][$a1]["product_sales"]!=""){
                            $html="<li><s>"+$data["new_product"][$a1]["product_money"]+"</s></li>" 
                        }
                        else{
                            $html="<li></li>"
                        }                    
                        $("#nproduct_list>li:eq("+$a1+")>ol").append($html)
                    }
                    else{
                        $("#nproduct_list>li:eq("+$a1+")>ol").append("<li>"+$data["new_product"][$a1]["product_money"]+"</li>")
                    }
                }
            })

            $("#nproduct_list>li").bind({
                "mouseenter":function(){
                    var $node=$(this).index();
                    $("#nproduct_div"+$node).css("display","block")
                },
                "mouseleave":function(){
                    var $node=$(this).index();
                    $("#nproduct_div"+$node).css("display","none")
                }
            })
        })
    }

})