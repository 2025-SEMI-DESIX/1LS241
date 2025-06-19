// app.js
import Fastify from 'fastify'

const ESTUDIANTES = [
  {
    id: 1,
    nombre: 'Juan Perez',
    edad: 20
  },
  {
    id: 2,
    nombre: 'Maria Lopez',
    edad: 21
  },
  {
    id: 3,
    nombre: 'Pedro Gomez',
    edad: 22
  }
]

// Crear una instancia de Fastify
const fastify = Fastify({
  logger: true // Habilita los logs para ver lo que sucede
})

// Declarar una ruta simple
fastify.get('/alive', async (request, reply) => {
    return 'Estoy vivoooo'
});

// Obtener todos los estudiantes
// http://localhost:3000/estudiantes
fastify.get('/estudiantes', async (request, reply) => {
    return {
        estudiantes: ESTUDIANTES,
        count: ESTUDIANTES.length
    }
})

// Obtener un estudiante por ID
// http://localhost:3000/estudiantes/1
// http://localhost:3000/estudiantes/2
// http://localhost:3000/estudiantes/3
fastify.get('/estudiantes/:id', async (request, reply) => {
    const { id } = request.params
    const estudiante = ESTUDIANTES.find(e => e.id === parseInt(id))
    return estudiante
})

// Crear un estudiante
// http://localhost:3000/estudiantes
fastify.post('/estudiantes', async (request, reply) => {
    const { nombre, edad } = request.body
    const nuevoEstudiante = { id: ESTUDIANTES.length + 1, nombre, edad }
    ESTUDIANTES.push(nuevoEstudiante)
    return nuevoEstudiante
})

// Actualizar un estudiante
// http://localhost:3000/estudiantes/1
// http://localhost:3000/estudiantes/2
// http://localhost:3000/estudiantes/3
fastify.put('/estudiantes/:id', async (request, reply) => {
    const { id } = request.params
    const { nombre, edad } = request.body
    const estudiante = ESTUDIANTES.find(e => e.id === parseInt(id))
    if (!estudiante) {
        return reply.status(404).send({ error: 'Estudiante no encontrado' })
    }
    estudiante.nombre = nombre
    estudiante.edad = edad
    return estudiante
})

// Función para iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0' // Permite conexiones desde cualquier IP
    })
    console.log('🚀 Servidor corriendo en http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
