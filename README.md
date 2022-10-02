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

## Autores

@FernandoCalla

## Endpoints

Se desarrollaron endpoints de acuerdo a las tablas y procesos que se creen que son convenientes para el proceso.
### Cliente
### Habitaciones
### Metodos de Pago
### Reservacion
### Reservacion con habitacion
### Procesos

## Flujo

En esta sección puedes colocar comentarios adicionales, dar agradecimientos o invitar a tus lectores a que visiten otros de tus proyectos.

##Aportaciones Adicionales

