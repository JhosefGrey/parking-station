export class Auth {
    constructor(
        public email: string = '',
        public clave: string = ''
    ) { }
}

export interface IToken {
    token: string
}