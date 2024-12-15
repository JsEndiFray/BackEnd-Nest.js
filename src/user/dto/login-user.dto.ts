import {IsEmail, IsNotEmpty} from "class-validator";


export class LoginUserDto {

    @IsEmail({}, {message: 'Por favor ingrese su correo electrónico válido.'})
    @IsNotEmpty({message: 'El campo email no debe estas vacío.'})
    email: string

    @IsNotEmpty({message: 'El campo contraseña no puede estar vacío.'})
    password: string
}
