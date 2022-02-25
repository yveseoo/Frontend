let hash;

function wck(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}
function data(){
    if(hash.readyState==XMLHttpRequest.DONE&&hash.status==200){
        hash_list(this.response)
    }
}
hash=wck();
hash.onreadystatechange=data;
hash.open("GET", "./product/hash.json", true)
hash.send();

function hash_list(hash){
    const hash_list=JSON.parse(hash)
    for(f in hash_list){
        var ollis=document.createElement("li")
        ollis.innerHTML="#"+hash_list[f]["hash_title"]
        document.getElementById("product_tag").appendChild(ollis)
    }
}

$(function(){
    var $data;
    $.ajax({
        url:"./product/product.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.product($data);
        },
        error:function(){
            console.log("통신오류")
        }
    })
    $.fn.product=function($data){
        $($data["flat_product"]).each(function($a1,$a2){
            $("#product_list").append("<li  id='lbid"+$a1+"'><label><img src="+$data["flat_product"][$a1]["product_img"]+"></label><dl></dl></li>")
            
            $(Object.keys($data["flat_product"][$a1])).each(function($b1,$b2){
                if($b2!="product_img"){
                    $("#product_list>li:eq("+$a1+")>dl").append("<dd>"+$data["flat_product"][$a1][$b2]+"</dd>")
                    if($data["flat_product"][$a1]["product_dc"]!=""){
                        $("#product_list>li:eq("+$a1+")>dl>dd").eq(2).html("<s>"+$data["flat_product"][$a1]["product_money"]+"</s>")
                    }
                }
            })

            $("#lbid"+$a1).bind({
                "mouseenter":function(){
                    $("#lbid"+$a1+">label").css("opacity","0.5")
                    //$("#lbid"+$a1).css("background-color","rgba(255,255,255,0.5)")
                    $("#lbid"+$a1+">dl").css("display","block")
                },
                "mouseleave":function(){
                    $("#lbid"+$a1+">label").css("opacity","")
                    $("#lbid"+$a1+">dl").css("display","")
                }
            })
        })
    }
})