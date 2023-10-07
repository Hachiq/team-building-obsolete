import { Status } from "./status";
import { Team } from "./team";
import { User } from "./user";

export class Request {
    id: number = 0;
    userId: number = 0;
    teamId: number = 0;
    statusId: number = 0;
    requestDate?: Date;
    user?: User;
    team?: Team;
    status?: Status;
}