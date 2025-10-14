//Variable de entorno
//SECRET_JWT_KEY en produccion se injecta com a variable d'entorn
//Tindrà la protecció del servidor.


export const{
    PORT=3000,
    SALT_ROUNDS=10,
    SECRET_JWT_KEY="aico-es-una-super-paraula-secreta"
}=process.env