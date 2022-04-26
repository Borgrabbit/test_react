import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header><h1><a onClick={(event) => {
    event.preventDefault();
    props.onChangeMode();
  }} href="/">{props.title}</a></h1></header>
}
const Nav = ({topics, onChangeMode}) => {
  return (
    <nav>
      <ol>
        {topics.map(el => (
          <li key={el.id}>
          <a id={el.id} href={`/read/${el.id}`} title={el.title} onClick={evt => {
            evt.preventDefault();
            onChangeMode( Number(evt.target.id) );
          }}>
            {el.body}
          </a>
        </li>
        ))}
      </ol>
    </nav>
    )
}

// function Nav(props) {
//   const lst = [];
//   props.topics.map((el) => {
//     lst.push(
//     <li id={el.id} key={el.id}>
//       <a href={`/read/${el.id}`} title={el.title} onClick={evt => {
//         evt.preventDefault();
//         props.onChangeMode(evt.target.id);
//       }}>
//         {el.body}
//       </a>
//     </li>)
//   });
//   return  <nav><ol>{lst}</ol></nav>
// }

function Article(props) {
  return  <article><h2>{props.title}</h2>{props.body}</article>
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={evt => {
      evt.preventDefault();
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
  <h2>Update</h2>
  <form onSubmit={evt => {
    evt.preventDefault();
    const title = evt.target.title.value;
    const body = evt.target.body.value;
    props.onUpdate(title,body);
  }}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={evt=>{
      setTitle(evt.target.value);
    }} /></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={evt=>{
      setBody(evt.target.value)
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
  </form>
</article>
}

function App() {
  const [mode, setState] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    {id:1, title:"html", body:"html is ..."},
    {id:2, title:"css", body:"css is ..."},
    {id:3, title:"js", body:"js is ..."},
  ])

  let content = null;
  let contextControl = null;
  
  if(mode==='WELCOME') {
    content = <Article title="Welcome" body="hello, web"></Article>
  } else if (mode ==='READ') {
    let title, body = null;
    topics.map(item => {
      if(item.id === id){
        title = item.title;
        body = item.body;
      }
    });

    content = <Article title={title} body={body}></Article>
    contextControl = <>
                      <li>
                        <a href={`/update/${id}`} onClick={evt=>{
                          evt.preventDefault();
                          setState('UPDATE');
                        }}>Update</a>
                      </li>
                      <li><input type="button" value="Delete" onClick={()=>{
                        const newTopics = topics.filter(item => item.id !== id)
                          console.log(newTopics)
                        setTopics(newTopics);
                      }}></input></li>
                      </>
  } else if (mode ==='CREATE') {
      let _title, _body = null;
      content = <Create onCreate={(_title, _body => {
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics)
      setState('READ');
      setId(nextId);
      setNextId(nextId+1);
    })}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    topics.map(item => {
      if(item.id === id){
        title = item.title;
        body = item.body;
      }
    });
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      const updatedTopic = {id:id , title:title, body:body};
      const newTopics = [...topics];
      newTopics.map( (item, idx) => {
        if(item.id === updatedTopic.id){
          newTopics[idx] =updatedTopic;
        }
      })
      setTopics(newTopics);
      setState('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={() => {
        setState('WELCOME');
      }}></Header>
      <Header></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setState('READ');
        setId(_id)
      }}></Nav>
      {content}
    <ul>
      <li>
        <a href="/create" onClick={evt=>{
          evt.preventDefault();
          setState('CREATE');
        }}>Create</a>
      </li>
      {contextControl}
    </ul>
    </div>
  );
}

export default App;