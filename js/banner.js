$(function(){
    let $data;
    var $json;
    var $timer1,$timer2;
    var $banner_count=0;
    var $stop;
    var $n;
    
    $.ajax({
        url:"./banner/banner.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $json=$data;
            $.fn.banners($data);
        },
        error:function(){
            console.log("통신오류")
        }
    });

    //----------------------배열값 출력---------------------------
    $.fn.banners=function($data){

        $("#banner_box").append("<ul></ul><dl></dl>")

        $($data["banners"]).each(function($a1,$a2){
            var $liimg="<li><img src="+$data["banners"][$a1][0]+"><ol></ol></li>"
            $("#banner_box>ul").append($liimg)
            
            $($data["banners"][$a1]).each(function($b1,$b2){
                if($b1>0&&$b1<4){
                    var $ollis="<li id='banner_liid"+$a1+$b1+"'>"+$data["banners"][$a1][$b1]+"</li>"
                    $("#banner_box>ul>li:eq("+$a1+")>ol").append($ollis)
                }
            })
            $("#banner_box>ul>li:eq("+$a1+")>ol").append("<li>VIEW DETAIL</li>")
            
            var $dldds="<dd id='ddid"+$a1+"'>"+$data["banners"][$a1][4]+"</dd>"
            $("#banner_box>dl").append($dldds)

            $("#banner_box>dl>dd").click(function(){
                $n=$(this).index();
                $banner_count=$n-1;
                $stop="no"
                clearTimeout($timer1);
                clearTimeout($timer2);

                $.fn.ani_banner();
            })
        })

        $timer1=setTimeout($.fn.ani_banner,8000);
        var $w=1;
        while($w<4){
            var $anitime = 100*$w;
            
            $("#banner_liid0"+$w).delay($anitime).animate({
                "opacity":"1",
                "margin-left":"60px"
            },100)
            $w++;
        }
    }

    $.fn.ani_banner=function(){
        var $banner_ea=$("#banner_box>ul>li").length;
        
        //------------------------------fadeInOut--------------------
        $("#banner_box>ul>li").stop().fadeOut(100);
        $banner_count++;
        if($banner_count>=$banner_ea){
                $banner_count=0;
        }
        $("#banner_box>ul>li").eq($banner_count).stop().fadeIn(100);
        
        if($stop=="yes"){
            $timer1=setTimeout($.fn.ani_banner,8000);
            $timer2=setTimeout($.fn.ani_banner,8000);
        }
        $("#banner_box>dl>dd").css({
            "background-color":"#ffffff",
            "border":"1px solid #f2f2f2"
        });
        $("#ddid"+$banner_count).css({
            "background-color":"#f2f2f2",
            "border":"0"
        });

        //------------------------text animate-----------------------
        $("#banner_box>ul>li>ol>li").css({
            "margin-left":"0",
            "opacity":"0"
        });

        var $w=1;
        while($w<4){
            var $anitime = 100*$w;
            
            $("#banner_liid"+$banner_count+$w).delay($anitime).animate({
                "opacity":"1",
                "margin-left":"60px"
            },100)
            $w++;
        }

        $timer2=setTimeout($.fn.ani_banner,8000)
    }
})