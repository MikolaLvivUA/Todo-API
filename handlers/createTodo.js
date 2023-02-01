const AWS = require("aws-sdk");
const uuid = require("uuid");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = async (event) => {
    try {
        const timestamp = new Date().toISOString();
        const eventData = JSON.parse(event.body);

        console.log("EVENT:::", event);

        if (typeof eventData.todo !== "string") {
            console.error("Validation failed todo must be a string");
        }

        if (typeof eventData.checked !== "boolean") {
            console.error("Validation failed checked must be a string");
        }

        const params = {
            TableName: TODO_TABLE,
            Item: {
                id: uuid.v4(),
                todo: eventData.todo,
                checked: eventData.checked,
                createdAt: timestamp,
                updatedAt: timestamp
            }
        }

        const createdTodo = await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(createdTodo)
        }
    } catch (error) {
        console.error(error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }

}
