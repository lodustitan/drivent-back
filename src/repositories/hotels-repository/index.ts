import { prisma } from "@/config";

async function findAll() {
  return prisma.hotel.findMany();
}

async function findFirst(hotelId: number) {
  return prisma.hotel.findFirst({ 
    where: { id: hotelId }, 
    include: {
      Rooms: true,
    }
  });
}

async function haveTicket(userId: number) {
  return prisma.enrollment.findFirst({ 
    where: { userId }, 
    select: {
      Ticket: {
        select: {
          Payment: {
            select: { ticketId: true }
          },
          TicketType: {
            select: { includesHotel: true }
          }
        }
      }
    }
  });
}

const hotelsRepository = {
  findAll,
  findFirst,
  haveTicket,
};

export default hotelsRepository;
