import { Request, Response, NextFunction } from "express";

const adminCodeMiddleware = ( req: Request, res: Response, next: NextFunction) => {
  const adminCode = req.headers["x-admin-code"];

  if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
    return res.status(401).json({
      message: "Invalid admin code",
    });
  }

  next();
};

export default adminCodeMiddleware;