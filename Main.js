window.onscroll=function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t<200) setHeader(1);
    else setHeader(2);
}
function setHeader(i){// 导航栏随滑轮滚动而变化
    var header = document.getElementsByClassName("header");
    var headerL = document.getElementsByClassName("headerLeft");
    var headerR = document.getElementsByClassName("headerRight");
    var hsl = document.getElementsByClassName("headerUlsl");
    var hsr = document.getElementsByClassName("headerUlsr");
    var headerUl = document.getElementsByClassName("headerUl");
    var Font = document.getElementsByClassName("navFont");
    var logo = document.getElementsByClassName("headerLogo");
   // console.log(Font);
   // console.log(Font[0]);
  // console.log(logo)
    if (i==1){
        header[0].style.height="110px";
        headerL[0].style.height="110px";
        headerR[0].style.height="110px";
        hsl[0].style.display="";
        hsr[0].style.display="";
        headerUl[0].style.height="60px";
        headerUl[1].style.height="60px";
        for (var j=0;j<Font.length;j++){
            Font[j].style.lineHeight="200%";
        }
        logo[0].children[0].style.display="";
        logo[0].children[1].style.display="none";
    }
    else if (i==2){
        header[0].style.height="80px";
        headerL[0].style.height="80px";
        headerR[0].style.height="80px";
        hsl[0].style.display="none";
        hsr[0].style.display="none";
        headerUl[0].style.height="80px";
        headerUl[1].style.height="80px";
        //console.log(Font);
        for (var j=0;j<Font.length;j++){
            Font[j].style.lineHeight="80px";
        }
        logo[0].style.height="80px";
        logo[0].children[0].style.display="none";
        logo[0].children[1].style.display="";
    }
}

function downMenu(x){ //动态设置下拉框高度
    //this传递过来的是元素(Element)对象（具体地说是html DOM 元素对象），可以使用其属性和方法
    //console.log(x.getElementsByClassName("dropdownContent"));
    var y =  x.getElementsByClassName("dropdownContent")[0];
    var z = y.children.length;
    //console.log(y.children);
   // console.log(z);
    y.style.height=54*z+"px";
    y.style.borderTop="5px solid rgba(255, 99, 71, 1)";
    y.style.marginTop="-5px";
}
function upMenu(x){
    var y =  x.getElementsByClassName("dropdownContent")[0];
    y.style.height="0";
    y.style.borderTop="0px";
    y.style.marginTop="0px";
}

var bannerIndex = 0;
var bannerTime;

function bannerMove(){
    var bannerPic = document.getElementsByClassName("bannerPic");
    var bannerCrtl = document.getElementsByClassName("bannerCtrl");
    var bannerNum = document.getElementsByClassName("bannerPicWrap")[0].children.length;
    //console.log(bannerNum);
    if (bannerIndex==bannerNum){
        bannerIndex=0;
    }
    if (bannerIndex!=0){
        /*隐藏需要先执行opacity，再执行display，否则无效*/
        bannerPic[bannerIndex-1].style.opacity="0";
        setTimeout(function () {
            bannerPic[bannerIndex-1].style.display="none";
        }, 600);
        bannerCrtl[bannerIndex-1].style.backgroundColor="white";
    }else{
        bannerPic[bannerNum-1].style.opacity="0.0";
        setTimeout(function () {
            bannerPic[bannerNum-1].style.display="none";
        }, 600);
        bannerCrtl[bannerNum-1].style.backgroundColor="white";
    }
    bannerCrtl[bannerIndex].style.backgroundColor="tomato";
    /*设置setTimeout，让display先执行，opacity后执行*/
    bannerPic[bannerIndex].style.display="block";
    setTimeout(() => {
        bannerPic[bannerIndex].style.opacity="1";
    }, 20); 
    //渐变终于实现了，太难了
    bannerTime = setTimeout(function(){
        bannerIndex++;
        if (bannerIndex==bannerNum){
            bannerIndex=0;
        }
        bannerMove();
    },3000);
}

function changeBanner(x){
    var bannerCtrl = document.getElementsByClassName("bannerCtrl");
    var bannerPic = document.getElementsByClassName("bannerPic");
    var oldCtrl = bannerIndex;
    var newCtrl = parseInt(x.dataset.id,10)-1;
    bannerIndex = newCtrl;

    if (oldCtrl==newCtrl){
        clearTimeout(bannerTime);
        bannerMove();
        return;
    }

    clearTimeout(bannerTime);

    //console.log(x.dataset.id);
    console.log(bannerCtrl[oldCtrl]);

    bannerPic[oldCtrl].style.opacity="0";
    setTimeout(function () {
        bannerPic[oldCtrl].style.display="none";
    }, 600);
    bannerCtrl[oldCtrl].style.backgroundColor="white";

    console.log(bannerCtrl[newCtrl]);
    bannerCtrl[newCtrl].style.backgroundColor="tomato";
    bannerPic[newCtrl].style.display="block";
    setTimeout(() => {
        bannerPic[newCtrl].style.opacity="1";
    }, 20); 

    bannerMove();
}

