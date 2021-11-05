import { USER_GENDER, USER_ROLE, USER_ACTIVE } from "./config/constants.js";

export const openApiDocumentation = {
  openapi: "3.0.3",
  info: {
    version: "1.0.0",
    title: "Training server",
    description: "Library API of training server",
    termsOfService: "http://example.com/terms/",
    contact: {
      name: "LVH",
      email: "hieu.lv@zinza.com.vn",
      url: "http://localhost:5000/api-docs",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development server",
    },
    {
      url: "http://localhost:5001/api/v1",
      description: "Testing server",
    },
    {
      url: "http://localhost:5002/api/v1",
      description: "Production server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "users",
    },
    {
      name: "departments",
    },
    {
      name: "requests",
    },
    {
      name: "timeSheets",
    },
    {
      name: "files",
    },
  ],
  paths: {
    "/user/login": {
      post: {
        tags: ["users"],
        description:
          "If you are an admin, please use the existing account of the system, the rest use the account created by the admin and log in to the system",
        operationId: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    $ref: "#/components/schemas/email",
                  },
                  password: {
                    $ref: "#/components/schemas/password",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      $ref: "#/components/schemas/success",
                    },
                    message: {
                      $ref: "#/components/schemas/message",
                    },
                    accessToken: {
                      type: "string",
                      description: "Return access token",
                      example: "abc.xyz.123",
                    },
                  },
                  required: ["success", "message", "accessToken"],
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      // response
      success: {
        type: "boolean",
        description: "The status of the request",
        example: false,
      },
      message: {
        type: "string",
        description: "Return request's message",
        example: "Internal server error",
      },
      // user
      email: {
        type: "string",
        description: "Email address",
        example: "hieu.lv@zinza.com.vn",
      },
      password: {
        type: "string",
        description: "password",
        example: "123123",
      },
      fullName: {
        type: "string",
        description: "Full name",
        example: "Le Van Hieu",
      },
      avatar: {
        type: "string",
        description: "url avatar",
        example: "http://localhost:5000/api/v1/file/123456789",
      },
      dateOfBirth: {
        type: "string",
        description: "Date of birth",
        example: "20/08/2000",
      },
      gender: {
        type: "integer",
        enum: USER_GENDER,
        default: 0,
        description: "User gender",
        example: 0,
      },
      address: {
        type: "string",
        description: "Address",
        example: "89, Pham Van Dong, Mai Dich, CG, HN",
      },
      role: {
        type: "integer",
        enum: USER_ROLE,
        default: 2,
        description: "User role",
        example: 2,
      },
      department: {
        type: "array",
        description: "Departments that the user has joined",
        example: ["id1", "id2"],
      },
      active: {
        type: "integer",
        enum: USER_ACTIVE,
        default: 0,
        description: "the status of the account",
        example: 0,
      },
      joinCompanyAt: {
        type: "string",
        description: "day join in company",
        example: "28/06/2021",
      },
      phone: {
        type: "string",
        description: "Phone number",
        example: "0123456789",
      },
      User: {
        type: "object",
        properties: {
          email: {
            $ref: "#/components/schemas/email",
          },
          password: {
            $ref: "#/components/schemas/password",
          },
          fullName: {
            $ref: "#/components/schemas/fullName",
          },
          avatar: {
            $ref: "#/components/schemas/avatar",
          },
          dateOfBirth: {
            $ref: "#/components/schemas/dateOfBirth",
          },
          gender: {
            $ref: "#/components/schemas/gender",
          },
          address: {
            $ref: "#/components/schemas/address",
          },
          role: {
            $ref: "#/components/schemas/role",
          },
          department: {
            $ref: "#/components/schemas/department",
          },
          active: {
            $ref: "#/components/schemas/active",
          },
          joinCompanyAt: {
            $ref: "#/components/schemas/joinCompanyAt",
          },
          phone: {
            $ref: "#/components/schemas/phone",
          },
        },
      },
      Users: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      Response: {
        type: "object",
        properties: {
          success: {
            $ref: "#/components/schemas/success",
          },
          message: {
            $ref: "#/components/schemas/message",
          },
        },
      },
    },
    securitySchemes: {
      accessToken: {
        type: "apiKey",
        in: "header",
        name: "accessToken",
      },
    },
  },
};
