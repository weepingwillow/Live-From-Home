import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data/data.json';

function Search(props) {
    return (
        <section className="search-container">
            <form>
                <input
                    placeholder="Search for an artist, video, or song ..."
                    onChange={(e)=> props.onChange(e.target.value)}
                    autoFocus
                />
            </form>
        </section>
    );
}

function SearchResults(props) {
    return (
        <div className="results-container">
            {props.count > 0 &&
            <div className="results-count">Displaying {props.count} Results</div>
            }
            <ul>
                {props.value}
            </ul>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super();

        let videoURL;
        let videoThumbnail;       
        const results = data.videos.map((videos, key) =>
                videos.songs.map((songs, i) => {
                    videoURL = this.buildVideoURL(videos.id, songs.timestamp);
                    videoThumbnail = this.buildVideoThumbnail(videos.id)                   
                    return (
                        <li key={songs.title}>
                        <a href={videoURL} target='_blank' rel='noopener noreferrer'>
                            <span className="thumbnail">
                                <img src={videoThumbnail} alt={videos.artist + ' - ' + songs.title} />
                            </span>
                            <span className="video-details">
                                <span className="artist">
                                    {videos.artist}
                                </span>      
                                <span className="song">
                                    {songs.title}
                                </span>
                                <span className="title">
                                    {videos.title}
                                </span>
                                <span className="timestamp">
                                    ({songs.timestamp})
                                </span>
                            </span>
                        </a>
                    </li>
                    )
                })
        );

        this.state = {
            query: null,
            count: results.flat(2).length,
            results: results,
        };        
    }

    handleInputChange = (value) => {
        const filteredData = Object.values(data.videos)
                                .filter(video => 
                                    video.artist.toLowerCase().includes(value.toLowerCase()) ||
                                    video.title.toLowerCase().includes(value.toLowerCase())
                                );
       
        let videoURL;
        let videoThumbnail;
        const results = filteredData.map((videos, key) =>
            videos.songs.map((songs, i) => {
                videoURL = this.buildVideoURL(videos.id, songs.timestamp);
                videoThumbnail = this.buildVideoThumbnail(videos.id)
                return (
                    <li key={songs.title}>
                        <a href={videoURL} target='_blank' rel='noopener noreferrer'>
                            <span className="thumbnail">
                                <img src={videoThumbnail} alt={videos.artist + ' - ' + songs.title} />
                            </span>
                            <span className="video-details">
                                <span className="artist">
                                    {videos.artist}
                                </span>      
                                <span className="song">
                                    {songs.title}
                                </span>
                                <span className="title">
                                    {videos.title}
                                </span>
                                <span className="timestamp">
                                    ({songs.timestamp})
                                </span>
                            </span>
                        </a>
                    </li>
                    )
                })
        );

        this.setState({
            query: value,
            count: results.flat(2).length,
            results: results,
        });
    }

    buildVideoURL(id, timestamp) {
        let minutes = timestamp.slice(0, timestamp.indexOf(":"));
        let seconds = timestamp.slice(timestamp.indexOf(":") + 1, timestamp.length);
        let timeInSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
        return 'https://www.youtube.com/watch?v=' + id + '&t=' + timeInSeconds + 's';
    }

    buildVideoThumbnail(id) {
        return 'https://img.youtube.com/vi/' + id + '/0.jpg'
    }

    render() {
        const title = "Live From Home";
        return (
            <section id="container">
                <nav>
                    <h1>{title}</h1>
                </nav>
                <Search
                    value={this.state.query}
                    onChange={(e) => this.handleInputChange(e)}
                />
                <SearchResults
                    value={this.state.results}
                    count={this.state.count}
                />
            </section>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );