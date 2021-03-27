import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Link, Avatar,AppBar,Toolbar,Typography,IconButton,Container ,CssBaseline,Icon} from '@material-ui/core';
import { Face, Fingerprint,LockOutlined,PhotoCamera, ThreeSixtySharp} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CancelIcon from '@material-ui/icons/Cancel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { upload ,image} from '../actions/user_action';
const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(8),
      width: 400,
      height: "30vh",
      margin: "80px auto",
      backgroundColor:"white",
      borderRadius:"4px"
    
    },
avatar:{
    marginLeft:theme.spacing(-5),
    marginTop:theme.spacing(-5)
},
input: {
    display: 'none',
  },
  photo:{
    marginLeft:theme.spacing(20),
    marginTop:theme.spacing(-8)
  },
  upload:{
    marginLeft:theme.spacing(28),
    marginTop:theme.spacing(-13)
  },
  text:{
      margin:theme.spacing(1),
      width:400,
      marginLeft:theme.spacing(-8),
      marginTop:theme.spacing(1)
  },
  media: {
    height: 200,
  },
  rootmedia:{
    maxWidth: 300,
    marginLeft:theme.spacing(-8),
  },
  anotherMedia:{
    maxWidth:350,
    marginLeft:theme.spacing(55),
  }

  });
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
     selectedphoto:"",
     photo:false,
     post:[],
     open:false,
     imgSrc:"",
     text:"",
     recievetext:"",
     like:true
    }
  }


arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

getImagePreviewSource(buffer, contentType) {
  var base64Flag = `data:${contentType};base64,`;
  var imageStr = this.arrayBufferToBase64(buffer);
  return base64Flag + imageStr;
}
 componentWillReceiveProps(){
   let text;
   let image;
   let contentType;
   let imgSrc =this.state.imgSrc;
if(this.props.user.post != undefined){
  this.props.user.post.map((all)=>{
    image = all.photo.data.data
    contentType= all.photo.contentType
    text =all.text
   });
   imgSrc = this.getImagePreviewSource(image,contentType);
}
console.log(imgSrc,text,"source")
this.setState({
  recievetext:text,
  imgSrc
})
 }
 


  logout=()=>{
    this.props.history.push("/")
  }
  cancel=()=>{
    this.setState({
      photo:false 
    })
  }
  uploadImage=(e)=>{
this.setState({
  selectedphoto:e.target.files[0],
  photo:true
})
  }
text=(e)=>{
this.setState({
  text:e.target.value
})
}
handleclick=()=>{
  let photo =this.state.selectedphoto;
  let text =this.state.text;
  this.props.upload(photo,text);
  this.props.image()
  this.setState({
    photo:false
  })
}
change=()=>{
  this.setState({
    like:false
  })
}
unchange=()=>{
  this.setState({
    like:true
  })
}

render(){
    const { classes } = this.props;
    console.log(this.state.selectedphoto,"the imagee")
   console.log(this.state.imgSrc,"theimagesrc")
//     let image;
//     let text;
//     let contentType;
    
//     if(this.props.user.post != undefined){
// this.props.user.post.map((all)=>{
//  image = all.photo.data.data
//  contentType= all.photo.contentType
// console.log(all.text,"the text")
// })
//     }
// let imgSrc =this.getImagePreviewSource(image,contentType)
// console.log(imgSrc,"the actual image")
// console.log(text,"text")
return(
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Post
          </Typography>
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
     <Container fluid >
    <form className={classes.padding} fluid>
       
       <Avatar className={classes.avatar}>
           <Face />
       </Avatar>
      <input accept=".jpg,.png" className={classes.input} id="icon-button-file" type="file" multiple onChange={(e)=>this.uploadImage(e)}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.photo}>
          <PhotoCamera />
        </IconButton>
      </label>
      <Button
        variant="contained"
        color="primary"
        className={classes.upload}
        endIcon={<SendIcon />}
       onClick={this.handleclick}
      >
        Post
      </Button>
{this.state.photo && this.state.selectedphoto ?
<Card className={classes.rootmedia}>
<CardHeader
action={
  <IconButton aria-label="settings" onClick={this.cancel}>
    <CancelIcon  />
  </IconButton>
}
/>
<CardMedia  component="img" height="140" image={this.state.selectedphoto.name} />
</Card>
:null
}
      <TextField
          id="standard-multiline-static"
          label="Multiline"
          onChange={(e)=>this.text(e)}
          multiline
          rows={3}
          className={classes.text}
          defaultValue="Default Value"
          variant="filled"
        />
    </form>
{this.props.user.post != undefined &&
    <Card className={classes.anotherMedia}>
      {this.state.imgSrc != undefined  &&
  <CardMedia  height="140"> 
  <img src={this.state.imgSrc} />
  </CardMedia>}
  {this.state.text  &&
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
           {this.state.recievetext}
        </Typography>
      </CardContent>}
    
      <CardActions disableSpacing>
        {this.state.like &&
        <IconButton aria-label="add to favorites" onClick={this.change}>
          <FavoriteIcon />
        </IconButton>}
        {!this.state.like && 
          <IconButton aria-label="add to favorites" onClick={this.unchange} >
          <FavoriteIcon style={{color:"red"}}/>
        </IconButton>
        }
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </CardActions>
</Card>  
}
    </Container>
    </div>
)


}

}
const mapStateToProps = state => {
  return {
    //reducer props to state
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      upload,
      image,
      // actions
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page)));