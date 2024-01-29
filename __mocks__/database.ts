const mockQuery = jest.fn()

mockQuery.mockResolvedValueOnce({
  rows: [{ _id: 'user1' }],
  command: 'SELECT',
  rowCount: 1,
})
mockQuery.mockResolvedValueOnce({
  rows: [{ queryId: 'query1' }],
  command: 'INSERT',
  rowCount: 1,
})

export { mockQuery }
