var a_resul = [];
var a_op = [];
var i=1;
var bcs=false;

function salida(num){
    var calc_salida = document.getElementById('calc_salida');
    var salida = calc_salida.value;

    if(salida.length > 10){
        calc_salida.style.fontSize = '30px';
    }if(salida.length > 15){
        calc_salida.style.fontSize = '25px';
    }if(salida.length > 18){
        calc_salida.style.fontSize = '20px';
    }if(salida.length > 22){
       calc_salida.style.fontSize = '18px';
   }
    
    return calc_salida.value = salida + num;
    
}


function textSize(str){
    
     var id_str = document.getElementById('calc_resul');
     var str = str.toString();

     if(str.length > 10){
         id_str.style.fontSize = '30px';
     }if(str.length > 15){
         id_str.style.fontSize = '25px';
     }if(str.length > 18){
         id_str.style.fontSize = '20px';
     }if(str.length > 22){
        id_str.style.fontSize = '18px';
    }
     
     return str;
}

function calculo(){
    var id_cadena = document.getElementById('calc_salida');
    var cadena = id_cadena.value;
    var bool = true;
    var resul_textSize;

    try {

        for(var j=0; j<cadena.length; j++){
           
            if(cadena.charAt(j) === '√'){
                cadena = cadena.replace("√(","Math.sqrt(");
                bool = false;

            }if(cadena.charAt(j) === '^'){
                cadena = cadena.replace("^","**");
                bool = false;

            }if(cadena.charAt(j) === '%'){
                
                cadena = porcen(cadena,j);
                bool = false;
                
                
            }
        }
        
        resul_textSize = textSize(eval(cadena));
        document.getElementById('calc_resul').value = resul_textSize;
        historial();
    
        if(bool === true){
            var resul_eval = eval(cadena);
            resul_textSize = textSize(resul_eval);
            document.getElementById('calc_resul').value = resul_textSize;
            historial();
        }

    } catch (error) {
        id_cadena.style.fontSize = '30px';
        id_cadena.style.textAlign = "left";
        document.getElementById('calc_salida').value = "Syntax ERROR :o";
        document.getElementById('calc_resul').value = "";
    }
}




function porcen(exp,p_porcen){

    var exp2 = exp.substring(p_porcen+1,exp.length);  
    exp = exp.substring(0,p_porcen+1);

    for(var i=exp.length; i>=0; i--){
        var ch = exp.charAt(i);

        if( ch ===  '+' || ch ===  '-' || ch ===  '/' || ch ===  '*'){
            
            var porcen = exp.substring(i+1,exp.length);
            var valor_sp = exp.substring(0,i);

            for(var k=0 ; k<valor_sp.length; k++){
               
                var ch_vsp = valor_sp.charAt(k);
                
                if(ch_vsp ===  '+' || ch_vsp ===  '-' || ch_vsp ===  '/' || ch_vsp ===  '*'){

                    for(var k=0 ; k<valor_sp.length; k++){

                        var ch_vsp2 = valor_sp.charAt(k);

                        if(ch_vsp2 ===  '/' || ch_vsp2 ===  '*'){
                            var v1 = valor_sp.substring(0,k);
                            v1 = "("+v1+")";
                            break;
                        
                        }else{
                            valor_porcen = eval(porcen.replace("%","/100"));
                            var v3 = eval(valor_sp);
                            var resul = (v3 * valor_porcen);
                            exp = exp.replace(porcen,resul);
                            exp = exp.replace(valor_sp,v3);

                            return exp;

                        }
                    }
                    
                    var valor_sp2 = valor_sp.substring(k,valor_sp.length);
                    
                    var v2 = eval(v1.toString()+valor_sp2);
                    
                    valor_porcen = eval(porcen.replace("%","/100"));
        
                    var resul = (v2 * valor_porcen);
                    exp = exp.replace(porcen,resul);
                    exp = exp.replace(valor_sp,v2);
                    
                    return exp;
                }
            }

            valor_porcen = eval(porcen.replace("%","/100"));
        
            var resul = (valor_sp * valor_porcen);
            exp = exp.replace(porcen,resul);
            return exp+exp2;
        }
    }
}

function buttonUp(){
   
    var id_estado = document.getElementById('calc_estado');
    id_estado.value = '▲';
   
    if(i <= a_op.length ){
        if(i >= a_op.length){i=a_op.length-1;}
        document.getElementById('calc_salida').value = a_op[i];
        document.getElementById('calc_resul').value = textSize(a_resul[i]);
        i++;
    }   
    
}

function buttonDown(){
    
    var id_estado = document.getElementById('calc_estado');
    id_estado.value = '▼';

    if( i >= 0){
        if(i >= a_op.length){i=a_op.length-1;}
        document.getElementById('calc_salida').value = a_op[i];;
        document.getElementById('calc_resul').value = textSize(a_resul[i]);
        i--;
        if(i < 0){i=0;}
    }
    
}

function historial(){
    var op = document.getElementById('calc_salida').value;
    var resul = document.getElementById('calc_resul').value;

    a_resul.push(resul);
    a_op.push(op);
}

function eliminar(){
    var salida = document.getElementById('calc_salida').value;
    var nuevasalida = salida.substring(0,salida.length-1);
    document.getElementById('calc_salida').value = nuevasalida;
}

function limpiar(){
    var salida = document.getElementById('calc_salida');
    var result = document.getElementById('calc_resul');

    salida.style.fontSize = '35px';
    salida.style.textAlign = "right";
    salida.value = "";

    result.style.fontSize = '35px';
    result.style.textAlign = "right";
    result.value = "";

    document.getElementById('calc_estado').value = "";
}

function allClear(){
    limpiar();
    a_resul.splice(0,a_resul.length);
    a_op.splice(0,a_op.length);
    i=0;
    
}

function unoEntre(){
    var display = document.getElementById('calc_salida');
    var x = display.value;
    var result_utx = 1/x;
    result = textSize(result_utx);
    document.getElementById('calc_resul').value = result;
}

function cambioSig(){
    var salida = document.getElementById('calc_salida').value;
   
    document.getElementById('calc_salida').value = "-(" + salida;
} 

function parentIzq(){
    var salida = document.getElementById('calc_salida').value;
    document.getElementById('calc_salida').value = salida + "(";
}

function parentDerch(){
    var salida = document.getElementById('calc_salida').value;
    document.getElementById('calc_salida').value = salida + ")";
}