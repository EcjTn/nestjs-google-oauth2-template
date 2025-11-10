//Purpose of putting it in common
//is because some modules may need to use it soon
export interface IJwtPayload {
    sub: number
    googleId: string
}