<h2>My Task</h2>

<p>Esta pequeña aplicación web es tiene como fin el ejecutar un tasklist apoyándose sobre los framework REACT Nextjs en conexión con los servicios configurados en la plataforma 8base.com. Para iniciar el proyecto una vez descargado solo se debe insertar el comando “npm install ” en la consola, terminal, o cmd y esperar la instalarcion de todas las dependencias. Una vez culminado el paso anterior se insertamos el comando “npm run dev” para iniciar el servidor local. Con ayuda de un navegador accedemos hasta la ruta “http://localhost:3000/” para llar al index de la aplicación web.</p>

<p>A rasgos generales contamos con tres rutas: [ “/”, “/login”, “/panel”] , la primera cumple la función de saludo, la segunda un login (que no esta activo) , y la tercera donde reside la funcionalidad del tasklist. Para pasar al panel se puede ir directamente a la ruta “/panel” o presionando el botón empezar en la ruta “/”.</p>

<p>En la ruta panel se nos muestra el crud, en el cual veremos dos secciones principales [“tareas”, y “tareas completadas”] . Haciendo click sobre cada seccion se podrá acceder a cada tipo de tarea respectivamente. Desde la sección “Tareas” se pueden agragar nuevas tareas, editarlas, culminarlas, y eliminarlas. Desde la seccion "Tareas" terminadas solo se pueden eliminar.</p>

<p>Para iniciar el test ingresamos “npm run cypress:open” ; una vez abierto podremos apreciar tres archivos .test.js , dos de ellos dedicados al End2End testing y uno de ellos dedicados al Unit testing. Los test tienen nombres descriptivos para una mayor comprensión del mismo. Es importante aclarar que existe una limitante de uso por parte del api de 8base en cuanto a la cantidad de peticiones por unidad de tiempo, se recomienda esperar unos minutos y recargar la pagina o test para obtener el comportamiento correcto.</p>

<p>En el proyecto tenemos cuatro directorios importantes [“pages”, “components”,”styles”,”db”,”cypress”] cada uno con una función general determinada.</p>

    • Pages : aquí estan los componentes base de cada dirección de la url. Desde aquí se llaman funciones y componentes complementarios
    • Components: son componentes sin estado que sirven de apoyo al renderizado en las paginas
    • Styles: archivos con ojas de estilos que se aplican en toda la web
    • db : todos los archivos relacionados a la coneccion con 8base y las operaciones crud
    • cypress: carpeta auto generada por cypress para la gestión de los test

<p>Gracias de antemano a los lectores y de corazon espero que este proyecto les resulte de gran utilidad :)</p>
