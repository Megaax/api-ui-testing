import supertest from "supertest";
import app from "../app";
import { expect } from "chai";

const email = "boo@gmail.com";
const password = "123";
const name = "boo";


describe("User Registration, Authentication, and Data Retrieval", () => {
    let authToken;

    // Register a new user
    describe("POST /api/v1/users (User Registration)", () => {
        let registrationResponse;

        beforeAll(async () => {
            registrationResponse = await supertest(app)
                .post("/api/v1/users")
                .send({
                    name: name,
                    email: email,
                    password: password
                });
        });

        test("return 200 status code and success message with token", () => {
            expect(registrationResponse.statusCode).to.equal(200);
            expect(registrationResponse.body).to.have.property('message', 'User registered with success');
        });
    });

    // Authenticate and obtain the token
    describe("POST /api/v1/auth (Authentication and Token Retrieval)", () => {
        beforeAll(async () => {
            const authenticationResponse = await supertest(app)
                .post("/api/v1/auth")
                .send({
                    email: email,
                    password: password
                });

            authToken = authenticationResponse.body.token;
        });

        test("return 200 status code and obtain the authentication token", () => {
            expect(authToken).to.be.a('string');
            expect(authToken).to.not.be.empty;
        });
    });

    // Retrieve user data using the obtained token
    describe("GET /api/v1/users (Retrieve User Data)", () => {
        let userDataResponse;

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            userDataResponse = await supertest(app)
                .get("/api/v1/users")
                .set("Authorization", authToken);
        });

        test("return 200 status code with valid authorization", () => {
            expect(userDataResponse.statusCode).to.equal(200);
        });

        test("return the expected data in the response body", () => {
            expect(userDataResponse.body).to.have.property('id');
            expect(userDataResponse.body).to.have.property('email', email);
            expect(userDataResponse.body).to.have.property('password', password);
            // Add more assertions based on your actual response structure
        });
    });

    describe("PATCH /api/v1/users (Update User)", () => {
        let response; // Corrected variable name

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            response = await supertest(app)
                .patch("/api/v1/users")
                .set("Authorization", authToken) // Corrected header format
                .send({
                    "name": "newName",
                    "email": "new_email@gmail.com",
                    "password": "newpassword123"
                });
        });

        test("return 200 status code with valid authorization", () => {
            expect(response.statusCode).to.equal(200);
        });

        test("return the expected message in the response body for user update", () => {
            expect(response.body).to.have.property('message', 'User updated with success!');
        });
    });

    describe("POST /api/v1/auth", () => {
        beforeAll(async () => {
            const authenticationResponse = await supertest(app)
                .post("/api/v1/auth")
                .send({
                    email: "new_email@gmail.com",
                    password: "newpassword123"
                });

            authToken = authenticationResponse.body.token;
        });

        test("return 200 status code and obtain the authentication token", () => {
            expect(authToken).to.be.a('string');
            expect(authToken).to.not.be.empty;
        });
    });

    describe("DELETE /api/v1/users (Delete User)", () => {
        let deleteResponse;

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            deleteResponse = await supertest(app)
                .delete("/api/v1/users")
                .set("Authorization", authToken);
        });

        test("return 200 status code with valid authorization", () => {
            expect(deleteResponse.statusCode).to.equal(200);
        });

        test("return the expected message in the response body for user deleted", () => {
            expect(deleteResponse.body).to.have.property('message', "User deleted with success!");
        });
    });

    describe("DELETE /api/v1/all-users (Delete All Users)", () => {
        let deleteResponse;

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            deleteResponse = await supertest(app)
                .delete("/api/v1/all-users")
                .send({
                    "key_admin": "keyadmin123"
                });
        });

        test("return 200 status code with valid authorization", () => {
            expect(deleteResponse.statusCode).to.equal(200);
        });

        test("return the expected message in the response body for user deleted", () => {
            expect(deleteResponse.body).to.have.property('message', "Users deleted with success");
        });
    });


});



