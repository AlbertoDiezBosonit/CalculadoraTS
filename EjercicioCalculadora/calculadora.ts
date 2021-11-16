const NUM_DIGITOS : number = 9;
const MAX_VALOR : number=999999999;
let numeroAnterior : number = 0; 
let operacion : string = '';

window.onload = function(){ 
    // ahora asignamos los eventos
    let elementos=document.getElementsByTagName('button');
    let numElementos = elementos.length;
    for(let i=0;i<numElementos;i++){
        let elemento=elementos[i];
        elemento.onclick=pulsarBotonDirecto;
    }   
    var input = document;
    input.addEventListener('keyup',function(event){
        const teclas: string[] = ['0','1','2','3','4','5','6','7','8','9','/','*','-','+','=','c',',','x','\n','\r','\n\r'];
        const len = teclas.length;
        console.log(event.key);
        for(let i=0;i<len;i++){
            if(teclas[i] == event.key || event.keyCode == 13){
                let data = event.key;
                if(data=='*')
                    data='x';
                if(data=='\n' || data=='\r' || data=='\n\r' || event.keyCode==13)
                    data='=';

                pulsarBoton(event,data);
            }
        }
    })

}


function pulsarBotonDirecto(eventos){
    let data = eventos.target.childNodes[0].data;
    if(eventos.target.childNodes[0].data == undefined){
        // comprobamos si se pulsa en el boton o en el parrafo
        //console.log(Number( eventos.target.childNodes[0].childNodes[0].data));
        data = eventos.target.childNodes[0].childNodes[0].data;
    }
    pulsarBoton(eventos,data);
}

function pulsarBoton(eventos,data){
    let numero=Number(data);   
    //console.log(eventos.target);
    let pantalla=document.getElementById("pantalla");
    //console.log(numero);
    if(!isNaN(numero)){
        console.log("El el numero: "+numero);
        if(Number(pantalla.innerHTML)==0)
            pantalla.innerHTML = numero.toString();
        else if(pantalla.innerHTML.length < NUM_DIGITOS)
            document.getElementById("pantalla").innerHTML+=numero;
    }
    else{
        console.log("El la letra: "+data);
        numero = Number(pantalla.innerHTML);
        if(isNaN(numero)){
            // aqui hay un caso especial, que el ultimo sea una coma
            console.log('No es un numero: '+pantalla.innerHTML);
            let textoNumero = pantalla.innerHTML;
            if(textoNumero[textoNumero.length-1]=='.'){
                numero = Number(textoNumero.substring(0,textoNumero.length-1));
                if(isNaN(numero)){
                    numeroAnterior=0;
                    numero=0;        
                }
            }
        }
        if(data != '='){
            if(data != ','){
                operacion = data;           
                pantalla.innerHTML='0';
                numeroAnterior=numero;
            }
            else{
                pantalla.innerHTML +='.';
            }
        }
        else{ // hay que hacer la operacion
            hazOperacion(pantalla,numero);
            operacion='';
            numeroAnterior=0;
        }
    }
}

function hazOperacion(pantalla, numero : number){
    let auxCadena : string = pantalla.innerHTML;
    switch(operacion) { 
        case 'c': {
            auxCadena = '0';
            numeroAnterior = 0;
            break;
        }
        case 'exp':{
            console.log('Se hace la potencia');
            auxCadena = Math.pow(numeroAnterior, numero).toString();
            break;
        }
        case '/':{
            console.log('Se divide');
            if(numero != 0)
                auxCadena = (numeroAnterior/numero).toString();
            break;
        }
        case 'x':{
            console.log('Se multiplica');
            auxCadena = (numeroAnterior*numero).toString();
            break;
        }
        case '-': { 
            console.log('Se resta');
            auxCadena = (numeroAnterior-numero).toString();
            break; 
         }  
        case '+': { 
           console.log('Se suma');
           auxCadena = (numero + numeroAnterior).toString();
           break; 
        }
        case ',':{
            console.log('Se hace la coma');
            auxCadena +='.';       
            break;
        }
        default: { 
           console.log('Operación no soportada');
           break; 
        } 
     }    
    if(auxCadena.length>NUM_DIGITOS){
        if(tienePunto(auxCadena))
            auxCadena = auxCadena.substring(0,NUM_DIGITOS);
        if(Number(auxCadena)>MAX_VALOR)
            auxCadena = 'Infinity'; // esto no esta del todo correcto
    }
    if(tienePunto(auxCadena)){
        let maximo=auxCadena.length-1;
        while(auxCadena[maximo]=='0')
            maximo--;
        auxCadena=auxCadena.substring(0,maximo+1);
    }
    console.log(auxCadena);
    pantalla.innerHTML = auxCadena;
}

function tienePunto(cadena : string) : boolean{
    const len = cadena.length;
    for(let i=0;i<len;i++)
        if(cadena[i]=='.')
            return true;
    return false;
}