var main1BannerIndex = 0;
var main1BannerTime;

function main1BannerMove(){
    var bannerItem = document.getElementsByClassName("main1BannerItem");
    var bannerCrtl = document.getElementsByClassName("main1BannerCtrl");
    var bannerNum = document.getElementsByClassName("main1BannerWrap")[0].children.length;
    if (main1BannerIndex==bannerNum){
        main1BannerIndex=0;
    }
    //console.log(main1BannerIndex);
    
    var tempLeft;
    for(let i=0;i<bannerNum;i++){
        if (i==main1BannerIndex){
            bannerCrtl[i].style.background="url(images/main1_Ctrl1.png)";
        }else{
            bannerCrtl[i].style.background="url(images/main1_Ctrl.png)";
        }
    }
    if(main1BannerIndex==0&&parseInt(bannerItem[0].style.left)!=0){
        for (let i=0;i<bannerNum-1;i++){
            bannerItem[i].style.transition="0s";
            bannerItem[i].style.left=100+i*100+"%";
        }
        setTimeout(function(){//存在小bug，转换时会出现不按照延时的情况，再研究一下setTimeout
            for(let i=0;i<bannerNum;i++){
                tempLeft=parseInt(bannerItem[i].style.left);
                bannerItem[i].style.transition="1s";
                bannerItem[i].style.left=tempLeft-100+"%";
            }
        },100);
        setTimeout(function(){
            bannerItem[bannerNum-1].style.transition="0s";
            bannerItem[bannerNum-1].style.left=(bannerNum-1)*100+"%";  
        },1200);
        setTimeout(function(){
            bannerItem[bannerNum-1].style.transition="1s";
        },1300);
    }else{
        tempLeft=-main1BannerIndex*100;
        for(let i=0;i<bannerNum;i++){
            bannerItem[i].style.left=tempLeft+i*100+"%";
        }
    }
    
    main1BannerTime=setTimeout(function(){
        main1BannerIndex++;
        if (main1BannerIndex==bannerNum){
            main1BannerIndex=0;
        }
        main1BannerMove();
    },4000);
}

function changeMain1Banner(x){
    var bannerItem = document.getElementsByClassName("main1BannerItem");
    var bannerCrtl = document.getElementsByClassName("main1BannerCtrl");
    var bannerNum = document.getElementsByClassName("main1BannerWrap")[0].children.length;
    var oldCtrl = main1BannerIndex;
    var newCtrl = parseInt(x.dataset.id,10)-1;
    main1BannerIndex = newCtrl;

    if (oldCtrl==newCtrl){
        clearTimeout(main1BannerTime);
        main1BannerMove();
        return;
    }

    clearTimeout(main1BannerTime);

    var tempLeft = -newCtrl*100;
    for(let i=0;i<bannerNum;i++){
        if (i==main1BannerIndex){
            bannerCrtl[i].style.background="url(images/main1_Ctrl1.png)";
        }else{
            bannerCrtl[i].style.background="url(images/main1_Ctrl.png)";
        }
        bannerItem[i].style.left=tempLeft+i*100+"%";
    }

    main1BannerMove();
}

function changeMain2Content(x){
    var div1=document.getElementById("main2ContentWrap1");
    var div2=document.getElementById("main2ContentWrap2");
    var title = document.getElementsByClassName("main2TitleCenter");
    if (x==1){
        div1.style.display="";
        div2.style.display="none";
        title[0].children[0].style.color="#0751a1";
        title[0].children[1].style.color="rgb(146, 147, 151)";
    }else{
        div1.style.display="none";
        div2.style.display="";
        title[0].children[1].style.color="#0751a1";
        title[0].children[0].style.color="rgb(146, 147, 151)";
    }
}


var main2OtherContentIndex = 0;
function changeMain2OtherContent(x){
    var item = document.getElementsByClassName("main2OtherContentWrap")[0].children;
    var ctrl = document.getElementsByClassName("main2OtherContentCtrl");
    var num = ctrl.length;
    var oldCtrl = main2OtherContentIndex;
    var newCtrl = parseInt(x.dataset.id,10)-1;
    main2OtherContentIndex = newCtrl;
    if (oldCtrl==newCtrl){
        return;
    }
    var tempLeft = -newCtrl*100;
    for(let i=0;i<num;i++){
        if (i==newCtrl){
            ctrl[i].style.backgroundColor="#0751a1";
        }else{
            ctrl[i].style.backgroundColor="rgb(146, 147, 151)";
        }
        item[i].style.left=tempLeft+i*100+"%";
    }
}

var main3ContentIndex = 0;
var main3ContentTime;

