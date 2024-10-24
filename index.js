import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "usuarios_tabla";

export const handler = async (event) => {

  const id = event.id;
  const telefono = event.telefono;
  const nombre = event.nombre;
  const email = event.email;


  // Validaciones
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify("Error: El id es requerido"),
    };
  }

  if (!nombre) {
    return {
      statusCode: 400,
      body: JSON.stringify("Error: El nombre es requerido"),
    };
  }

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify("Error: El email es requerido"),
    };
  }

  await dynamo.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        id: id,
        telefono: telefono,
        nombre: nombre,
        email: email,
      },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify("Usuario actualizado exitosamente"),
  };

};
