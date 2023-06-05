const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/route.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "API",
        description: "API cadastro de projetos."
    },
    host: "localhost:8081",
    basePath: "/api-docs",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Usuarios"
        },
        {
            "name": "Projetos"
        },
        {
            "name": "Relacionamentos"
        }
    ],
    definitions: {
        Usuario: {
            nome: "Jhon Doe",
            idade: 29,
            cpf: "123456789",
            email: "teste@email.com",
            senha: "senha123",
            tipo: 3
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
})