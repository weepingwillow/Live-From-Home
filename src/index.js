import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data/data.json';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value,
        });
    }

    render() {
        return (
            <section className="search-container">
                <form>
                    <input
                        placeholder="Search for a song ..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        autoFocus
                    />
                </form>
                <div className="search-query">{this.state.query}</div>
            </section>
        );   
    }
}

class Results extends React.Component {
    buildVideoURL(id, timestamp) {
        let minutes = timestamp.slice(0, timestamp.indexOf(":"));
        let seconds = timestamp.slice(timestamp.indexOf(":") + 1, timestamp.length);
        let timeInSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
        return 'https://www.youtube.com/watch?v=' + id + '&t=' + timeInSeconds + 's';
    }

    render() {
        let videoURL;
        const results = data.videos.map((videos, key) =>
                videos.songs.map((songs, i) => {
                    videoURL = this.buildVideoURL(videos.id, songs.timestamp);
                    return (
                        <li key={songs.title}>
                            <a href={videoURL} target='_blank'>
                                <span className="video">
                                    {videos.title}
                                </span>
                                <span className="artist">
                                    {videos.artist}
                                </span>      
                                <span className="song">
                                    {songs.title}
                                </span>
                                <span className="timestamp">
                                    ({songs.timestamp})
                                </span>
                            </a>
                        </li>
                    )
                })
        );        
        return (
            <div className="results-container">
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        const title = "Live From Home";
        return (
            <section id="container">
                <nav>
                    <h1>{ title }</h1>
                </nav>
                <Search />
                <Results />
            </section>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );