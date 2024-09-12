/**
 * @swagger
 * components:
 *  schemas:
 *     SearchRequest:
 *       type: object
 *       required:
 *         - property
 *         - value
 *       properties:
 *         property:
 *           type: string
 *           enum:
 *             - email
 *             - phone
 *             - lastname
 *             - firstname
 *           example: "email"
 *         value:
 *           type: string
 *           example: "example@gmail.com"
 *     DeleteSuccess:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "2d9d8eb4-0aab-4186-b0a9-8ff2b32603e8"
 *         status:
 *           type: string
 *           example: "success"
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Petición realizada correctamente."
 *         description:
 *           type: string
 *           example: "Contacto eliminado correctamente"
 *         data:
 *           type: object
 *           example: {}
 *     ApiResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "70efe8ad-b90e-4e52-a302-44985c4d723f"
 *         status:
 *           type: string
 *           example: "success"
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: "Petición realizada correctamente."
 *         description:
 *           type: string
 *           example: "Se obtuvieron 1 contactos."
 *         data:
 *           type: object
 *           properties:
 *             nextPage:
 *               type: string
 *               example: ""
 *             totalElements:
 *               type: integer
 *               example: 1
 *             results:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Contact'
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "57245106798"
 *         firstname:
 *           type: string
 *           example: "Dan"
 *         lastname:
 *           type: string
 *           example: "Don"
 *         email:
 *           type: string
 *           format: email
 *           example: "dandon@gmail.com"
 *         phone:
 *           type: string
 *           example: "123456"
 *         lastmodifieddate:
 *           type: string
 *           format: date-time
 *           example: "2024-09-12T00:34:44.550Z"
 *     ContactRequest:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           example: "Dan"
 *           required: true
 *         lastname:
 *           type: string
 *           example: "Don"
 *           required: true
 *         email:
 *           type: string
 *           format: email
 *           example: "dandon@gmail.com"
 *           required: true
 *         phone:
 *           type: string
 *           example: "123456"
 *           required: true
 *     ErrorBodyRequest:
 *       type: object
 *       properties:
 *         errors:
 *           type: object
 *           properties:
 *             contactId:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "contactId es requerido"
 *             email:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "email es requerido"
 *             firstname:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "firstname es requerido"
 *             lastname:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "lastname es requerido"
 *             phone:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "phone es requerido"
 *       example:
 *         errors:
 *           contactId:
 *             - "contactId es requerido"
 *           email:
 *             - "email es requerido"
 *             - "email debe ser un correo valido en 'gmail.com', 'hotmail.com' o 'hubspot.com'"
 *           firstname:
 *             - "firstname es requerido"
 *             - "firstname debe tener al menos 5 caracteres"
 *             - "firstname deben ser solo letras"
 *             - "firstname debe ser una cadena de caracteres"
 *           lastname:
 *             - "lastname es requerido"
 *             - "lastname debe tener al menos 5 caracteres"
 *             - "lastname debe ser solo letras"
 *             - "lastname debe ser una cadena de caracteres"
 *           phone:
 *             - "phone es requerido"
 *             - "phone debe tener al menos 10 caracteres"
 *             - "phone deben ser solo numeros"
 *             - "phone debe ser una cadena de caracteres"
 */
// * POST - CREATE NEW CONTACT
/**
 * @swagger
 * /api/contact/add:
 *  post:
 *    summary: Create new contact using hubspot
 *    tags: [Contact]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ContactRequest'
 *    responses:
 *      200:
 *        description: Contact created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiResponse'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */

// * PUT - UPDATE CONTACT
/**
 * @swagger
 * /api/contact/update/{contactId}:
 *  put:
 *    summary: Update contact
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: contactId
 *        description: The contact id
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ContactRequest'
 *    responses:
 *      200:
 *        description: User has been updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiResponse'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */

// * DELETE - DELETE CONTACT
/**
 * @swagger
 * /api/contact/delete/{contactId}:
 *  delete:
 *    summary: Delete contact
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: contactId
 *        required: true
 *        description: The contact id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: 'Contact has been deleted'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/DeleteSuccess'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */

// * GET - get contact
/**
 * @swagger
 * /api/contact/{contactId}:
 *  get:
 *    summary: Get contact by id
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: contactId
 *        required: true
 *        description: The contact id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: 'Contact found'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ApiResponse'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */

// * GET - get contacts
/**
 * @swagger
 * /api/contact/list:
 *  get:
 *    summary: Get contact list
 *    tags: [Contact]
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: The number of items to return
 *        default: 10
 *      - in: query
 *        name: nextPage
 *        schema:
 *          type: string
 *        description: The next page token
 *    responses:
 *      200:
 *        description: 'Contact list'
 *        content:
 *          application/json:
 *            schema:
 *              type: [object]
 *              $ref: '#/components/schemas/ApiResponse'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */

// * POST - SEARCH CONTACT BY PARAMETER
/**
 * @swagger
 * /api/contact/search:
 *  post:
 *    summary: Get contact by parameter
 *    description: Get contact by parameter (email, phone, firstname, lastname)
 *    tags: [Contact]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SearchRequest'
 *    responses:
 *      200:
 *        description: 'Contact list by parameter'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ApiResponse'
 *      401:
 *        description: Unauthorized. The request requires authentication but it isn't provided
 *      403:
 *        description: Forbbiden. The request may be valid but the user doesn't have permissions to perform the action.
 *      404:
 *        description: Not Found. The resource can't be found to fulfill the request
 *      422:
 *        description: Validations failed
 *      500:
 *        description: Internal error server. Please contact to backend team
 */
