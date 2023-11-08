// 07 oct 00:52

// React imports
import React from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.css';

// CSS imports
import './App.css';

// Markdown imports
import { marked } from 'marked'


const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

class myApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultMarkdown,
    };
    this.updatePreview = this.updatePreview.bind(this);
  }
  
  componentWillMount() {
    marked.setOptions(
      {
      breaks: true
      }
    )
  }

  componentDidMount() {
    this.updatePreview();
  }

  updatePreview() {
    const updatedInput = document.getElementById('editor').value;
  
    this.setState({ input: updatedInput }, () => {
      document.getElementById('preview').innerHTML = marked.parse(updatedInput);
    });
  }
  

  render() {
    return (
      <div id={"app-container"} className={"my-flex bg-light"}>
        <h1 id={"title"} className={"text-center text-primary"}>Markdown Previewer</h1>
        <textarea id={"editor"} onChange={this.updatePreview} defaultValue={defaultMarkdown}></textarea>
        <div id={"preview"} className={"border border-5 border-success"}></div>
      </div>
    );
  }
}

export default myApp;

// Finished  07 oct 02:48