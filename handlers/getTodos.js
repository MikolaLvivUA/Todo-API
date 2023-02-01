const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getTodos = async (event) => {
    try {
        const params = {
            TableName: TODO_TABLE
        }

        const todoList = await dynamoDB.scan(params).promise();

        console.log("RESPONSE:::", todoList)

        return {
            statusCode: 200,
            body: JSON.stringify(todoList.Items)
        }
    } catch (error) {
        console.error(error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}
