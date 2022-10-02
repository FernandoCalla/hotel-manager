# Gestor de Reservas para Hoteles 
 
API orientada a la gestion de hoteles , para controlar el proceso de reservas , sus clientes e instalaciones.


## Instalación 

Para poder correr este proyecto de manera local debe clonar el proyecto y despues colocar los siguientes comandos listados en pasos.


```
 - paso 1: docker-compose build
 - paso 2: docker-compose run app npm run  m:gen -- src/migrations/migration
 - paso 3: docker-compose run app npm run  m:run
 - paso 4: docker-compose up
```  

## Documentación

El API fue desarrollado con las siguientes herramientas.
* Node
* Express
* TypeORM
* Typescript
* Postgresql
* Docker

## Autores

@FernandoCalla

## Endpoints

Se desarrollaron endpoints de acuerdo a las tablas y procesos que se creen que son convenientes para el proceso.
### Cliente
Se consideró la tabla cliente para realizar el control de todos los clientes del hotel.Inlucye los siguiente endpoints:
* CRUD
```
 - /cliente POST
 - /cliente/<id_cliente> PUT
 - /cliente/<id_cliente> DELETE
 - /cliente/<id_cliente> GET
``` 
* ENDPOINTS adicionales
```
 - /clientes GET
 - /cliente/identificador/<dni> GET
``` 
el ultimo endpoint permite buscar un usuario por su numero de dni o pasaporte
### Habitaciones
Se consideró la tabla habitaciones para realizar el control de todas habitaciones del hotel considerando un estado para determinar si la habitacion se encuentra disponible para su uso o si se encuentra en mantenimiento.Inlucye los siguiente endpoints:
* CRUD
```
 - /room POST
 - /room/<id_room> PUT
 - /room/<id_room> DELETE
 - /room/<id_room> GET
``` 
* ENDPOINTS adicionales
```
 - /rooms GET
 - /rooms/active GET
``` 
el ultimo endpoint facilitara al usuario a seleccionar solo entre las habitacions en funcionamiento.
### Metodos de Pago
Se consideró una tabla para metodos de pago ya que estos pueden crecer con el tiempo, pueden aparecer mas tablas , y aplicando normalizacion a la base de datos se opto por considerar una tabla independiete, tambien se considero un estado para poder activar y desactivar metodos de pago. Incluye los siguiente endpoints:
* CRUD
```
 - /payment-method POST
 - /payment-method/<id_payment_method> PUT
 - /payment-method/<id_payment_method> DELETE
 - /payment-method/<id_payment_method> GET
``` 
* ENDPOINTS adicionales
```
 - /payment-methods GET
 - /payment-methods/active GET
``` 
el ultimo endpoint permite ver solo los metodos de pago disponibles para la generacion de reservas.
### Reservacion
Se consideró una tabla que controle de manera general la reservacion , esta reservacion contiene el monto total , el cliente y el metodo de pago.
* ENDPOINTS
```
 - /reservation POST
 - /reservations GET
 - /reservations/cliente/<dni_cliente> GET
``` 
### Reservacion con habitacion
Se consideró una tabla que controle las reservaciones por habitacion, esto quiere decir que para una reservacion general se le pueden asociar sub reservaciones por cada cuarto y con fechas independientes , esta reservacion contiene un monto parcial producto del precio del cuarto y los noches de reserva.
* ENDPOINTS
```
 - /reservation-room POST
 - /reservation-rooms GET
``` 
### Reservacion con habitacion por día.
Se consideró una tabla que controle los dias de las reservaciones por habitacion,cada habitacion tendra enlazado cada dia que es parte del rango del check in y checkout,  esto a futuro nos permitira aumentar validaciones como tener un mayor control de las habitaciones disponibles y no disponibles.
### Procesos
Se crearon 3 procesos principales.
1. El primero nos permitira crear una reserva de una sola peticion , para este proceso se necesita pasar todos los datos completos.
```
 - /proceso/crear-reserva-completa POST
``` 
2. El segundo nos permite pagar una reserva.
```
 - /proceso/pagar-reserva/<id_reserva> PUT
``` 
3. El tercero nos permite eliminar una reserva (consideramos eliminar al cambio de estado a eliminado).
```
 - /proceso/eliminar-reserva/<id_reserva> PUT
``` 
## Flujo
* Para poder crear una reserva y pagarla o eliminarla este es el flujo resumido: 
   1.Crear cliente
   2.Crear habitaciones
   3.Crear metodos de pago
   4.Usar el modulo general de creacion de reserva que se encuentra en procesos o usar los endpoints independientes para crear por pasos.
   5.Se puede eliminar
   6.Se puede pagar
 
* Flujo detallado

