
export class UsuarioC {

    constructor(
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public email: string,
        public password?: string,
        public img?: string,
        public rol?: string,
        public google?: boolean,
        public uid?: string,
    ) {

    }
}