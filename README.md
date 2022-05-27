# ISrecruitmentAPIS
Proyecto final Ingeniería de Software - APIS sistema de reclutamiento
Integrantes:

Ovidio Alejandro Hernández Ruano    -   Carné: 090-18-4891 
Edson Alexander Molina Illescas     –   Carné: 0494-03-1111
Carlos Roberto Villatoro Barrios    –   Carné: 0494-16-12883

Lenguaje de programación: JavaScript 
NodeJS
MySQL

En la carpeta databe se encuentran los siguientes archivos:

"Definición DB y tablas"
En este archivo se encuentra la creación de la base de datos y sus respectivas tablas.

"SP para guardar Compañias"
Este script se debe ejecutar ya que existe una ruta para crear nuevas empresas.
Y la creación de las nuevas empresas ejecuta este Store Procedure, por lo que, se necesita tener definido en la Base de Datos en cuestión.

La conexión estblecida es para una base de datos MySQL local, la cual la mayoría de situaciones tiene los siguientes datos:

    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'recruitment'


Para levantar el servidor NodeJS ejecutar el comando:
npm run dev
