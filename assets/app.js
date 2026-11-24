/* 每日战报 · 全站交互 */
(function(){
  'use strict';

  /* ===== 动态日期：报头/页脚显示今天，文章按 age 显示相对日期 ===== */
  var WEEK=['日','一','二','三','四','五','六'];
  function pad(n){return n<10?'0'+n:''+n}
  function fullDate(d){return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 星期'+WEEK[d.getDay()]}
  function shortDate(d,time){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+(time||'08:00')}

  var now=new Date();
  var ld=document.getElementById('liveDate'); if(ld)ld.textContent=fullDate(now);
  var fd=document.getElementById('footDate'); if(fd)fd.textContent=fullDate(now);

  var today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  var dyn=document.querySelectorAll('.dyn-date');
  for(var i=0;i<dyn.length;i++){
    var el=dyn[i];
    var age=parseInt(el.getAttribute('data-age')||'0',10);
    var time=el.getAttribute('data-time')||'08:00';
    var d=new Date(today); d.setDate(d.getDate()-age);
    el.textContent=shortDate(d,time);
  }

  /* ===== 汉堡菜单 ===== */
  var burger=document.getElementById('burger');
  var nav=document.getElementById('navlinks');
  if(burger&&nav){
    burger.addEventListener('click',function(e){
      e.stopPropagation();
      var open=nav.classList.toggle('open');
      burger.textContent=open?'✕':'☰';
      burger.setAttribute('aria-label',open?'关闭菜单':'打开菜单');
    });
    // 点链接后自动收起
    var links=nav.querySelectorAll('a');
    for(var j=0;j<links.length;j++){
      links[j].addEventListener('click',function(){nav.classList.remove('open');burger.textContent='☰';});
    }
    // 点菜单外区域收起
    document.addEventListener('click',function(e){
      if(nav.classList.contains('open')&&!nav.contains(e.target)&&e.target!==burger){
        nav.classList.remove('open');burger.textContent='☰';
      }
    });
    // 窗口放大到桌面宽度时复位
    window.addEventListener('resize',function(){
      if(window.innerWidth>760){nav.classList.remove('open');burger.textContent='☰';}
    });
  }

  /* ===== 返回顶部 ===== */
  var toTop=document.getElementById('toTop');
  if(toTop){
    window.addEventListener('scroll',function(){
      if(window.scrollY>400)toTop.classList.add('show');
      else toTop.classList.remove('show');
    },{passive:true});
    toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  }
})();
