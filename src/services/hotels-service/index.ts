import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function getAllHotels() {
  const allHotels = await hotelsRepository.findAll();

  if(!allHotels) {
    throw notFoundError();
  }

  return allHotels;
}

async function getHotelById(hotelId: number) {
  const hotelWithRooms = await hotelsRepository.findFirst(hotelId);

  if(!hotelWithRooms) {
    throw notFoundError();
  }

  return hotelWithRooms;
}

async function haveTicket(userId: number) {
  const haveTickets = await hotelsRepository.haveTicket(userId);
  
  if(!haveTickets) {
    throw notFoundError();
  }

  return haveTickets;
}

const hotelsService = {
  getAllHotels,
  getHotelById,
  haveTicket
};

export default hotelsService;
