import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const haveTicket = await hotelsService.haveTicket(userId);

    if(!haveTicket) throw new Error();
    const listOfHotels = await hotelsService.getAllHotels();

    return res.status(httpStatus.OK).send(listOfHotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId);
  
  try {
    const haveTicket = await hotelsService.haveTicket(userId);
    
    if(!haveTicket) return res.sendStatus(httpStatus.NOT_FOUND);
    const hotelWithRooms = await hotelsService.getHotelById(hotelId);

    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
