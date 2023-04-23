import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: { [key: string]: any } | null;
  }
}

export {};
