import faker from "@faker-js/faker";
import { prisma } from "@/config";

export function createRandomHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.address.city(),
      image: faker.image.imageUrl()
    },
  });
}

export function createRandomRoomOfHotel(hotelId: number, roomsCount: number) {
  const many = [];
  roomsCount = (!roomsCount || roomsCount===0)? faker.datatype.number({ min: 1, max: 5 }): roomsCount;

  for (let i=0;  i<roomsCount;  i++) {
    many.push({
      name: faker.address.city(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId,
    });
  }

  return prisma.room.createMany({ data: many });
}
