import { Client as OktaClient } from "@okta/okta-sdk-nodejs";
import { OktaAuth } from "@okta/okta-auth-js";
import {
  ILoginData,
  IRegisterData,
  IRegistrationResponse,
  ISession,
} from "../interfaces/IUser";
import config from "../config";
import { Unauthorized } from "http-errors";
import { NextFunction } from "express";

const oktaClient = new OktaClient({
  orgUrl: config.oktaConfig.domain,
  token: config.oktaConfig.apiToken,
});

const oktaAuthClient = new OktaAuth({
  issuer: `${config.oktaConfig.issuer}`,
});

export default {
  register: async (
    registerData: IRegisterData
  ): Promise<IRegistrationResponse> => {
    const { email, firstName, lastName, password } = registerData;
    const createdUser = await oktaClient.createUser({
      profile: { email, login: email, firstName, lastName },
      credentials: { password: { value: password } },
    });
    return createdUser;
  },

  sessionLogin: async (loginData: ILoginData): Promise<ISession> => {
    const { email: username, password } = loginData;
    const { sessionToken } = await oktaAuthClient.signIn({
      username,
      password,
    });

    const session = await oktaClient.createSession({ sessionToken });
    const { login, id, userId } = session;

    return { sessionId: id, userEmail: login, userId };
  },

  getSessionBySessionId: async (sessionId: string, next: NextFunction) => {
    try {
      const session = await oktaClient.getSession(sessionId);
      const { login, id, userId } = session;

      return { sessionId: id, userEmail: login, userId };
    } catch (e) {
      next(
        new Unauthorized("Please login with the okta user, else register user")
      );
    }
  },

  getUserById: async (id: string) => {
    const {
      profile: { firstName, lastName, email },
    } = await oktaClient.getUser(id);
    return { id, firstName, lastName, email };
  },
};
