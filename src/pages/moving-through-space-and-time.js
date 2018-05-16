import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/fp/get';
import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PostList from '../components/PostList';
import StyledMain from '../components/StyledMain';
import Whoa from '../components/whoa';
import PostHeading from '../components/PostHeading';
import PostBody from '../components/PostBody';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import WithEventListeners from '../components/WithEventListeners';
import commands from '../constants/commands';

import astronaut from '../images/astronaut-pushing.svg';

const Main = styled.main`
  margin: 0 auto;
  max-width: 50rem;
`;

class BlogIndex extends React.Component {
  componentDidMount() {
    /* ⚠️ not working. Just fucking think about it for a second and figure it out! 🤯 */
    // setTimeout(() => document.body.animate({ scrollTop: document.body.scrollHeight }, 200), 1000)
    // setTimeout(() => window.scrollTo({top: document.body.scrollHeight}), 1000);
    /* **************☝️**************    */
  }

  render() {
    /* ⚠️ not working */
    // window.scrollTo({top: document.body.scrollHeight});
    // document.body.animate({ scrollTop: document.body.scrollHeight }, 200)
    /* **************☝️**************    */

    const posts = pipe(
      get('props.data.allWhoa.edges'),
      map(({ node }) => node)
    )(this);

    console.log(`posts`, posts);

    return (
      <div>
        <Helmet title={'David Baker is Scribbling'} />
        {/* <Bio /> */}
        <Main>
          <p>I probably wouldn't read any of this if I were you.</p>
          {/* {posts && <PostList posts={posts} />} */}
          {posts.map(post => (
            <StyledMain
              key={post.path}
              style={{
                left: this.props.sideBarVisible ? '300px' : 0,
                width: this.props.sideBarVisible
                  ? 'calc(100% - 300px)'
                  : '100%',
              }}
            >
              {/* {this.props.normatives.length > 0 && (
                <Header
                  sideBarVisible={this.props.sideBarVisible}
                  toggleSideBar={this.props.toggleSideBar}
                />
              )} */}
              <div
                className="full-width-grid"
                style={{
                  // maxWidth: '50rem',
                  margin: '0 auto',
                }}
              >
                {post &&
                  !post.frontmatter.bareNaked && (
                    <PostHeading date={post.frontmatter.date}>
                      {() => post.frontmatter.title}
                    </PostHeading>
                  )}
                <PostBody normatives={this.props.normatives}>
                  <Whoa>{() => JSON.parse(post.ast).children}</Whoa>
                </PostBody>
              </div>
            </StyledMain>
          ))}
        </Main>
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query AllWhoaQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWhoa(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          fileAbsolutePath
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            bareNaked
          }
          ast
          id
          wordCount {
            words
          }
        }
      }
    }
  }
`;
