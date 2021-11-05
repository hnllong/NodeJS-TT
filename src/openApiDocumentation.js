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
      url: "http://localhost:5000/api/docs/v1",
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
      access_token: [],
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
    // -----user routes-----
    "/user/login": {
      post: {
        tags: ["users"],
        summary: "Api login",
        description:
          "If you are admin, please use the existing account of the system, the rest use the account created by the admin and log in to the system",
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
            description:
              "Request was successful.[success: true || success: false]",
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

    "/user/create": {
      post: {
        tags: ["users"],
        summary: "Api create new user",
        description:
          "If you are admin, create a new user. Otherwise you do not have permission to execute this api",
        operationId: "Create",
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
                  fullName: {
                    $ref: "#/components/schemas/fullName",
                  },
                  role: {
                    $ref: "#/components/schemas/role",
                  },
                  gender: {
                    $ref: "#/components/schemas/gender",
                  },
                },
                required: ["email", "password", "fullName", "role", "gender"],
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
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
                    data: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
        },
      },
    },

    "/user/reset-password": {
      put: {
        tags: ["users"],
        summary: "Api reset one or more user",
        description: "If you are admin, you can reset one or more passwords",
        operationId: "ResetPassword",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  arrayId: {
                    type: "array",
                    description: "Array userId want to delete",
                    example: ["userId1", "userId2"],
                  },
                },
                required: ["arrayId"],
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },

    "/user/info": {
      get: {
        tags: ["users"],
        summary: "Api get information of user who is logged in",
        description: "Get information of logged in user",
        operationId: "GetInfo",
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
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
                    data: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
        },
      },
    },

    "/user/list": {
      post: {
        tags: ["users"],
        summary: "Api get all users",
        description: "Returns list of users",
        operationId: "GetList",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  currentPage: {
                    $ref: "#/components/schemas/currentPage",
                  },
                  pageSize: {
                    $ref: "#/components/schemas/pageSize",
                  },
                  context: {
                    $ref: "#/components/schemas/context",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
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
                    data: {
                      total: {
                        type: "integer",
                        description: "total number of users",
                        example: 100,
                      },
                      totalPage: {
                        type: "integer",
                        description: "total number of pages",
                        example: 10,
                      },
                      $ref: "#/components/schemas/Users",
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
        },
      },
    },

    "/user/change-password": {
      put: {
        tags: ["users"],
        summary: "Api change password",
        description: "Change password",
        operationId: "ChangePassword",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  oldPassword: {
                    type: "string",
                    description: "old password",
                    example: "123123",
                  },
                  newPassword: {
                    type: "string",
                    description: "new password",
                    example: "123456",
                  },
                },
                required: ["ollPassword", "newPassword"],
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },

    "/user/delete": {
      delete: {
        tags: ["users"],
        summary: "Api delete one or more users",
        description: "If you are admin, you can delete one or more users",
        operationId: "DeleteUser",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  arrayId: {
                    type: "array",
                    description: "Array userId want to delete",
                    example: ["userId1", "userId2"],
                  },
                },
                required: ["arrayId"],
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
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
                    data: {
                      type: "array",
                      description: "Deleted userId array",
                      example: ["userId1", "userId2"],
                    },
                  },
                  required: ["success", "message", "data"],
                },
              },
            },
          },
        },
      },
    },

    "/user/update/{id}": {
      put: {
        tags: ["users"],
        summary: "Api update user",
        description:
          "If user update my profile then can update fullName, dateOfBirth, gender, address, role, joinCompanyAt, phone, avatar. If admin then There will be the following cases: update role for manager role: 2 -> role: 1 true when department of manager: []. If manager don't update department of manager. Update staff -> manager => department: []. If staff can update department of staff",
        operationId: "UpdateUser",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: {
                    $ref: "#/components/schemas/fullName",
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
                  joinCompanyAt: {
                    $ref: "#/components/schemas/joinCompanyAt",
                  },
                  phone: {
                    $ref: "#/components/schemas/phone",
                  },
                  avatar: {
                    $ref: "#/components/schemas/avatar",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
            schema: {
              type: "object",
              properties: {
                success: {
                  $ref: "#/components/schemas/success",
                },
                message: {
                  $ref: "#/components/schemas/message",
                },
                data: {
                  $ref: "#/components/schemas/User",
                },
              },
              required: ["success", "message", "data"],
            },
          },
        },
      },
    },

    "/user/view/{id}": {
      get: {
        tags: ["users"],
        summary: "Api view information user",
        description:
          "Admin can view info of user. Manager can view info of user in department",
        operationId: "ViewUser",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description:
              "Request was successful.[success: true || success: false]",
            schema: {
              type: "object",
              properties: {
                success: {
                  $ref: "#/components/schemas/success",
                },
                message: {
                  $ref: "#/components/schemas/message",
                },
                data: {
                  $ref: "#/components/schemas/User",
                },
              },
              required: ["success", "message", "data"],
            },
          },
        },
      },
    },

    // -----department routes-----
    "/department/list": {},

    "/department/create": {},

    "/department/update/{id}": {},

    "/department/delete/{id}": {},

    "/department/read/{id}": {},

    "/department/list-user": {},

    "/department/export-staff-list": {},

    // -----request routes-----
    "/request/create": {},

    "/request/accept/{id}": {},

    "/request/refuse/{id}": {},

    "/request/user-list": {},

    "/request/member-list": {},

    // -----timeSheet routes-----
    "/timesheet/check-in": {},

    "/timesheet/check-out/{id}": {},

    "/timesheet/list": {},

    "/timesheet/work-date/{id}": {},

    // -----file routes-----
    "/file/upload": {},

    "/file/{key}": {},

    "/file/{key}": {},
  },
  components: {
    schemas: {
      // -----pagination && search-----
      currentPage: {
        type: "integer",
        description: "Current page",
        example: 1,
      },
      pageSize: {
        type: "integer",
        description: "limit of a page",
        example: 5,
      },
      context: {
        type: "string",
        description: "the keyword to search",
        example: "name",
      },

      // -----response-----
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

      // -----user properties-----
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

      // -----UserModel-----
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

      // -----list user-----
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
      // -----response-----
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
      access_token: {
        type: "apiKey",
        in: "header",
        name: "access_token",
      },
    },
  },
};
