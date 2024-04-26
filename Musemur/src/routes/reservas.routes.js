import { Router } from "express"
import { getReservas } from "../controllers/reservas.controlers.js";

const router = Router()

router.get("/reservas", getReservas);

router.post("/reservas", postReservas);

router.put("/reservas", putReservas);

router.delete("/reservas", deleteReservas);

export default router