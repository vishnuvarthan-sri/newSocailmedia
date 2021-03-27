import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Link, Avatar,Snackbar } from '@material-ui/core';
import { Face, Fingerprint,LockOutlined } from '@material-ui/icons';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { signup } from '../actions/user_action';
import { toast, SemanticToastContainer } from "react-semantic-toasts";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing(8),
    width: 280,
    height: "70vh",
    margin: "40px auto"
  },
});
 

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      PageView:true,
      email:"",
      psw:"",
      uname:"",
      Cnpsw:"",
      token:"Saved"
    }
  }

  componentDidUpdate(){
    if(this.props.user.token === this.state.token){
      this.props.history.push("/")
    }
    }
  username=(e)=>{
    this.setState({
      uname:e.target.value
    })
  }
  email=(e)=>{
    this.setState({
      email:e.target.value
    })
  }
  password=(e)=>{
    this.setState({
      psw:e.target.value
    })
  }
  confirmPassword=(e)=>{
    this.setState({
      Cnpsw:e.target.value
    })
  }

signup=()=>{
let email = this.state.email;
let uname =this.state.uname;
let psw =this.state.psw;
let Cnpsw = this.state.Cnpsw;
this.props.signup(email,uname,psw,Cnpsw)
}

  handleClick=()=>{
    this.props.history.push("/")
  }
 
  render() {
    const { classes } = this.props;
    return (
        <div>
           
      <Paper className={classes.padding} elevation={10}>
      <SemanticToastContainer/>
        <div className={classes.margin}>
        <Grid align="center" style={{marginTop:"-40px"}}>  
             <Avatar style={{backgroundColor:"gold"}}><LockOutlined/></Avatar>
             <h1>Sign-Up</h1>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">  
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="username" label="Username" type="text" onChange={(e)=>this.username(e)} fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">  
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="email" label="Email" type="email" onChange={(e)=>this.email(e)} fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="password" label="Password" onChange={(e)=>this.password(e)} type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="password" label="Confirm Password"  onChange={(e)=>this.confirmPassword(e)} type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container style={{marginTop:10}}>
            <Grid item>
              <Link onClick={this.handleClick} variant="body2">
                {"Already Have a account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button   variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.signup}>SignUp</Button>
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
      signup
      // actions
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp)));