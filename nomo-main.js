$(document).ready(function(){
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    $('button').button();
  $('.submit').click(function() {
    var u_x=$('.u_x').val(), u_y=$('.u_y').val();
    var v_x=$('.v_x').val(), v_y=$('.v_y').val();
    var w_x=$('.w_x').val(), w_y=$('.w_y').val();
    var min_U=0, max_U=100, shift_U=4;
    var min_V=0, max_V=100, shift_V=4;
    var min_W=0, max_W=100, shift_W=4;
    var font_size="9px";
    var rowU = [function(u){return eval(u_x)+500}, function(u){ return 560-eval(u_y)}];
    var rowV = [function(v){return eval(v_x)+500}, function(v){ return 560-eval(v_y)}];
    var rowW = [function(w){return eval(w_x)+500}, function(w){ return 560-eval(w_y)}];
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Array.prototype.make_row = function(n, endpoint_N, disp_n){
      if(n<endpoint_N) {
        // this is so that the correct shape is drawn between the markings, i.e. it iterates over very small additions
        for(i=0; i<disp_n; i+=0.1) {
            ctx.beginPath();
            ctx.moveTo(this[0](n-0.1+i), this[1](n-0.1+i));
            ctx.lineTo(this[0](n+i), this[1](n+i));
            ctx.stroke();
        }
        //this is so that the markings are rendered perpendicularly to the curve of the line. the method is reminscent of taking a derivative.
            var draw_angle = Math.atan( ( this[1](n+0.4) - this[1](n-0.4) ) / ( this[0](n+0.4) - this[0](n-0.4) ) );
            ctx.beginPath();
            var x_shift = 10*Math.cos(draw_angle+(Math.PI/2));
            var y_shift = 10*Math.sin(draw_angle+(Math.PI/2));
            ctx.moveTo( (this[0](n)+x_shift), (this[1](n)+y_shift) );
            ctx.lineTo( (this[0](n)-x_shift) , (this[1](n)-y_shift) );
          
            ctx.stroke(); 
                   
           if(n%1==0) {  
              ctx.font = font_size+' serif';
              ctx.fillText(n, this[0](n)+x_shift-5, (this[1](n))+y_shift+10);
           }
        //recursively call for the next marking
        this.make_row(n+disp_n, endpoint_N, disp_n);
      }
      else{
       return;
      }
    }
    
    rowV.make_row(min_V, max_V, shift_V);
    rowW.make_row(min_W, max_W, shift_W);
    rowU.make_row(min_U, max_U, shift_U);
  })
}); 