describe("Invalid Submissions", () => {
    let authToken;

    describe("POST /api/v1/users (User Registration - Duplicate)", () => {
        let registrationResponse;

        beforeAll(async () => {
            registrationResponse = await supertest(app)
                .post("/api/v1/users")
                .send({
                    name: name,
                    email: email,
                    password: password
                });
        });

        test("return 200 status code and success message with token", () => {
            expect(registrationResponse.statusCode).to.equal(200);
            expect(registrationResponse.body).to.have.property('message', 'User registered with success');
        });
    });

    describe("POST /api/v1/users (Invalid Authentication)", () => {
        let registrationResponse;

        beforeAll(async () => {
            registrationResponse = await supertest(app)
                .post("/api/v1/users")
                .send({
                    name: name,
                    email: email,
                    password: password
                });
        });

        test("return 401 status code and user already registered ", () => {
            expect(registrationResponse.statusCode).to.equal(401);
            expect(registrationResponse.body).to.have.property('message', "User already registered");
        });
    });


    describe("POST /api/v1/auth (Unauthorized Access)", () => {
        let authenticationResponse;
        beforeAll(async () => {
            authenticationResponse = await supertest(app)
                .post("/api/v1/auth")
                .send({
                    email: "novalidemail",
                    password: password
                });

        });

        test("return 401 status code and no token", () => {
            expect(authenticationResponse.statusCode).to.equal(401);
            expect(authenticationResponse.body).to.have.property('message', "Incorrect email or password");
        });
    });

    describe("GET /api/v1/users (Invalid Authentication)", () => {
        let userDataResponse;

        beforeAll(async () => {
            userDataResponse = await supertest(app)
                .get("/api/v1/users")
        });

        test("return 403 status code with un authorization", () => {
            expect(userDataResponse.statusCode).to.equal(403);
        });

        test("return the expected data in the response body", () => {
            expect(userDataResponse.body).to.have.property('message', "Unauthorized");
        });
    });

    describe("PATCH /api/v1/users (Missing Token)", () => {
        let response;

        beforeAll(async () => {
            response = await supertest(app)
                .patch("/api/v1/users")
                .send({
                    "name": "newName",
                    "email": "new_email@gmail.com",
                    "password": "newpassword123"
                });
        });

        test("return 403 status code with missing token", () => {
            expect(response.statusCode).to.equal(403);
        });

        test("return the expected message missing jwt token", () => {
            expect(response.body).to.have.property('message', "jwt must be provided");
        });
    });



    describe("PATCH /api/v1/users (Wrong Token)", () => {
        let response;

        beforeAll(async () => {
            response = await supertest(app)
                .patch("/api/v1/users")
                .set("Authorization", "1235421555")
                .send({
                    "name": "newName",
                    "email": "new_email@gmail.com",
                    "password": "newpassword123"
                });
        });

        test("return 403 Wrong Token", () => {
            expect(response.statusCode).to.equal(403);
        });

        test("return the expected message in the response body for invalid signature", () => {
            expect(response.body).to.have.property('message', "jwt malformed");
        });


    });

    const wrongtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im50YXJla0BnbWFpbC5jb20iLCJpZCI6MzEzNjcsImlhdCI6MTcwODM0ODgwMywiZXhwIjoxNzA4NDM1MjAzfQ.j1unTA-4lSdsl0aVTkXJEbAzBZ2nb5feeofnjLncLpgfffs";
    describe("PATCH /api/v1/users (Invalid Token Signature)", () => {
        let response;

        beforeAll(async () => {
            response = await supertest(app)
                .patch("/api/v1/users")
                .set("Authorization", wrongtoken)
                .send({
                    "name": "newName",
                    "email": "new_email@gmail.com",
                    "password": "newpassword123"
                });
        });

        test("return 403 Wrong Token", () => {
            expect(response.statusCode).to.equal(403);
        });

        test("return the expected message in the response body for invalid signature", () => {
            expect(response.body).to.have.property('message', "invalid signature");
        });
    });

    describe("DELETE /api/v1/all-users (Unauthorized Access)", () => {
        let deleteResponse;

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            deleteResponse = await supertest(app)
                .delete("/api/v1/all-users");
        });

        test("return 403 status code with Unauthorized access", () => {
            expect(deleteResponse.statusCode).to.equal(403);
        });

        test("return the expected message in the response body for user deleted", () => {
            expect(deleteResponse.body).to.have.property('message', "Unauthorized access");
        });
    });
    describe("DELETE /api/v1/all-users (Unauthorized Access with Wrong Key)", () => {
        let deleteResponse;

        beforeAll(async () => {
            // Assuming you have a valid token for authorization
            deleteResponse = await supertest(app)
                .delete("/api/v1/all-users")
                .send({
                    "key_admin": "Wrong-Key"
                })
        });

        test("return 403 status code with Unauthorized access", () => {
            expect(deleteResponse.statusCode).to.equal(403);
        });

        test("return the expected message in the response body for user deleted", () => {
            expect(deleteResponse.body).to.have.property('message', "Unauthorized access");
        });
    });



});