1. Como primer paso debemos crear habitaciones, metodos de pago y clientes.
```
 - /room POST
 - /payment-method POST
 - /cliente POST
``` 
2. Como segunda paso , para que se pueda crear una reserva debemos validar que el cliente este registrado , de no ser el caso se debera registrar al cliente, para ello consideramos los siguientes endpoints.
   * Validar si un cliente ya esta registrado por su DNI o numero de pasaporte  
     ```
      /cliente/identificador/<dni> GET
     ``` 
   * Si no esta registrado , puede usar el siguiente endpoint para registrar un nuevo cliente.
     ```
       /cliente POST
      ``` 
3. Para el proceso de creacion de reservas consideramos dos formas de creacion , la primera sera de manera directa y la segunda por partes.
   * Manera directa.
     * Se utiliza el siguiente endpoint.
      ```
      /proceso/crear-reserva-completa POST
      ```
      A este endpoint se le debe pasar un json con todos los datos completos para generar una reserva que incluyen:
      ```
       {
       "client":3, //id de cliente
       "paymentMethod":2, //id del metodo de pago
       "listRoomsReservations":[ //Este arreglo alamacena todas las habitaciones que queremos agregar a la reserva y su respectivas fechas
           {
               "checkIn":"05/10/2022", //fecha de ingreso
               "checkOut":"07/10/2022", //fecha de salida
               "room":3 //id habitacion
           },
           {
               "checkIn":"12/10/2022", //fecha de ingreso
               "checkOut":"17/10/2022", //fecha de salida
               "room":4 //id habitacion
           }
       ]
      }
      ```
      El proceso generar los registros necesarios en cada tabla de acuerdo a los datos enviados.
  * Por pasos.
    * Generar la reserva general.
      ```
      /reservation POST

      Body: 

      {
       "client":3,  //id cliente
       "paymentMethod":2 //id metodo de pago
      }

      ```   
    * Seleccionar la habitacion y colocar las fechas para dicha habitacion, esta sera enlazada con la reserva general, cabe recalcar que se puede seleccionar mas de una habitacion para una reserva general por lo cual este paso se puede repetir de acuerdo a la necesidad del usuario , lo unico que se necesita es recordar el id de la reserva general.
      ```
      /reservation-room POST

      Body: 

      {
       "checkIn":"01/10/2022", //fecha de registro
       "checkOut":"04/10/2022", //fecha de salida
       "reservation":1, // id de la reservacion general
       "room":3 //id de la habitacion
      }

    ``` 

   
   
