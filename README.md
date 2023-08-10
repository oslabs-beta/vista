# Vista

Vista is a visual tool that allows you to view the results of querying a GraphQL API which renders on the screen as a graph. By visualizing the graph, you are able to see the structure of your schemas, similar to the documentation explorer in GraphiQL, but in a much more dynamic, descriptive, and interactive way. With Vista, you can traverse the graph, click on the data you are looking to query, and receive a perfectly structured GraphQL query ready to go! All you need to do upon receiving this query is decide if you want to copy it or save it to your profile for future use.

## Features
* Visible Schema Connectivity: Render a visualization of your schema in an interactive, node-based graph from an API endpoint that allows you to easily comprehend the schema structure.

![gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNyeXNsbmR2Yzg1bWlrM2ZoeXhtYXI5M2lyNDQ1ZnBpaGt6bGp0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3VAPlRRsgrIQUpgpU6/giphy.gif)

  
* Interactive Nodes: Dynamically build queries to access the data you need utilizing simple point & click functionality of the GraphQL fields.
* Query Testing: After building a query, you can test if the expected data is returned by the server and if it fits your needs.
* Ready To Use: Option to copy generated queries based on your interaction with the data.
* Save for Later: Save desired queries for future reference.
<img width="477" alt="Screen Shot 2023-08-09 at 6 09 02 PM" src="https://github.com/oslabs-beta/vista/assets/32287834/73151e8f-4b26-4a18-98c2-d72bd0e4e504">
  

## How to use Vista
 * Enter the GraphQL API endpoint that you intend to query into the search bar. Vista leverages the GraphQL introspection system and renders the queryable fields and types from the provided endpoint.
  [screenshot/gif of the main page before rendering]
 * Explore the graph of the schema to quickly gain a thorough understanding of the schema structure and the interconnectedness of the data rendered.
 * Build your query by clicking on the nodes (and entering arguments when required) that represent the data you want to query. (Keep in mind that not every node will appear as part of your query; this all depends on the structure of your original endpoint.)
 * After building a query, you can test if the expected data is returned by the server.
 * Copy and/or save the generated GraphQL query that is created for you in the *Query Generator*.
   [gif of screen with indicated fields once everything is rendered]

### Contributors

[Charlie Charboneau](https://github.com/CharlieCharboneau)  

[Nestor Cayanan](https://github.com/nestorcayananjr)  

[Lucas Contreras](https://github.com/lucascontreras)  

[Matt Mattox](https://github.com/heyitsmattox)  

[Stephanie Serrano](http://github.com/stephanie-115)  



