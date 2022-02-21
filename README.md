##Buscador por Diego Quevedo

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-index).

## Como levantar la aplicación

1. Ejecutar el comando `npm install` para instalar dependencias.
2. Back  -> Ejecutar el comando `npm run start-server`, el cual levanta el servidor express por el puerto 8080.
3. Front -> Ejecutar el comando `npm start`, el cual levanta la aplicación de react por el puerto 3000.

## Proceso de desarrollo del challenge y consideraciones

1. Se realiza análisis de la necesidad. Se realizó el siguiente diagrama:

![Image text](https://lucid.app/publicSegments/view/102ea9de-9825-48d1-b747-d7b7ba592c6c/image.png)

2. Se crea aplicación base con ayuda de `create-react-app` implementando Typescript y SASS.
**Consideracion**
- Se usa EsLint para el formato y garantizar la limpieza del código.
3. Se realiza montaje de servidor con la herramienta Express.  
**Consideracion**
- De acuerdo al análisis, se requiere montar un servidor que funcione como proxy para las peticiónes al API proporcionada. Por esta razón se implementa Express y se configuran las 3 peticiones que se deben realizar a lo largo del flujo. Las rutas que van al servidor son:
`/search` para ir a la consulta de lo que el usuario ingresa en el input de búsqueda
`/search-item` para ir a la consulta de un producto por medio de su id
`/search-description` para ir a la consulta de la descripción del producto
4. Se crean componentes contenedores (Buscador, Resultados y Detalle) como componentes contenedores
5. Se crean componentes comunes (CajaBusqueda y MigaDePan) como componentes comunes y reutilizables
6. Se crean interfaces de request y de response.
7. Se realiza desarrollo lógico y funcional de la aplicación.
8. Se crea hook `useFetchData` para peticiones genéricas.
9. Se implementa `Material UI` para Miga de Pan y para la estructura de los componentes.
10. Se implementa la librería `Helmet` y `react-spa-prerender` para optimizar el SEO en contenido estático y aplicar tags a los componentes contenedores.
11. Se crean test básicos para cada componente.

## Decisiones

1. Para validar a que categoría pertenece el producto en la vista del Detalle, en la pantalla de Productos se guarda el array de las categorías en el `localstorage`, para luego validar a cual pertenece el producto seleccionado en Detalle.
2. Se tomó la decisión de tener una interfaz genérica de respuesta del API y del producto a mostar, esto con el fin de no tener problemas de tipos al usar el hook personalizado `useFetchData`
3. Como el SEO es uno de los puntos requeridos, se optó por usar el pre render, la aplicación de tags y metadata con librerías `react-spa-prerender` y `Helmet`, las cuales se adaptan al tamañp del requerimiento y pueden dar flexibilidad en caso de escalabilidad.
4. Debido a que se usó `Material UI`, para la maquetación se tomó la decisión de usar flexbox de la misma librería. Como se debia usar SASS y Material UI permite integrar los estilos dentro de la vista, se decide pasar los estilos a clases de CSS.

## Script disponibles

Se puede ejecutar:

### `npm install`

Instala todas las dependencias necesarias para el proyecto.

### `npm start`

Para iniciar la aplicación, corre por el puerto [http://localhost:3000](http://localhost:3000)

### `npm test`

Corre los test configurados en el proyecto.

### `npm run build`

Realiza el empaquetado de la aplicación en la carpeta `build` para desplegar en ambiente productivo.

### `npm run lint`

Se ejecuta el analisis estético del código con la herramienta EsLint.

### `npm run start-server`

Se levanta el servidor configurado con Express

### `npm run postbuild`

Renderiza previamente páginas estáticas para optimizar SEO con react-spa-prerender
