export interface IResponseLayout<D> {
    success: boolean;
    message: string;
    data: D
}

export interface Entity {
    id: number
}

export interface Service extends Entity {
    "createdAt": "2024-11-18T10:44:36.978Z",
    "description": "string",
    "poster": "string",
    "name": "string",
    "slug": "string",
    "price": 0,
    "pointReward": 0
}

export interface RewardPoint {
    "point": number,
    "pointsUsed": number,
    "lastUpdatedAt": string
}
export enum Gender{
    MALE,
    FEMALE
}
export interface User extends Entity {
    "createdAt": string,
    "username": string,
    "fullName": string,
    "gender": Gender,
    "phoneNumber": string,
    "address": string,
    "email":string,
    "activeTwoFactorAuthentication": boolean
    "rewardPoint":RewardPoint,
    "role":string
}
