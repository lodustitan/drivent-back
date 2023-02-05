import jwt from "jsonwebtoken";
import supertest from "supertest";
import { Prisma, TicketStatus } from "@prisma/client";
import app, { init } from "@/app";
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { 
  createRandomHotel, 
  createRandomRoomOfHotel,
  createUser,
  createTicket,
  createTicketType,
  createEvent,
  createPayment,
  createSession,
  createEnrollmentWithAddress,
  createhAddressWithCEP,
  generateCreditCardData
} from "../factories";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});
  
const server = supertest(app);

describe("GET /hotels", () => {
  it("Should return a list of hotels and status 200", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const hotel = await createRandomHotel();
    await createRandomRoomOfHotel(hotel.id, 0);

    const result = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    const { body, status } = result;

    expect(status).toEqual(httpStatus.OK);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      ])
    );
  });
    
  it("Should return status 200 if have hotel", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    const hotel = await createRandomHotel();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createRandomRoomOfHotel(hotel.id, 0);

    const result = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);

    const { body, status } = result;

    expect(status).toBe(httpStatus.OK);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        image: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        Rooms: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number), 
            name: expect.any(String), 
            capacity: expect.any(Number), 
            hotelId: expect.any(Number), 
            createdAt: expect.any(String), 
            updatedAt: expect.any(String)
          })
        ])
      })
    );
  });

  it("Should return status 204 if hotel not exist", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createRandomHotel();
    await createRandomRoomOfHotel(hotel.id, 0);

    const result = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`);
    
    const { status } = result;

    expect(status).toEqual(httpStatus.NO_CONTENT);
  });

  it("Should return status 401 if user not is logged", async () => {
    const result = await server.get("/hotels/1");
    
    const { status } = result;

    expect(status).toEqual(httpStatus.UNAUTHORIZED);
  });
});
