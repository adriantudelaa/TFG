import express from "express"
import usuariosRoutes from "./routes/usuarios.routes.js"
import museosRoutes from "./routes/museos.routes.js"
import reservasRoutes from "./routes/reservas.routes.js"
import administradoresRoutes from "./routes/administradores.routes.js"
import chatboxRoutes from "./routes/chatbox.routes.js"

const app = express()

app.use(usuariosRoutes)
app.use(museosRoutes)
app.use(reservasRoutes)
app.use(administradoresRoutes)
app.use(chatboxRoutes)

app.listen(3000)
console.log("Server is running on port 3000")