4. Podemos hacer consultas de las reservas de un cliente con el siguiente endpoint:
   ```
   /reservations/cliente/<dni_cliente>
       
   ``` 
   Obtendremos un resultado como:
   ```
   {
    "id": 3,
    "identityNumber": 72712946,
    "firstname": "Fer",
    "lastname": "Calla",
    "email": "fernando@gmail.com",
    "phonenumber": "+51 920011083",
    "createdAt": "2022-10-01T03:10:33.562Z",
    "updatedAt": "2022-10-01T03:10:33.562Z",
    "reservations": [
        {
            "id": 3,
            "state": 2,
            "totalPrice": 0,
            "createdAt": "2022-10-02T01:45:29.487Z",
            "updatedAt": "2022-10-02T01:52:39.386Z",
            "client": {
                "id": 3,
                "identityNumber": 72712946,
                "firstname": "Fer",
                "lastname": "Calla",
                "email": "fernando@gmail.com",
                "phonenumber": "+51 920011083",
                "createdAt": "2022-10-01T03:10:33.562Z",
                "updatedAt": "2022-10-01T03:10:33.562Z"
            },
            "paymentMethod": {
                "id": 2,
                "denomination": "Deposito",
                "paymentMethodStatus": true,
                "createdAt": "2022-10-01T19:48:41.421Z",
                "updatedAt": "2022-10-01T19:48:41.421Z"
            },
            "reservations": [
                {
                    "id": 6,
                    "checkIn": "01/10/2022",
                    "checkOut": "04/10/2022",
                    "partialPrice": 0,
                    "status": true,
                    "numberOfNights": 3,
                    "createdAt": "2022-10-02T01:45:29.523Z",
                    "updatedAt": "2022-10-02T01:45:29.523Z",
                    "reservationRoomDays": [
                        {
                            "id": 6,
                            "day": "2/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.703Z",
                            "updatedAt": "2022-10-02T01:45:29.703Z"
                        },
                        {
                            "id": 5,
                            "day": "3/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.701Z",
                            "updatedAt": "2022-10-02T01:45:29.701Z"
                        },
                        {
                            "id": 4,
                            "day": "1/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.550Z",
                            "updatedAt": "2022-10-02T01:45:29.550Z"
                        }
                    ]
                },
                {
                    "id": 7,
                    "checkIn": "12/10/2022",
                    "checkOut": "18/10/2022",
                    "partialPrice": 0,
                    "status": true,
                    "numberOfNights": 6,
                    "createdAt": "2022-10-02T01:45:29.705Z",
                    "updatedAt": "2022-10-02T01:45:29.705Z",
                    "reservationRoomDays": [
                        {
                            "id": 12,
                            "day": "17/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.812Z",
                            "updatedAt": "2022-10-02T01:45:29.812Z"
                        },
                        {
                            "id": 11,
                            "day": "16/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.739Z",
                            "updatedAt": "2022-10-02T01:45:29.739Z"
                        },
                        {
                            "id": 10,
                            "day": "15/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.738Z",
                            "updatedAt": "2022-10-02T01:45:29.738Z"
                        },
                        {
                            "id": 9,
                            "day": "14/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.737Z",
                            "updatedAt": "2022-10-02T01:45:29.737Z"
                        },
                        {
                            "id": 8,
                            "day": "13/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.736Z",
                            "updatedAt": "2022-10-02T01:45:29.736Z"
                        },
                        {
                            "id": 7,
                            "day": "12/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:45:29.734Z",
                            "updatedAt": "2022-10-02T01:45:29.734Z"
                        }
                    ]
                }
            ],
            "invoice": {
                "id": 1,
                "totalPrice": 0,
                "createdAt": "2022-10-02T01:46:24.192Z",
                "updatedAt": "2022-10-02T01:46:24.192Z"
            }
        },
        {
            "id": 4,
            "state": 0,
            "totalPrice": 0,
            "createdAt": "2022-10-02T01:50:50.842Z",
            "updatedAt": "2022-10-02T01:50:51.067Z",
            "client": {
                "id": 3,
                "identityNumber": 72712946,
                "firstname": "Fer",
                "lastname": "Calla",
                "email": "fernando@gmail.com",
                "phonenumber": "+51 920011083",
                "createdAt": "2022-10-01T03:10:33.562Z",
                "updatedAt": "2022-10-01T03:10:33.562Z"
            },
            "paymentMethod": {
                "id": 2,
                "denomination": "Deposito",
                "paymentMethodStatus": true,
                "createdAt": "2022-10-01T19:48:41.421Z",
                "updatedAt": "2022-10-01T19:48:41.421Z"
            },
            "reservations": [
                {
                    "id": 8,
                    "checkIn": "05/10/2022",
                    "checkOut": "07/10/2022",
                    "partialPrice": 0,
                    "status": true,
                    "numberOfNights": 2,
                    "createdAt": "2022-10-02T01:50:50.875Z",
                    "updatedAt": "2022-10-02T01:50:50.875Z",
                    "reservationRoomDays": [
                        {
                            "id": 14,
                            "day": "6/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:50.999Z",
                            "updatedAt": "2022-10-02T01:50:50.999Z"
                        },
                        {
                            "id": 13,
                            "day": "5/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:50.901Z",
                            "updatedAt": "2022-10-02T01:50:50.901Z"
                        }
                    ]
                },
                {
                    "id": 9,
                    "checkIn": "12/10/2022",
                    "checkOut": "17/10/2022",
                    "partialPrice": 0,
                    "status": true,
                    "numberOfNights": 5,
                    "createdAt": "2022-10-02T01:50:51.057Z",
                    "updatedAt": "2022-10-02T01:50:51.057Z",
                    "reservationRoomDays": [
                        {
                            "id": 19,
                            "day": "16/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:51.235Z",
                            "updatedAt": "2022-10-02T01:50:51.235Z"
                        },
                        {
                            "id": 18,
                            "day": "15/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:51.077Z",
                            "updatedAt": "2022-10-02T01:50:51.077Z"
                        },
                        {
                            "id": 17,
                            "day": "14/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:51.076Z",
                            "updatedAt": "2022-10-02T01:50:51.076Z"
                        },
                        {
                            "id": 16,
                            "day": "13/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:51.075Z",
                            "updatedAt": "2022-10-02T01:50:51.075Z"
                        },
                        {
                            "id": 15,
                            "day": "12/10/2022",
                            "partialPriceDay": 0,
                            "createdAt": "2022-10-02T01:50:51.073Z",
                            "updatedAt": "2022-10-02T01:50:51.073Z"
                        }
                    ]
                }
            ],
            "invoice": null
        }
    ]
   }
       
   ```
5. Para poder pagar utilizamos el siguiente endpoint.
```
 - /proceso/pagar-reserva/<id_reserva> PUT
``` 
5. Si se desea eliminar se puede utilizar el siguiente endpoint.
```
 - /proceso/eliminar-reserva/<id_reserva> PUT
``` 

##Aportaciones Adicionales
* Se desarrolló un modulo para retornar el listado de dias entre dos fechas, con validaciones de años bisiesto , meses con 31 y 30 dias , y los casos de febrero.
```
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
``` 
y se utilizo la funcion para determinar un año bisiesto reutilizado de internet
```
export function esBisiesto (year:number){
    return (year % 400 === 0) ? true : 
                (year % 100 === 0) ? false : 
                    year % 4 === 0;
  };
```

##Futuras aportaciones
- Validacion de fechas por habitacion para ver disponibilidad o no. 
- Etc. 

