import { Router } from "express"
import { getReservas } from "../controllers/reservas.controlers.js";

const router = Router()

router.get("/reservas", getReservas);

router.post("/reservas", getReservas);

router.put("/reservas", getReservas);

router.delete("/reservas", getReservas);

export default router