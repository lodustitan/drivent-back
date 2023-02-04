import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getAllHotels, getHotelById } from "@/controllers/hotels-controller";
import { getHotelSchema } from "@/schemas/hotels-schemas";

const hotelsRouter = Router();

hotelsRouter.get("/", authenticateToken, getAllHotels);
hotelsRouter.get("/:hotelId", authenticateToken, validateParams(getHotelSchema), getHotelById);

export { hotelsRouter };
