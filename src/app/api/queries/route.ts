import { create } from '@mui/material/styles/createTransitions'
import { db } from '../../../utils/database'

type queryData = {
  queryName: string
  queryText: string
  endpoint: string
  userEmail: string
}
export async function POST(request: Request) {
  const body: queryData = await request.json()

  const { queryName, queryText, endpoint, userEmail } = body
  const findUserStr: string = `
        SELECT *
        FROM users
        WHERE username=$1;
        `
  const createUserStr: string = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
        `
  const addQueryString: string = `
        INSERT INTO queries (query_name, query_text, endpoint, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
  try {
    if (!userEmail || !queryName || !queryText || !endpoint) {
      throw new Error('Invalid request body')
    }
    let userResponse = await db.query(findUserStr, [userEmail])
    // console.log("userResponse after db.query:", userResponse);

    if (!userResponse || !userResponse.rows || userResponse.rows.length === 0) {
      userResponse = await db.query(createUserStr, [userEmail, 'XXXX'])
    }
    const userId = userResponse.rows[0]._id

    const addQueryResponse = await db.query(addQueryString, [
      queryName,
      queryText,
      endpoint,
      userId,
    ])

    if (
      !addQueryResponse ||
      !addQueryResponse.rows ||
      addQueryResponse.rows.length === 0
    ) {
      throw new Error('Failed to add query')
    }

    const responseData = { userId, queryId: addQueryResponse.rows[0].queryId }
    return new Response(JSON.stringify(responseData))
  } catch (err: any) {
    // TODO: Type
    console.error('Error in POST function:', err)
    console.log(err)
    return new Response(err.message, { status: 500 })
  }
}
