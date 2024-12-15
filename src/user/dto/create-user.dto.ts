import {IsIn, IsInt, IsNotEmpty, IsString, Matches, Max, Min, MinLength} from "class-validator";

export class CreateUserDto {

    @IsString({message: 'Ponga su nombre.'})
    @IsNotEmpty({message: 'El campo nombre no debe estar vacío.'})
    name: string

    @IsString({message: 'Ponga su apellido.'})
    @IsNotEmpty({message: 'El campo apellido no debe estar vacío.'})
    lastname: string

    @IsInt()
    @Min(18, {message: 'La edad debe ser menor a 18.'})
    @Max(100, {message: 'La edad no puede ser mayor a 100.'})
    @IsNotEmpty({message: 'El campo año no debe estar vacío.'})
    age: number

    @IsString()
    @IsNotEmpty({message: "El número de teléfono es obligatorio."})
    @Matches(/^[0-9]{9}$/, {message: "El número de teléfono debe tener 9 dígitos."})
    phone: string

    @IsString({message: 'Ponga su email.'})
    @IsNotEmpty({message: 'El campo email no debe estar vacío.'})
    email: string

    @IsNotEmpty({message: 'El campo de contraseña no debe estar vacío.'})
    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres.'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {message: 'La contraseña debe incluir letras y números.'})
    password: string

    @IsString({message: 'El campo rol debe ser una cadena de texto.'})
    @IsIn(['admin', 'user', 'employee'], {
        message: 'El rol debe ser uno de los siguientes valores: admin, user o employee.'
    })
    @IsNotEmpty({message: 'El campo rol no debe estar vacío.'})
    role?: 'admin' | 'user' | 'employee'; // Solo acepta estos valores*/


}
