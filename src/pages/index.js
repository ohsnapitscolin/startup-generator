import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Generator from "../components/generator"

import "../styles/index.css";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.colors = props.data.allColorsJson.edges[0].node.colors;
    this.items = props.data.allItemsJson.edges[0].node.items;
    this.things = props.data.allThingsJson.edges[0].node.things;
  }

  render() {
    return (
      <>
        <SEO title="Home" />
        <Generator
          colors={this.colors}
          items={this.items}
          things={this.things}
        />
      </>
    );
  }
}

export const pageQuery = graphql`
  query DataQuery {
    allColorsJson {
      edges {
        node {
          colors
        }
      }
    }
    allItemsJson {
      edges {
        node {
          items
        }
      }
    }
    allThingsJson {
      edges {
        node {
          things
        }
      }
    }
  }
`;
