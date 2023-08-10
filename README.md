# Vista

Vista is a visual tool that allows you to view the results of querying a GraphQL API which renders on the screen as a graph. By visualizing the graph, you are able to see the structure of your schemas, similar to the documentation explorer in GraphiQL, but in a much more dynamic, descriptive, and interactive way. With Vista, you can traverse the graph, click on the data you are looking to query, and receive a perfectly structured GraphQL query ready to go! All you need to do upon receiving this query is decide if you want to copy it or save it to your profile for future use.

## Features
* Visible Schema Connectivity: Render a visualization of your schema in an interactive, node-based graph from an API endpoint that allows you to easily comprehend the schema structure.
<img width="1075" alt="Screen Shot 2023-08-09 at 6 06 50 PM" src="https://github.com/oslabs-beta/vista/assets/90209258/e0971f3b-8065-4bb0-b5cc-1337b89d42f4">

  
* Interactive Nodes: Dynamically build queries to access the data you need utilizing simple point & click functionality of the GraphQL fields.
* Query Testing: After building a query, you can test if the expected data is returned by the server and if it fits your needs.
* Ready To Use: Option to copy generated queries based on your interaction with the data.
* Save for Later: Save desired queries for future reference.
<img width="477" alt="Screen Shot 2023-08-09 at 6 09 02 PM" src="https://github.com/oslabs-beta/vista/assets/90209258/1bdf5776-af5f-403d-8b5a-09b6e0405d40">


## How to use Vista
 * Enter the GraphQL API endpoint that you intend to query into the search bar. Vista leverages the GraphQL introspection system and renders the queryable fields and types from the provided endpoint.
  [screenshot/gif of the main page before rendering]
 * Explore the graph of the schema to quickly gain a thorough understanding of the schema structure and the interconnectedness of the data rendered.
 * Build your query by clicking on the nodes (and entering arguments when required) that represent the data you want to query. (Keep in mind that not every node will appear as part of your query; this all depends on the structure of your original endpoint.)
 * After building a query, you can test if the expected data is returned by the server.
 * Copy and/or save the generated GraphQL query that is created for you in the *Query Generator*.
   [gif of screen with indicated fields once everything is rendered]


