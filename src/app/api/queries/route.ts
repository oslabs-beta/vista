import { db } from "@/utils/database"

type queryData = {
    queryName: string,
    queryText: string,
    endpoint: string,
}

export async function POST(request: Request) {
    try{
        const body: queryData = await request.json();
        const { queryName, queryText, endpoint } = body;

        const addQueryString: string = 'INSERT INTO queries (query_name, query_text, endpoint, user_id) VALUES ($1, $2, $3, $4)'
        const response: any = await db.query(addQueryString, [queryName, queryText, endpoint, 1]);

        console.log('response from adding query to queries table => ', response);
        return new Response(response.json());

    } catch(err: any) { // TODO: Type
        console.log(err);

        return new Response(err.message)
    }

}