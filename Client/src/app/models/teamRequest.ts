export class TeamRequest {
    team?: string | null;
    user?: string | null;

    constructor(teamName?: string, username?: string){
        this.team = teamName;
        this.user = username;
    }
}