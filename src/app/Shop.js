import React from "react";
import image from './img/f7.jpg';
import { Link, NavLink ,withRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import SimpleMap from "./SimpleMap"
//import StarRatingComponent from 'react-star-rating-component';


export class Shop extends React.Component {
  constructor(props){
    super(props);
    this.state={
        username:"",
        shpimagepath : "",
        shop_id : "",
      shopname:"",
        shopdesc:"",
        address:"",
        city:"",
        mobile:"",
        itemid: "",
        description: "",
        itemname: "",
        qty: "",
        price: "",
        imagepath: "",
        items : []
        // lat : "",
        // lng : "",
        //starrating : 1




    }
  }


  componentDidMount(){
    if(!localStorage.Token ||  jwt_decode(localStorage.Token).details[0].type!="shop owner"  ||  jwt_decode(localStorage.Token).details[0]._id!=this.props.match.params.id)
  { this.props.history.push('/login')}
  
  fetch('http://localhost:3000/reg/view/'+ this.props.match.params.id,{
    method:"GET",
    headers: {
      "Content-Type": "application/json"
    },
   // body:JSON.stringify(user)
  })
  .then(response =>{ 
   return  response.json();
     // console.log(response.json());
  //  response.json().then(function(user) { console.log(user.type) });
    //window.alert('City added.!')

   })
   .then(data =>{
     console.log("Data For Address")
      console.log(data);
    
      this.setState({
        username:data.shop_owner_name,

        shop_id : data.shop_id,
        shpimagepath : data.imagepath,
        shopname:data.shop_name,
        shopdesc:data.description,
        address:data.address,
        city:data.town,
        // items: data.items
        //mobile:data.contact_no,
        // lat : data.lat,
        // lng : data.lng

      })   
    
   })
   .catch(function() {
    console.log('error handling');
    window.alert("something is going wrong..!!")
});


fetch('http://localhost:3000/reg/viewitems/'+ this.props.match.params.id,{
    method:"GET",
    headers: {
      "Content-Type": "application/json"
    },
   // body:JSON.stringify(user)
  })
  .then(response =>{ 
   return  response.json();
     // console.log(response.json());
  //  response.json().then(function(user) { console.log(user.type) });
    //window.alert('City added.!')

   })
   .then(respond =>{
     console.log("data", respond.data);
  //   initialitems = data.map((del) => {
      
  //     return del
    
  //  })
  //  console.log("initialitems");
  //  console.log(initialitems);
  //  this.setState({
  //    items:initialitems
  //  })
      this.setState({
        items : respond.data.items
      })
  })  
    
    .catch(function() {
    console.log('error handling');
    window.alert("something is going wrong..!!")
});




  }

  editprofile()
  {
     this.props.history.push('/acc/')

  }  


   render()
   {

      console.log("Dulanga",this.state.items)

    let itemlist=this.state.items.map((i,index)=> { 
      return(
        
              <div className="col-4 col-6-medium col-12-small">
              <article className="box style2">
                <a href="#" className="image featured"><img src={i.imagepath} alt="" /></a>
                <h3><a href="#">{i.itemname}</a></h3>
                <h3><a href="#">Rs. {i.price}</a></h3>
                <h3><a href="#">Quantity: {i.qty}</a></h3>
                <p>We have the best foods</p>
              </article>
            </div> 
              )
            })


       return(
        
         
        <body className="is-preload">

        {/* {itemlist} */}

        <article id="top" className="wrapper style1">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-5-large col-12-medium">
                        <span className="image fit"><img src={this.state.shpimagepath} alt="" /></span>
                    </div>
                    <div className="col-8 col-7-large col-12-medium">
                        <header>
                            <h1>Hi. This is <strong>{this.state.shopname}</strong>.</h1>
                        </header>
                        <p>{this.state.shopname} which is inspired by Sri Lankan Food Culture. Sri Lankan style less sugar cake,very soft pancake, Volumy but healthy Naughty sandwiches. Matcha desserts and cakes. Natural high quality loose leaf tea, pure arabica Sri Lankan coffee.</p>
                        <a href="#work" className="button large scrolly">Learn about what I do</a>
                    </div>
                </div>
            </div>
        </article>

        <article id="work" className="wrapper style2">
            <div className="container">
                <header>
                    <h2>Here's all the stuff We do.</h2>
                </header>

                <div className="row aln-center">
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span className="image fit"><img src="images/online.png" alt="" /></span>
                            <h3>Online Delivery</h3>
                            <p>Make it easy</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="images/Delivery.jpeg" alt="" /></span>
                            <h3>Food Delivery</h3>
                            <p>Food Delivery is done by {this.state.shopname} to satisfy our Customers as much as we can.</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="images/parking.png" alt="" /></span>
                            <h3>Parking Option</h3>
                            <p>Parking Option is provided to the Customers of {this.state.shopname}.Join with us and take the chance</p>
                        </section>
                    </div>
                </div>
                <footer>
                    <a href="#portfolio" className="button large scrolly">See our Foods</a>
                </footer>
            </div>
        </article>



        <article id="portfolio" className="wrapper style3">
            <div className="container">
                <header>
                    <h2>Here’s Our Foods.</h2>
                </header>
                <div className="row">{itemlist}</div>
        <footer>

         <div style={{"width":"100%", "height" : "100%"}}>
             <SimpleMap lat={6.935741} lng={79.844721} name={'Amrith Restaurant'} />
        </div>      
                        <br/>
                        <br/>
                    
                    
                </footer>
            </div>
        </article>
        



        <article id="contact" className="wrapper style4">
            <div className="container medium">
                <header>
                    <h2>Contact Us</h2>
                </header>
                <div className="row">
                    <div className="col-12">
                        <form method="post" action="#">
                            <div className="row">
                                <div className="col-6 col-12-small">
                                    <input type="text" name="name" id="name" placeholder="Name" />
                                </div>
                                <div className="col-6 col-12-small">
                                    <input type="text" name="email" id="email" placeholder="Email" />
                                </div>
                                <div className="col-12">
                                    <input type="text" name="subject" id="subject" placeholder="Subject" />
                                </div>
                                <div className="col-12">
                                    <textarea name="message" id="message" placeholder="Message"></textarea>
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li><input type="submit" value="Send Message" /></li>
                                        <li><input type="reset" value="Clear Form" className="alt" /></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12">
                        <hr />
                        <h3>Find us on ...</h3>
                        <ul className="social">
                            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                            <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                            <li><a href="#" className="icon fa-tumblr"><span className="label">Tumblr</span></a></li>
                            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
                            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
                            
                            
                        </ul>
                        <hr />
                    </div>
                </div>
                <footer>
                    <ul id="copyright">
                        <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </footer>
            </div>
        </article>
        </body>
       );
   }
}
