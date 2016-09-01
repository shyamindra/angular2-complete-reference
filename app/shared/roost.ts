import {User} from './user.ts';
import {Tag} from './tag.ts';

export class Roost{
    id : number;
    shouts: number;
    listeners: number;
    comments: number;
    user: User;
    tags:  Tag[];
    isShout: boolean;
    isListened: boolean;
    created_at: string;
    updated_at: string;
    title: string;
    text: string;
    location: string;
    lat: number;
    lng: number;
    video: string;
    audio: string;
    image: string;
    media_type: string;
    type: string;
    real_type: number;
    roost_media: any;
}