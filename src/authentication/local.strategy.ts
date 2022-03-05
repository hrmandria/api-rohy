import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService){
        super()
        //const current_user = CryptoJS.AES.decrypt(cryptedText,"41lpn25"); // ilay qr code rehefa scanné dia mamoaka chaine cryptée dia mila decrypter-na iny dia avy eo mamoaka objet, iny objet iny avy eo no véifier-na ny username sy password any
        /* current_user = {
            "userId":1,
            "username":"Axel",
            "password":"hrjkhdb45"
        } 
        */
    }

    async validate(username: string, password: string): Promise <any> {
        
        const user = await this.authenticationService.validateUser(username, password);

        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}