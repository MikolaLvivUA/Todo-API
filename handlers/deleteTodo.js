const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = async (event) => {
    try {
        console.log("EVENT:::", event)

        const { id } = event.pathParameters

        const params = {
            TableName: TODO_TABLE,
            Key: {
                id
            }
        }

        await dynamoDB.delete(params).promise()

        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}