function main3ContentMove(){
    var Item = document.getElementsByClassName("main3ContentWrap")[0].children;
    var Ctrl = document.getElementsByClassName("main3ContentCtrl");
    var Num = Ctrl.length;
    if (main3ContentIndex==Num){
        main3ContentIndex=0;
    }
    console.log(main3ContentIndex);
    var tempLeft;
    for(let i=0;i<Num;i++){
        if (i==main3ContentIndex){
            Ctrl[i].style.backgroundColor="rgb(235, 235, 62)";
        }else{
            Ctrl[i].style.backgroundColor="rgb(204, 205, 212)";
        }
    }
    if(main3ContentIndex==0&&parseInt(Item[0].style.left)!=0){
        for (let i=0;i<Num-1;i++){
            Item[i].style.transition="0s";
            Item[i].style.left=100+i*100+"%";
        }
        setTimeout(function(){
            for(let i=0;i<Num;i++){
                tempLeft=parseInt(Item[i].style.left);
                Item[i].style.transition="1s";
                Item[i].style.left=tempLeft-100+"%";
            }
        },100);
        setTimeout(function(){
            Item[Num-1].style.transition="0s";
            Item[Num-1].style.left=(Num-1)*100+"%";  
        },1200);
        setTimeout(function(){
            Item[Num-1].style.transition="1s";
        },1300);
    }else{
        tempLeft=-main3ContentIndex*100;
        for(let i=0;i<Num;i++){
            Item[i].style.left=tempLeft+i*100+"%";
        }
    }
    
    main3ContentTime=setTimeout(function(){
        main3ContentIndex++;
        if (main3ContentIndex==Num){
            main3ContentIndex=0;
        }
        main3ContentMove();
    },4000);
}

function changeMain3Content(x){
    var item = document.getElementsByClassName("main3ContentWrap")[0].children;
    var ctrl = document.getElementsByClassName("main3ContentCtrl");
    var num = ctrl.length;
    var oldCtrl = main3ContentIndex;
    var newCtrl = parseInt(x.dataset.id,10)-1;
    main3ContentIndex = newCtrl;
    if (oldCtrl==newCtrl){
        clearTimeout(main3ContentTime);
        main3ContentMove();
        return;
    }
    clearTimeout(main3ContentTime);
    var tempLeft = -newCtrl*100;
    for(let i=0;i<num;i++){
        if (i==newCtrl){
            ctrl[i].style.backgroundColor="rgb(235, 235, 62)";
        }else{
            ctrl[i].style.backgroundColor="rgb(204, 205, 212)";
        }
        item[i].style.left=tempLeft+i*100+"%";
    }
    main3ContentMove();
}

var footerMenuId;

function upFooterMenu(x){
    footerMenuId = x;
    var menu =  document.getElementsByClassName("footerUpContent")[footerMenuId-1];
    var n = document.getElementsByClassName("footerUpContent")[footerMenuId-1].children.length;
    var icon = document.getElementsByClassName("footerTopItem")[footerMenuId-1].children[2];
    // console.log(icon.src);
    icon.src="images/hover_up.png";
    menu.style.height=45*(parseInt(n/5)+1)+"px";
    menu.style.borderTop="3px solid #0751a1";
    menu.style.padding="20px 40px";
    menu.style.marginTop=-45*(parseInt(n/5)+1)-43+"px";
}
function downFooterMenu(){
    var menu =  document.getElementsByClassName("footerUpContent")[footerMenuId-1];
    var icon = document.getElementsByClassName("footerTopItem")[footerMenuId-1].children[2];
    icon.src="images/hover_down.png";
    menu.style.height="0";
    menu.style.borderTop="";
    menu.style.padding="";
    menu.style.marginTop="";
}

var SideFlag=0;

function sideItemIn(x){
    if (SideFlag==0){
        x.style.width="182px";
        x.style.marginLeft="-42px";
        x.style.backgroundColor="rgba(216, 216, 75, 0.781)";
    }else{
        x.style.width="182px";
        x.style.marginLeft="-132px";
        x.style.backgroundColor="rgba(216, 216, 75, 0.781)";
    }
    
}

function sideItemOut(x){
    if (SideFlag==0){
        x.style.width="100%";
        x.style.marginLeft="";
        x.style.backgroundColor="#0751a1c2";
    }else{
        x.style.width="100%";
        x.style.marginLeft="";
        x.style.backgroundColor="#0751a1c2";
    }
}

function changeSide(x){
    var side = document.getElementsByClassName("side")[0];
    var sideItem = document.getElementsByClassName("sideItem");
    var n = side.children.length;
    if (SideFlag==0){
        side.style.width="50px";
        side.children[n-1].children[0].src="images/side_ctrl2.png";
        SideFlag=1;
    }else{
        side.style.width="140px";
        side.children[n-1].children[0].src="images/side_ctrl1.png";
        SideFlag=0;
    }
    
}
