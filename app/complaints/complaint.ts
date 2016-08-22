import {User} from '../shared/user';
import {Tag} from '../shared/tag';

export class Complaint{
    id: number;
    shouts: string;
    listeners: string;
    comments: string;
    user: User;
    tags: Tag[];
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
    real_type: string;
}