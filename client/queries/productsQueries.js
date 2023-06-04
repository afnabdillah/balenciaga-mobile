import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    findAllProducts {
      id
      name
      specifications
      price
      mainImg
    }
  }
`;

export const GET_PRODUCT_DETAILS_BY_ID = gql`
  query GetProductDetailsById($id: Int!) {
    findProductById(id: $id) {
      id
      name
      description
      material
      specifications
      price
      mainImg
      category {
        id
        name
      }
      images {
        id
        productId
        imgUrl
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($categoryName: String) {
  filterProductsByCategory(categoryName: $categoryName) {
    id
    name
    specifications
    price
    mainImg
  }
}
`

export const SEARCH_PRODUCTS = gql`
query GetProductsByCategory($search: String) {
  searchProducts(search: $search) {
    id
    name
    price
    mainImg
    category {
      name
      id
    }
  }
}
`
