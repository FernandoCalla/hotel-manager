export function calcularNumeroNoches(checkIn:string,checkOut:string){
    let aFecha1 = checkIn.split('/');
    let aFecha2 = checkOut.split('/');
    let fFecha1 = Date.UTC(parseInt(aFecha1[2]),parseInt(aFecha1[1])-1,parseInt(aFecha1[0]));
    let fFecha2 = Date.UTC(parseInt(aFecha2[2]),parseInt(aFecha2[1])-1,parseInt(aFecha2[0]));
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

export function calcularPrecioParcial(numeroNoches:number,precio:number){
    let montoParcial:number = numeroNoches*precio;
    return montoParcial;
}

export function esBisiesto (year:number){
    return (year % 400 === 0) ? true : 
                (year % 100 === 0) ? false : 
                    year % 4 === 0;
  };

export function calcularListadoDeDias(checkIn:string,checkOut:string,numeroNoches:number,precio:number){
    let fechainicio = checkIn.split('/');
    let dia=parseInt(fechainicio[0])
    let mes=parseInt(fechainicio[1])
    let año=parseInt(fechainicio[2])
    const Dias=[]
    for(let i=0;i<numeroNoches;i++){
        if(i==0){
            Dias.push({dia:`${dia}/${mes}/${año}`,precio:precio})
        }
        else{
            if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12){
                if(dia==31){
                    dia=1
                    if(mes==12){
                        mes=1
                        año+=1
                    }else{
                        mes+=1
                    }                    
                }
                else dia+=1
            }else if(mes == 2){
                if(esBisiesto(año)){
                    if(dia==29){
                        dia=1
                        mes+=1
                    }
                    else{
                        dia+=1
                    }
                }else{
                    if(dia==28){
                        dia=1
                        mes+=1
                    }
                    else{
                        dia+=1
                    }
                }
                

            }else{
                if(dia==30){
                    dia=1
                    mes+=1
                }
                else{
                    dia+=1 
                }
            }
            Dias.push({dia:`${dia}/${mes}/${año}`,precio:precio})
        }
    }
    
    
    return Dias;
}