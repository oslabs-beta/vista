import { db } from "@/utils/database"
import { create } from "@mui/material/styles/createTransitions";
type queryData = {
    queryName: string,
    queryText: string,
    endpoint: string,
    userEmail: string
}
export async function POST(request: Request) {
    const body: queryData = await request.json();
    const { queryName, queryText, endpoint, userEmail } = body;
    const findUserStr: string = `
        SELECT *
        FROM users
        WHERE username=$1;
        `;
        const createUserStr: string = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
        `;
    const addQueryString: string = `
        INSERT INTO queries (query_name, query_text, endpoint, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
    try{
        let userResponse = await db.query(findUserStr, [userEmail]);
        if(!userResponse.rows[0]) userResponse = await db.query(createUserStr, [userEmail, 'XXXX']);
        const userId = userResponse.rows[0]._id;
        console.log('THIS SHOULD BE THE USERID => ', userId);
        const response: any = await db.query(addQueryString, [queryName, queryText, endpoint, userId]);
        console.log('response from adding query to queries table => ', response);
        return new Response(response.json());
    } catch(err: any) { // TODO: Type
        console.log(err);
        return new Response(err.message)
    }
}