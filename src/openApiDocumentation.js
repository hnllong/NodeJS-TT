import {
  USER_GENDER,
  USER_ROLE,
  USER_ACTIVE,
  REQUEST_STATUS,
} from "./config/constants.js";

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
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://api.training.prod/api/v1",
      description: "Production server",
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
                      list: {
                        $ref: "#/components/schemas/Users",
                      },
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
        security: [
          {
            access_token: [],
          },
        ],
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
    "/department/list": {
      post: {
        tags: ["departments"],
        summary: "Api get all departments",
        description: "Returns list of department",
        operationId: "GetList",
        security: [
          {
            access_token: [],
          },
        ],
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
                        description: "total number of department",
                        example: 100,
                      },
                      totalPage: {
                        type: "integer",
                        description: "total number of pages",
                        example: 10,
                      },
                      list: {
                        $ref: "#/components/schemas/Departments",
                      },
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

    "/department/create": {
      post: {
        tags: ["departments"],
        summary: "Api create new department",
        description: "If you are admin, create a new department",
        operationId: "Create",
        security: [
          {
            access_token: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    $ref: "#/components/schemas/name",
                  },
                  managerId: {
                    $ref: "#/components/schemas/managerId",
                  },
                },
                required: ["name", "managerId"],
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
                      $ref: "#/components/schemas/Department",
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

    "/department/update/{id}": {
      put: {
        tags: ["departments"],
        summary: "Api update department",
        description: "If you are admin, can update department",
        operationId: "Update",
        security: [
          {
            access_token: [],
          },
        ],
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
                  name: {
                    $ref: "#/components/schemas/name",
                  },
                  managerId: {
                    $ref: "#/components/schemas/managerId",
                  },
                },
                required: ["name", "managerId"],
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
                      $ref: "#/components/schemas/Department",
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

    "/department/delete/{id}": {
      delete: {
        tags: ["departments"],
        summary: "Api delete department",
        description: "If you are admin, can delete department",
        operationId: "Delete",
        security: [
          {
            access_token: [],
          },
        ],
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
                      type: "string",
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

    "/department/read/{id}": {
      get: {
        tags: ["departments"],
        summary: "Api get info of a department",
        description: "If you are admin, can get info of a department",
        operationId: "ReadDepartment",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Department",
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

    "/department/list-user": {
      get: {
        tags: ["departments"],
        summary: "Api get list user of this department",
        description:
          "If you are manager this department, can get list user of this department",
        operationId: "GetListUserOfDepartment",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Departments",
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

    "/department/export-staff-list": {
      get: {
        tags: ["departments"],
        summary: "Api export list staff of this department to file CSV",
        description:
          "If you are manager this department, can export list user of this department to file CSV",
        operationId: "ExportListUserOfDepartment",
        security: [
          {
            access_token: [],
          },
        ],
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

    // -----request routes-----
    "/request/create": {
      post: {
        tags: ["requests"],
        summary: "Api create new request",
        description: "Create new a request and send mail to manager and admin",
        operationId: "Create",
        security: [
          {
            access_token: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  type: {
                    $ref: "#/components/schemas/type",
                  },
                  reason: {
                    $ref: "#/components/schemas/reason",
                  },
                  startAt: {
                    $ref: "#/components/schemas/startAt",
                  },
                  endAt: {
                    $ref: "#/components/schemas/endAt",
                  },
                },
                required: ["type", "reason", "startAt", "endAt"],
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
                      $ref: "#/components/schemas/Request",
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

    "/request/accept/{id}": {
      put: {
        tags: ["requests"],
        summary: "Api accept request",
        description:
          "If you are admin can accept all request, if you are manager can accept requests in department",
        operationId: "Accept",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Request",
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

    "/request/refuse/{id}": {
      put: {
        tags: ["requests"],
        summary: "Api refuse request",
        description:
          "If you are admin can refuse all request, if you are manager can refuse requests in department",
        operationId: "Refuse",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Request",
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

    "/request/user-list": {
      get: {
        tags: ["requests"],
        summary: "Api get all my request",
        description: "Get all my requests",
        operationId: "GetUserList",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Requests",
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

    "/request/member-list": {
      get: {
        tags: ["requests"],
        summary: "Api get all requests",
        description:
          "If you're an admin, get all requests, if you're a manager, get all requests from department members",
        operationId: "GetMemberList",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/Requests",
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

    // -----timeSheet routes-----
    "/timesheet/check-in": {
      post: {
        tags: ["timeSheets"],
        summary: "Api check in",
        description: "User check in",
        operationId: "CheckIn",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/TimeSheet",
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

    "/timesheet/check-out/{id}": {
      put: {
        tags: ["timeSheets"],
        summary: "Api check out",
        description: "User check out",
        operationId: "CheckOut",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/TimeSheet",
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

    "/timesheet/list": {
      get: {
        tags: ["timeSheets"],
        summary: "Api get time sheet",
        description: "Get time sheet",
        operationId: "GetTimeSheet",
        security: [
          {
            access_token: [],
          },
        ],
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
                      $ref: "#/components/schemas/TimeSheets",
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

    "/timesheet/work-date/{id}": {
      post: {
        tags: ["timeSheets"],
        summary: "Api export time sheet of user",
        description: "Manager export time sheet of user to file",
        operationId: "ExportTimeSheet",
        security: [
          {
            access_token: [],
          },
        ],
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
                  month: {
                    type: "integer",
                    description:
                      "Select the month you want to calculate the time",
                  },
                },
                required: ["month"],
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

    // -----file routes-----
    "/file/upload": {
      post: {
        tags: ["files"],
        summary: "Api upload file",
        description: "FormData: Choose file and upload",
        operationId: "Upload",
        security: [
          {
            access_token: [],
          },
        ],
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

    "/file/{key}": {
      get: {
        tags: ["files"],
        summary: "Api get file",
        description: "Get file",
        operationId: "GetFile",
      },
    },
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
        example: "http://training.staging/api/v1/file/123456789",
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

      // -----department properties-----
      name: {
        type: "string",
        description: "Department name",
        example: "Division 1",
      },
      managerId: {
        type: "string",
        description: "Manager id",
        example: "122141243",
      },

      // -----request properties-----
      type: {
        type: "string",
        description: "Request type",
        example: "Nghỉ phép không lương",
      },
      reason: {
        type: "string",
        description: "reason of request",
        example: "Đi tiêm vắc xin",
      },
      startAt: {
        type: "string",
        description: "Start time",
        example: "20/08/2000",
      },
      endAt: {
        type: "string",
        description: "End time",
        example: "20/08/2000",
      },
      userId: {
        type: "string",
        description: "Requester's id",
        example: "12344",
      },
      approver: {
        type: "array",
        description: "who can process that request",
        example: ["id1", "id2"],
      },
      status: {
        type: "integer",
        enum: REQUEST_STATUS,
        default: 0,
        description: "request status",
        example: 0,
      },

      // -----timeSheet properties-----
      checkInAt: {
        type: "string",
        description: "Check in at",
        example: "20/08/2000 12:00",
      },
      checkOutAt: {
        type: "string",
        description: "Check out at",
        example: "20/08/2000 18:00",
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

      // -----DepartmentModel-----
      Department: {
        type: "object",
        properties: {
          name: {
            $ref: "#/components/schemas/name",
          },
          managerId: {
            $ref: "#/components/schemas/managerId",
          },
        },
      },

      // -----RequestModel-----
      Request: {
        type: "object",
        properties: {
          type: {
            $ref: "#/components/schemas/type",
          },
          reason: {
            $ref: "#/components/schemas/reason",
          },
          startAt: {
            $ref: "#/components/schemas/startAt",
          },
          endAt: {
            $ref: "#/components/schemas/endAt",
          },
          userId: {
            $ref: "#/components/schemas/userId",
          },
          approver: {
            $ref: "#/components/schemas/approver",
          },
          status: {
            $ref: "#/components/schemas/status",
          },
        },
      },

      // -----TimeSheetModel-----
      TimeSheet: {
        type: "object",
        properties: {
          userId: {
            $ref: "#/components/schemas/userId",
          },
          checkInAt: {
            $ref: "#/components/schemas/checkInAt",
          },
          checkOutAt: {
            $ref: "#/components/schemas/checkOutAt",
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

      // -----list department-----
      Departments: {
        type: "object",
        properties: {
          departments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Department",
            },
          },
        },
      },

      // -----list request-----
      Requests: {
        type: "object",
        properties: {
          requests: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Request",
            },
          },
        },
      },

      // -----list timeSheets-----
      TimeSheets: {
        type: "object",
        properties: {
          timeSheets: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TimeSheet",
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
