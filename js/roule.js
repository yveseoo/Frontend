$(function(){

    let $data=["500포인트 당첨","5000포인트 당첨","꽝 다음기회에","3000포인트 당첨","2000포인트 당첨","1000포인트 당첨"]
    let $r=0;//오브젝트 최초의 위치값

    var $count=3;
    $.fn.abc=function(){

        $("#btn").click(function(){
            $("#msg").slideUp(400)
            var $random=Math.ceil(Math.random()*360);
            $r=$r+1800;
            if($count<=0){
                $(this).unbind("click")
                alert("룰렛은 3회만 돌릴 수 있습니다.")
            }
            else{
                $count--;
                $(this).unbind("click")
                var $msg=$.fn.rotate($r,$random);
            }
            setTimeout(function(){
                $("#msg").slideDown(700);
                $("#msg").html($data[$msg])
                $.fn.abc();
            },5000);
            $("#close").click(function(){
                $("#msg").css("display","none")
            })
        })
    }
    $.fn.abc();

    $.fn.rotate=function($r,$random){
        var $node=0;
        if($random>=2&&$random<=59){
            $node=0;
        }
        else if($random>=62&&$random<=119){
            $node=1;
        }
        else if($random>=122&&$random<=179){
            $node=2;
        }
        else if($random>=182&&$random<=239){
            $node=3;
        }
        else if($random>=242&&$random<=299){
            $node=4;
        }
        else if($random>=302&&$random<=359){
            $node=5;
        }
        else{
            $node=2;
        }
        var $rotate=$r+$random;
        $("#board").css("transform","rotate("+$rotate+"deg)")
        console.log($data[$node])
        return $node;
    }
})