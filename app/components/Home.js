// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import routes from '../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
      .get("https://reddit.com/r/aww.json")
      .then(res => {
        this.setState({ posts: res.data.data.children });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.posts.map(post =>
            <Link
              to={{
                pathname: "/post",
                state: { post }
              }}
              key={post.data.id}

            >
              <ListGroupItem
                key={post.data.id}
                style={itemStyle}
              >
                <img style={thumbnailStyle} src={post.data.thumbnail} alt="thumbnail" />
                {post.data.title}
              </ListGroupItem>
            </Link>

          )}
        </ListGroup>
      </div>
    );
  }
}

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}

const thumbnailStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '30px',
  marginRight: '16px'
}
