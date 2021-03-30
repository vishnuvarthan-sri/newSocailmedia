import React from 'react';
import { withStyles, Grid, TextField, Button,  Avatar,AppBar,Toolbar,Typography,IconButton,Container ,CssBaseline} from '@material-ui/core';
import { Face, } from '@material-ui/icons';
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
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
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
    marginLeft:theme.spacing(15),
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
  },
  modalMedia:{
    maxWidth:350,
    marginLeft:theme.spacing(55),
    marginTop:theme.spacing(35)
  },
  sample:{
    marginLeft:theme.spacing(60),
    color:"blue",
    display: "flex",
  }

  });
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
     selectedphoto:"",
     imgPreview:"",
     photo:false,
     post:[],
     open:false,
     imgSrc:"",
     text:"",
     recievetext:"",
     like:true,
     modal:true,
     count:0
    }
  }

componentDidUpdate(prevProps){
  if(prevProps.user.posted != this.props.user.posted){
    this.props.image();
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
 

  logout=()=>{
    this.props.history.push("/")
  }
  cancel=()=>{
    this.setState({
      photo:false ,
      imgPreview:""
    })
  }
  uploadImage=(e)=>{
this.setState({
  selectedphoto:e.target.files[0],
  imgPreview:e.target.files[0]
  ? URL.createObjectURL(e.target.files[0])
  : "",
  photo:true,
  modal:false
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
  if(photo && text != undefined){
  this.props.upload(photo,text);
  }else{
    alert("Enter both text and image")
  }
  this.setState({
    photo:false,
    text:"",
    modal:true
  })
}
change=()=>{
  this.setState({
    like:false,
    count:this.state.count +1
  })
}
unchange=()=>{
  this.setState({
    like:true
  })
}

render(){
   const { classes } = this.props;
   console.log(this.props.user.post,"src")
   let recievetext ;
   let image;
   let contentType;
   let imgSrc;
if(this.props.user.post != undefined){
  this.props.user.post.map((data)=>{
    image = data.photo.data.data
    contentType = data.photo.contentType
    recievetext = data.text
   });
   imgSrc = this.getImagePreviewSource(image,contentType);
}
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
       <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e)=>this.uploadImage(e)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span"  className={classes.photo}  endIcon={<PhotoLibraryOutlinedIcon />}>
          Add
        </Button>
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
title="Preview"
/>
<CardMedia component="img"
          alt="preview"
          height="200" image={this.state.imgPreview}   />
</Card>
:null
}
      <TextField
          id="standard-multiline-static"
          label="Post"
          onChange={(e)=>this.text(e)}
          multiline
          value={this.state.text}
          rows={3}
          className={classes.text}
          placeholder="Whats in your mind ?"
          variant="filled"
        />
    </form>
    {this.props.user.post === undefined && !this.state.selectedphoto ?
    <p className={classes.sample}>No post available Yet</p>
    :null
    }
{this.props.user.post !== undefined &&
    <Card className={this.state.modal ? classes.anotherMedia : classes.modalMedia}>
      {imgSrc != undefined  &&
  <CardMedia component="img"
  alt="preview"
  height="140" image={imgSrc}   />}
  {recievetext  &&
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
           {recievetext}
        </Typography>
      </CardContent>}
    
      <CardActions disableSpacing>
        {this.state.like &&
        <IconButton aria-label="add to favorites" onClick={this.change}>
          <FavoriteIcon />
          <p>{this.state.count}</p>
        </IconButton>
        }
        {!this.state.like && 
          <IconButton aria-label="add to favorites" onClick={this.unchange} >
          <FavoriteIcon style={{color:"red"}}/>
          <p>{this.state.count}</p>
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