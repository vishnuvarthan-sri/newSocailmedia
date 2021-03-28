import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, Link, Avatar } from '@material-ui/core';
import {LockOutlined } from '@material-ui/icons';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { login } from '../actions/user_action';
import { toast, SemanticToastContainer } from "react-semantic-toasts";
const styles = theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(8),
    width: 280,
    height: "70vh",
    margin: "40px auto"
  }
});
 

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      PageView:true,
      email:"",
      psw:"",
      token:"login"
    }
  }
 componentDidUpdate(){
   if(this.state.token === this.props.user.token){
    this.props.history.push("/page")
   }
 }

  handleClick=()=>{
    this.props.history.push("/signup")
  }
  nextPage=()=>{
    let email = this.state.email;
    let psw = this.state.psw;
    if(email && psw !== null){
    this.props.login(email,psw)
    }
   
    
  }
  userName =e =>{
    this.setState({
      email:e.target.value
    })
  }
  password =e =>{
    this.setState({
      psw:e.target.value
    })
  }
  onClose=()=>{
    this.setState({
      PageView:true
    })
  }
  render() {
    const { classes } = this.props;
    console.log(this.props.user.login,"the valuess")
    return (
      <div>
         
      <Paper className={classes.padding} elevation={10}>
      <SemanticToastContainer /> 
        <div className={classes.margin}>
        <Grid align="center">  
             <Avatar style={{backgroundColor:"cyan"}}><LockOutlined/></Avatar>
             <h1>Sign-In</h1>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">  
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="username" label="Username" type="email" onChange={(e)=>this.userName(e)} fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="password" label="Password" type="password" onChange={(e)=>this.password(e)} fullWidth required />
            </Grid>
          </Grid>
          <Grid container style={{marginTop:10}}>
            <Grid item>
              <Link onClick={this.handleClick} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary"  onClick={this.nextPage} style={{ textTransform: "none" }}>Login</Button>
          </Grid>
        </div>
      </Paper>
      </div>
    );
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
      login
      // actions
    },
    dispatch
  );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn)));