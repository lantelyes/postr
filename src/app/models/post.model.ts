import { Profile } from '../models/profile.model';
export class Post {
    author: Profile
    id: string
    body: string
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
}