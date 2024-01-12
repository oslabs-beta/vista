import { jest, beforeEach, it, expect } from "@jest/globals";
import { mockQuery } from "../__mocks__/database";

// Mock setup
jest.mock("../src/utils/database", () => ({
  db: {
    query: mockQuery,
  },
}));

import { POST } from "../src/app/api/queries/route";

describe("POST function tests", () => {
  beforeEach(() => {
    mockQuery.mockClear();
    mockQuery.mockReset();
  });

  it("should find an existing user and add a query", async () => {
    // Mock responses setup
    mockQuery.mockResolvedValueOnce({
      rows: [{ _id: "user1" }],
      command: "SELECT",
      rowCount: 1,
    });
    mockQuery.mockResolvedValueOnce({
      rows: [{ queryId: "query1" }],
      command: "INSERT",
      rowCount: 1,
    });

    // Create a test request
    const request = new Request("http://example.com", {
      method: "POST",
      body: JSON.stringify({
        queryName: "testQuery",
        queryText: "SELECT * FROM test:",
        endpoint: "http://example.com",
        userEmail: "user1@example.com",
      }),
    });

    // Call the POST function and assert results
    const response: Response = await POST(request);
    expect(response).toBeInstanceOf(Response);
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });

  it("should handle user not found and create a new user", async () => {
    //set up mock to simulate user not found and then user creation
    mockQuery.mockResolvedValueOnce({
      rows: [],
      command: "SELECT",
      rowCount: 0,
    }); //--> user not found
    mockQuery.mockResolvedValueOnce({
      rows: [{ _id: "newUser" }],
      command: "INSERT",
      rowCount: 1,
    }); //--> user creation
    mockQuery.mockResolvedValueOnce({
      rows: [{ queryId: "query1" }],
      command: "INSERT",
      rowCount: 1,
    }); //--> query addition

    // create test request
    const request = new Request("http://example.com", {
      method: "POST",
      body: JSON.stringify({
        queryName: "testQuery",
        queryText: "SELCT * FROM test",
        endpoint: "http://example.com",
        userEmail: "newuser@example.com",
      }),
    });
    const response: Response = await POST(request);
    expect(response).toBeInstanceOf(Response);
    expect(mockQuery).toHaveBeenCalledTimes(3);
  });

  it("should handle query insertion failure", async () => {
    //setup mock to simulate user found and query insertion failure
    mockQuery.mockResolvedValueOnce({
      rows: [{ _id: "user1" }],
      command: "SELECT",
      rowCount: 1,
    });
    mockQuery.mockResolvedValueOnce(new Error("Insert query failed"));

    // create test request
    const request = new Request("http://example.com", {
      method: "POST",
      body: JSON.stringify({
        queryName: "testQuery",
        queryText: "SELECT * FROM test:",
        endpoint: "http://example.com",
        userEmail: "user1@example.com",
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    expect(await response.text()).toContain("Failed to add query");
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });
  it("should handle an invalid request body", async () => {
    // create a test request with missing fields in body (userEmail missing)
    const request = new Request('http://example.com', {
      method: "POST",
      body: JSON.stringify({
        queryName: 'testQuery',
        endpoint: 'http://example.com',
      }),
    });
    const response = await POST(request);
    expect(response.status).toBe(500);
    expect(await response.text()).toContain('Invalid request body');
    expect(mockQuery).not.toHaveBeenCalled();
  })
});
