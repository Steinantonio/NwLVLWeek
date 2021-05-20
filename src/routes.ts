import { request, response, Router } from "express";
import { MessagesController } from "./controller/MessagesController";
import {SettingsController} from "./controller/SettingsController"
import { UserController } from "./controller/UserController";
 
const routes = Router();

const settingsController = new SettingsController()
routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.updateSettings);

const usersController = new UserController();
routes.post("/user", usersController.create)

const messagesController = new MessagesController();
routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.listByUser)

export { routes };