import React, { Component } from 'react';
import Link from '../Components/LowerCaseUrlLink';
import dateFormat from 'dateformat';
import RichTextElement from '../Components/RichTextElement';


let getState = () => {
  return {
  };
};

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    let formatDate = (value) => {
      return dateFormat(value, 'mmmm d');
    };

    let counter = 0;



    return (
     <div>
       <h1>Test Page</h1>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut ultricies velit. Duis suscipit, erat quis aliquam commodo, libero nisl volutpat lorem, id vehicula risus quam eget eros. Nullam non nunc venenatis, lobortis velit nec, venenatis ante. Ut pulvinar eros dui, eu semper sapien placerat sed. Morbi pulvinar, purus vel facilisis maximus, metus dui pulvinar dui, id convallis purus tortor a dolor. Nam gravida varius arcu. Sed sed aliquam urna, ut fermentum erat.</p>
       <p>Nam consectetur felis mauris, congue fringilla lacus tincidunt commodo. Etiam non pharetra elit, id euismod erat. Nullam nec laoreet dui. Donec augue diam, sagittis ac eros nec, convallis varius elit. Praesent mattis, sapien condimentum commodo euismod, quam mi rutrum velit, quis convallis orci felis eu risus. Maecenas at purus ac tellus dictum porttitor eu nec quam. Suspendisse ex neque, interdum quis neque non, gravida consequat diam.</p>
       <p>Curabitur id mattis nisi. Duis iaculis velit id tempor mollis. Aenean lobortis accumsan risus, in pretium erat congue a. Pellentesque in venenatis tellus, consequat interdum odio. Ut ut magna faucibus, congue sem ut, consectetur enim. Donec eget justo ex. Suspendisse porta, ipsum ut malesuada auctor, neque ligula tincidunt leo, sed tincidunt sem elit eget enim. Cras molestie, est at convallis lobortis, enim neque tristique ligula, sit amet sagittis lacus elit non ante. Pellentesque mattis, ex vel vehicula consectetur, magna dui ultrices nisl, vel mattis leo dui et mi. Nulla condimentum vulputate dui.</p>
     </div>
    );
  }
}

export default Test;