import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://balenciaga.afnabdillah100.site/",
  cache: new InMemoryCache(),
});

export default client;
