import { NextFunction, Request, Response } from "express";
import { HelloControler } from "./HelloController";

const helloControler = new HelloControler();

describe("HelloController", () => {
  it("should return a JSON response with 'Hello'", () => {
    const mockRequest: Partial<Request> = {};
    const mockNext: Partial<NextFunction> = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
    };

    helloControler.home(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      response: "Hello",
    });
  });
});
