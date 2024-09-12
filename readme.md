![1726122692405](image/readme/image.png)

# HubSpot Contact API

Servicio API con integración de HubSpot para la gestion de crm/contacts.
[Consulte documentación de servicio aquí.](https://developers.hubspot.com/docs/api/crm/contacts 'HubSpot/Crm/contacts')

Este servicio utiliza [Swagger](https://swagger.io/) para documentar cada uno de
sus endpoints.

## Ejecución en local

Este proyecto esta creado en node.Js por lo tanto necesitas cubrir los
siguientes requisitos:

1. Contar con [NodeJS](https://nodejs.org/en) instalado o algun gestor de
   versiones de node como [NVM](https://github.com/nvm-sh/nvm).
2. Un navegador web o REST client para poder realizar pruebas de peticiones.
   1. RestClient recomendado ([Insomnia](https://insomnia.rest/download))
   2. WebBrowser recomendado
      ([chrome](https://www.google.com/intl/es_es/chrome/))
3. Contar con tu `API_KEY` de **HubSpot** para configurar el proyecto.

Los pasos para poder ambientar este proyecto son los siguientes:

- Clonar el repositorio en tu local utilizando el siguiente comando

  - `git clone ---`

- Abrir proyecto en visual studio code o tu editor de codigo favorito.
- Crear archivo .`env` en la raiz del proyecto y especificar cada valor como
  esta señalado en el archivo `.env.example`
- Abrir una terminal de comandos y ejecutar el siguiente comando
  `npm run start:local`

  - Si no se especifica el puerto, el proyecto será montado en la siguiente
    ubicación [http://localhost:3300](<[http://localhost:3300]()>)
  - Si el comando arroja un error puedes intentar lo siguiente:
    - Ejecutar `npm install`
    - Ejecutar `npm run start:dev`

- Al abrir la siguiente dirección
  ([http://localhost:3300](<[http://localhost:3300]()>)) en tu navegador, seras
  capaz de visualizar la documentación swagger de la API.

## Documentación de endpoints

La documentación de cada endpoint la podrás consultar en la siguiente
[dirección ](http://localhost:3300/api-docs/#/)

Cada endpoint asi como su modelo utilizado se encuentra dellado en la ruta
[/api-docs]() para lograr un mejor entendimiento sobre los modelos de solicitud
asi como los de respuesta.

## Alcances de API

Este proyecto backend tiene como alcance los siguientes puntos:

- Obtener listado de contactos de forma ordenada por fecha de creación
  (`createdate`) de manera descendiente (`DESCENDING`)
- Recuperar contacto segun el `contactId` proveido.
- Recuperar contacto por `property` y `value` del contacto
  - El usuario puede ser capaz de especificar que tipo de busqueda desea
    realizar.
  - Existen 4 tipos de busquedas; busqueda por `email`, busqueda por phone,
    buesqueda por `firstname`, busqueda por lastname
- Agregar un nuevo contacto utilizando los servicios de
  [hubspot](https://developers.hubspot.com/docs/api/crm/contacts)
- Actualizar un contacto ya existente indicando las 4 propiedades
  (`email, phone, lastname, firstname`) y el `contactId`
- Archivar o eliminar un contacto segun el `contactId` proveido

## Manejo de errores

Este servicio cuenta con manejo de errores a nivel servidor, a nivel middleware
y a nivel servicio.

**Nivel Middleware**

    Se validan todos los parametros de entrada implementados (`bodyRequest, pathParameters`) .

    Se agregaron los middlewares necesarios para validar tipos de dato, propiedades obligatorias, formatos de valores y valores permitidos.

    Para la validación de modelos en`bodyRequest` se implementó un middleware de validacion de schemas para indicar como respuesta al cliente los errores identificados por cada una de las propiedades del schema.

    Se intengró un middleware como`errorhandler` encargado de formatear el error obentido durante la ejecución de la petición

    Se integró un middleware con funcionalidad de`logger` para imprimir todas la informacion necesaria relacianada al `bodyRequest` para intentar simular un comportamiento a un `logTrace` de AWS por mencionar alguno donde con un UUID nos resultaria facil identificar la petición.

    Se integraron validaciones a cada uno de los parametros del bodyRequest asi como pathParams para evitar el[XSS (Cross Side Scripting)](https://owasp.org/www-community/attacks/xss/) asi como uso de `CORS`

#### Nota

Se decidió obtar por manejar errores genericos hacia el cliente en caso de
errores y seguir con uno de los principios de seguridad básica en API's el cual
nos menciona que no es recomendable indicar al cliente la razón u origen del
posible fallo. Esto se complementó con la funcionalidad del logger para trackear
mejor los errores asi como guardar de forma dinamica en `logs/*.log` todos
aquellos errores detanos durante cualquier petición.
