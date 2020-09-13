import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class TopPostsRow extends Component {
   render() {
      return (
      <div className="div_post_row_wrap">
        <p className="p_title mb-0">{this.props.obj.title} ,{this.props.obj.created_at} ,
            <span>ID :{this.props.obj.id}</span>
        </p>         
         <hr className="hr_ex1 mt-1 mb-1" />
      </div>
      )
   }
}

export default TopPostsRow;

