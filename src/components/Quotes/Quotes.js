import React, {
    Component
} from 'react';
import './Quotes.css';
import UserNamemodal from "../UserNamemodal/UserNamemodal";

let imagePlaceholder = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg";
class Quotes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            bgImage: imagePlaceholder,
            hh: '00',
            mm: '00',
            greetings: 'loading...',
            quote: 'loading...',

        };
    }
    componentDidMount = () => {
        this.fetchNewImage();
        setInterval(this.fetchNewImage, 1800000);
        this.startClock();
        this.fetchNewQuote();
        setInterval(this.fetchNewQuote, 300000);

    };


    fetchNewQuote = () =>{
        this.setState({
            quote: "loading..."
        });
        fetch("https://quotes.rest/quote/random?language=en&limit=1", {
            headers: {
                Accept: "application/json",
                "X-Theysaidso-Api-Secret": ""
            }
        }).then((data) => {
                console.log(data.contents.quotes)
                this.setState({
                    quote: data.contents.quotes.quote
                })
            }).catch((error)=>{
                this.setState({
                    quote: "problem loading quote"
                })
            })
    };
    fetchNewImage = () => {
        fetch('https://lorempixel.com/640/480/nature', {
            mode: 'no-cors',
        }).then((data) => {
                this.setState({
                    bgImage: 'https://lorempixel.com/640/480/nature'
                })
            }).catch((error)=>{
            this.setState({
                bgImage: imagePlaceholder
            })
        })
    };

    startClock = () =>{
        this.newTime();
        setInterval(this.newTime, 1000);
    };

    newTime = () =>{
        let myDate = new Date();
        this.setState({
            hh: myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours(),
            mm: myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
        });

        this.setGreetings(myDate.getHours())
    };
    setGreetings = (hrs) =>{
        if (hrs < 12)
            this.setState({
                greetings: 'Good Morning',
            });
        else if (hrs >= 12 && hrs <= 17)
            this.setState({
                greetings: 'Good Afternoon',
            });
        else if (hrs >= 17 && hrs <= 24)
            this.setState({
                greetings: 'Good Evening',
            });
    };

    handleUsername=(name)=>{
        this.setState({
            userName: name
        })
    };
    render = () => {
        let bgImage = {
            backgroundImage: 'url(' + this.state.bgImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        };
        let quote = {
            color: this.state.quote === 'problem loading quote' ? 'red' : 'white'
        };
        return(
            <>
            <div style={bgImage} className="d-flex h-100 w-100">
                <div className="align-self-center w-100">
                    <div className="col-12 mx-auto">
                        <div>
                            <h1 className="display-3 font-weight-bold">
                                <span className="time"> {this.state.hh}:{this.state.mm}</span>
                               </h1>
                            <h2 className="name">{this.state.greetings}, {this.state.userName}!</h2>
                        </div>

                    </div>
                    <p className="quote-text lead col-12 mx-auto font-weight-bold" style={quote}>
                        {this.state.quote}
                    </p>
                </div>
            </div>
                <UserNamemodal handleUsername={this.handleUsername}/>
        </>
        )}
}

export default Quotes;
