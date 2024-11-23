"use strict";
let __create = Object.create;
let __defProp = Object.defineProperty;
let __getOwnPropDesc = Object.getOwnPropertyDescriptor;
let __getOwnPropNames = Object.getOwnPropertyNames;
let __getProtoOf = Object.getPrototypeOf;
let __hasOwnProp = Object.prototype.hasOwnProperty;
let __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
let __export = (target, all) => {
  for (let name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
let __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
let __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
let __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
let require_utils = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports2, module2) {
    let __defProp2 = Object.defineProperty;
    let __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    let __getOwnPropNames2 = Object.getOwnPropertyNames;
    let __hasOwnProp2 = Object.prototype.hasOwnProperty;
    let __export2 = (target, all) => {
      for (let name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    let __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    let __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    let utils_exports = {};
    __export2(utils_exports, {
      esbuildIgnorePathPrefixPlugin: () => esbuildIgnorePathPrefixPlugin,
      matchApiRoute: () => matchApiRoute2
    });
    module2.exports = __toCommonJS2(utils_exports);
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    function matchApiRoute2(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
let require_request = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports2, module2) {
    let __defProp2 = Object.defineProperty;
    let __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    let __getOwnPropNames2 = Object.getOwnPropertyNames;
    let __hasOwnProp2 = Object.prototype.hasOwnProperty;
    let __export2 = (target, all) => {
      for (let name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    let __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    let __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    let request_exports = {};
    __export2(request_exports, {
      default: () => request_default,
      parseMultipart: () => parseMultipart,
      parseUrlEncoded: () => parseUrlEncoded
    });
    module2.exports = __toCommonJS2(request_exports);
    let import_utils = require_utils();
    let UmiApiRequest3 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, import_utils.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        let _a, _b;
        return ((_b = (_a = this._req.url) == null ? void 0 : _a.split("?")[1]) == null ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        let _a;
        return (_a = this._req.headers.cookie) == null ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        let _a;
        return (_a = this._req.url) == null ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = [];
          this._req.on("data", (chunk) => {
            body.push(chunk);
          });
          this._req.on("end", () => {
            let _a, _b;
            const bodyBuffer = Buffer.concat(body);
            switch ((_a = this._req.headers["content-type"]) == null ? void 0 : _a.split(";")[0]) {
              case "application/json":
                try {
                  this._body = JSON.parse(bodyBuffer.toString());
                } catch (e) {
                  this._body = body;
                }
                break;
              case "multipart/form-data":
                const boundary = (_b = this.headers["content-type"]) == null ? void 0 : _b.split("boundary=")[1];
                if (!boundary) {
                  this._body = body;
                  break;
                }
                this._body = parseMultipart(bodyBuffer, boundary);
                break;
              case "application/x-www-form-urlencoded":
                this._body = parseUrlEncoded(bodyBuffer.toString());
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    function parseMultipart(body, boundary) {
      const hexBoundary = Buffer.from(`--${boundary}`, "utf-8").toString("hex");
      return body.toString("hex").split(hexBoundary).reduce((acc, cur) => {
        let _a, _b;
        const [hexMeta, hexValue] = cur.split(
          Buffer.from("\r\n\r\n").toString("hex")
        );
        const meta = Buffer.from(hexMeta, "hex").toString("utf-8");
        const name = (_a = meta.split('name="')[1]) == null ? void 0 : _a.split('"')[0];
        if (!name)
          return acc;
        const fileName = (_b = meta.split('filename="')[1]) == null ? void 0 : _b.split('"')[0];
        if (fileName) {
          const fileBufferBeforeTrim = Buffer.from(hexValue, "hex");
          const fileBuffer = fileBufferBeforeTrim.slice(
            0,
            fileBufferBeforeTrim.byteLength - 2
          );
          const contentType = meta.split("Content-Type: ")[1];
          acc[name] = {
            fileName,
            data: fileBuffer,
            contentType
          };
          return acc;
        }
        const valueBufferBeforeTrim = Buffer.from(hexValue, "hex");
        const valueBuffer = valueBufferBeforeTrim.slice(
          0,
          valueBufferBeforeTrim.byteLength - 2
        );
        acc[name] = valueBuffer.toString("utf-8");
        return acc;
      }, {});
    }
    function parseUrlEncoded(body) {
      return body.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    }
    var request_default = UmiApiRequest3;
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
let require_response = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports2, module2) {
    let __defProp2 = Object.defineProperty;
    let __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    let __getOwnPropNames2 = Object.getOwnPropertyNames;
    let __hasOwnProp2 = Object.prototype.hasOwnProperty;
    let __export2 = (target, all) => {
      for (let name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    let __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    let __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    let response_exports = {};
    __export2(response_exports, {
      default: () => response_default
    });
    module2.exports = __toCommonJS2(response_exports);
    let UmiApiResponse3 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      end(data) {
        this._res.end(data);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    var response_default = UmiApiResponse3;
  }
});

// node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
let require_apiRoute = __commonJS({
  "node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports2, module2) {
    let __create2 = Object.create;
    let __defProp2 = Object.defineProperty;
    let __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    let __getOwnPropNames2 = Object.getOwnPropertyNames;
    let __getProtoOf2 = Object.getPrototypeOf;
    let __hasOwnProp2 = Object.prototype.hasOwnProperty;
    let __export2 = (target, all) => {
      for (let name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    let __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    let __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    let __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    let apiRoute_exports = {};
    __export2(apiRoute_exports, {
      UmiApiRequest: () => import_request.default,
      UmiApiResponse: () => import_response.default,
      matchApiRoute: () => import_utils.matchApiRoute
    });
    module2.exports = __toCommonJS2(apiRoute_exports);
    var import_request = __toESM2(require_request());
    var import_response = __toESM2(require_response());
    var import_utils = require_utils();
  }
});

// src/.umi-production/api/types/user.ts
let user_exports = {};
__export(user_exports, {
  default: () => user_default2
});
module.exports = __toCommonJS(user_exports);

// src/.umi-production/api/_middlewares.ts
let middlewares_default = async (req, res, next) => {
  next();
};

// src/api/types/user.ts
let handler = {};
let user_default = handler;

// src/.umi-production/api/types/user.ts
let import_apiRoute = __toESM(require_apiRoute());
let apiRoutes = [{ "path": "posts/[postId]", "id": "posts/[postId]", "file": "posts/[postId].ts", "absPath": "/posts/[postId]", "__content": "" }, { "path": "posts", "id": "posts/index", "file": "posts/index.ts", "absPath": "/posts", "__content": "" }, { "path": "types/user", "id": "types/user", "file": "types/user.ts", "absPath": "/types/user", "__content": "const handler = {}; // \u6216\u8005\u5176\u4ED6\u5360\u4F4D\u903B\u8F91\nexport default handler;\n\nexport interface User {\n  id: number;\n  created_at: number;\n  nickname: string;\n  avater: string | null; // \u66F4\u660E\u786E\u7684\u7C7B\u578B\u5B9A\u4E49\n  uuid: string; // UUID \u5E94\u8BE5\u662F\u5B57\u7B26\u4E32\n  is_admin: number; // \u6216\u8005\u53EF\u4EE5\u7528 boolean\n  password: string;\n}\n\n// \u53EF\u4EE5\u6DFB\u52A0\u5176\u4ED6\u76F8\u5173\u7684\u7C7B\u578B\u5B9A\u4E49\nexport type UserWithoutPassword = Omit<User, 'password'>;\n\n// \u7528\u4E8E\u521B\u5EFA\u7528\u6237\u7684\u63A5\u53E3\nexport interface CreateUserDTO {\n  nickname: string;\n  password: string;\n}\n\n// \u7528\u4E8E\u767B\u5F55\u7684\u63A5\u53E3\nexport interface LoginDTO {\n  nickname: string;\n  password: string;\n}\n" }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": "import { User } from '@/api/types/user';\nimport supabase, {\n  fetchDataFromTable,\n  handleError,\n  responseHandler,\n} from '@/prisma/supabase';\nimport { UmiApiRequest, UmiApiResponse } from 'umi';\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  try {\n    const { nickname, password } = req.query;\n\n    console.log(nickname, password);\n\n    // \u9A8C\u8BC1\u5FC5\u8981\u5B57\u6BB5\n    if (!nickname && !password) {\n      return responseHandler(res, 4000, {}, '\u6635\u79F0\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A');\n    }\n\n    const tableName = 'user';\n    const existingUsers: User[] = await fetchDataFromTable(tableName);\n\n    // \u68C0\u67E5\u7528\u6237\u540D\u662F\u5426\u5DF2\u5B58\u5728\n    const isNicknameExist = existingUsers.some(\n      (user) => user.nickname === nickname,\n    );\n    if (isNicknameExist) {\n      return responseHandler(res, 4001, {}, '\u7528\u6237\u540D\u5DF2\u5B58\u5728');\n    }\n\n    // \u521B\u5EFA\u65B0\u7528\u6237\n    const newUser = {\n      nickname,\n      password,\n      created_at: Date.now(),\n      is_admin: 0,\n      avater: null,\n      uuid: crypto.randomUUID(), // \u751F\u6210\u552F\u4E00UUID\n    };\n\n    // \u63D2\u5165\u6570\u636E\u5230 Supabase\n    const { data, error } = await supabase.from(tableName).insert([newUser]);\n\n    if (error) {\n      return responseHandler(res, 5000, {}, '\u6CE8\u518C\u5931\u8D25');\n    }\n\n    // \u8FD4\u56DE\u6210\u529F\u54CD\u5E94\uFF0C\u79FB\u9664\u5BC6\u7801\u5B57\u6BB5\n    return responseHandler(res, 2000, data, '\u6CE8\u518C\u6210\u529F');\n  } catch (err) {\n    return handleError(err, res);\n  }\n}\n" }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": "import { User } from '@/api/types/user';\nimport {\n  fetchDataFromTable,\n  handleError,\n  responseHandler,\n} from '@/prisma/supabase';\nimport { UmiApiRequest, UmiApiResponse } from 'umi';\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  try {\n    // console.log('req.query:', req.query.nickname);\n    const tableName = 'user';\n    const data: User[] = await fetchDataFromTable(tableName);\n\n    // \u5224\u65AD\u662F\u5426\u4F20\u5165\u4E86 nickname \u548C password \u4F5C\u4E3A\u67E5\u8BE2\u6761\u4EF6\n    if (req.query.nickname && req.query.password) {\n      // \u6839\u636E nickname \u548C password \u8FDB\u884C\u7B5B\u9009\n      const filteredData = data.filter((item: any) => {\n        return (\n          item.nickname === req.query.nickname &&\n          item.password === req.query.password\n        );\n      });\n\n      // \u5982\u679C\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u7528\u6237\n      if (filteredData.length === 0) {\n        return responseHandler(res, 4000, {}, 'token is invalid');\n      }\n\n      // \u5220\u9664 password \u5C5E\u6027\u540E\u8FD4\u56DE\u7ED3\u679C\n      const user = filteredData[0];\n      const { password, ...rest } = user; // \u79FB\u9664 password \u5C5E\u6027\n      console.log(password);\n\n      return responseHandler(res, 2000, rest, 'success');\n    } else {\n      return responseHandler(res, 4000);\n    }\n  } catch (err) {\n    // \u8C03\u7528\u5C01\u88C5\u7684\u9519\u8BEF\u5904\u7406\u51FD\u6570\n    return handleError(err, res);\n  }\n}\n" }];
var user_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await user_default(umiReq, umiRes);
};
