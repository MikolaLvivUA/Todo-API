const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getTodo = async (event) => {
    try {
        console.log("EVENT:::", event)

        const { id } = event.pathParameters

        const params = {
            TableName: TODO_TABLE,
            Key: {
                id
            }
        }

        const todo = await dynamoDB.get(params).promise();

        if (!todo.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Todo not found"})
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(todo.Item)
        }
    } catch (error) {
        console.error(error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }

}
