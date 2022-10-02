# hotel-manager
 ## Pasos para correr el proyecto
 - paso 1: docker-compose build
 - paso 2: docker-compose run app npm run  m:gen -- src/migrations/migration
 - paso 3: docker-compose run app npm run  m:run
 - paso 4: docker-compose up
 
 
 ## Para poder crear una reserva usar: 
 - 1.Crear cliente
 - 2.Crear habitaciones
 - 3.Crear metodos de pago
 - 4.Usar el modulo general de creacion de reserva que se encuentra en procesos
 - 5.Se puede eliminar
 - 6.Se puede pagar
 
 # Gestor de Rservas para Hoteles 
 
API orientada a la gestionde hoteles , para controlar el proceso de reservas , sus clientes e instalaciones.


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
### Reservacion
Se consideró una tabla que controle de manera general la reservacion , esta reservacion contiene el monto total , el cliente y el metodo de pago.
* ENDPOINTS
```
 - /reservation POST
 - /reservations GET
 - /reservations/cliente/<dni_cliente>
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
3. El tercero nos permite eliminar una reserva(consideramos eliminar al cambio de estado a eliminado).
```
 - /proceso/eliminar-reserva/<id_reserva> PUT
``` 
## Flujo

En esta sección puedes colocar comentarios adicionales, dar agradecimientos o invitar a tus lectores a que visiten otros de tus proyectos.

##Aportaciones Adicionales

