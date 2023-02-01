const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = async (event) => {
    try {
        const { id } = event.pathParameters
        const eventData = JSON.parse(event.body);
        const timestamp = new Date().toISOString();

        if (typeof eventData.todo !== "string") {
            console.error("Validation failed todo must be a string");
        }

        if (typeof eventData.checked !== "boolean") {
            console.error("Validation failed checked must be a string");
        }

        const params = {
            TableName: TODO_TABLE,
            Key: {
                id
            },
            ExpressionAttributeNames: {
                "#todo_text": "todo"
            },
            ExpressionAttributeValues: {
                ":todo": eventData.todo,
                ":checked": eventData.checked,
                ":updatedAt": timestamp
            },
            UpdateExpression: "SET #todo_text = :todo, checked = :checked, updatedAt = :updatedAt",
            ReturnValuesL: "ALL_NEW"
        }

        const updatedTodo = await dynamoDB.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo)
        }
    } catch (error) {
        console.error(error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}
