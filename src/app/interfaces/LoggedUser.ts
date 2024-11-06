// Tipeado de datos de DummyJSON
export interface LoggedUser {
    id: number,
    username: string,
    email: string,
    firstName: string;
    lastName: string;
    gender: 'male' | 'female'; // Restricción de valores
    accessToken: string;
}