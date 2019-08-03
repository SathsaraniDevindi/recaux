import React, {Component} from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./OutSourceProject.css";



class OutSourceProject extends Component {

    constructor(props) {
        super(props);

        this.onChangeOutName=this.onChangeOutName.bind(this);
        this.onChangeOutDesignation=this.onChangeOutDesignation.bind(this);
        this.onChangeOutExeProfile=this.onChangeOutExeProfile.bind(this);
        this.onChangeOutSkill=this.onChangeOutSkill.bind(this);
        // this.onChangeOutSkill=this.onChangeOutSkill.bind(this);
        //this.onChangeSkill=this.onChangeSkill.bind(this);


      


        this.state = {
            out_Name: '',
            out_Designation: '',
            out_ExeProfile: '',
            Skill: [],
            projects: [{Company:"", DesignationP:"",Duration:"",Environment:"",TechnologiesP:""}],
            out_Qualification: '',
        }
    }

    onChangeOutName(e) {
        this.setState({
            out_Name: e.target.value
        });
    }

    onChangeOutDesignation(e) {
        this.setState({
            out_Designation: e.target.value
        });
    }

    onChangeOutExeProfile(e) {
        this.setState({
            out_ExeProfile: e.target.value
        });
    }

   onChangeOutSkill = idx => evt => {
         const newSkills = this.state.Skill.map((Skill, sidx) => {
           if (idx !== sidx) return Skill;
           return { ...Skill, name: evt.target.value };
         });
     
         this.setState({ Skill: newSkills });
       };
     
       handleAddSkill = () => {
         this.setState({
           Skill: this.state.Skill.concat([{ name: "" }])
         });
       };
     
       handleRemoveSkill = idx => () => {
         this.setState({
           Skill: this.state.Skill.filter((s, sidx) => idx !== sidx)
         });
       };

       handleExperience=(e)=>{
         if(["Company", "DesignationP", "Duration", "Environment", "TechnologiesP"].includes(e.target.className)){
           let projects = [...this.state.projects]
           projects[e.target.dataset.id][e.target.className]=e.target.value.toUpperCase()
           this.setState({projects}, ()=> console.log(this.state.projects))
         }
         else{
           this.setState({[e.target.name]:e.target.value.toUpperCase()})
         }
       }

       handleAddExperience=(e)=>{
         this.setState((prevState) => ({
            projects: [...prevState.projects, {Company:"", DesignationP:"",Duration:"",Environment:"",TechnologiesP:""}],

         }));

        }

        onChangeOutQualification(e) {
          this.setState({
              out_Qualification: e.target.value
          });
      }

         
       



    render() {
        let {out_Name ,out_Designation , out_ExeProfile , Skill , projects } = this.state
      return (
        
        <div className="container">
            <h1><b>Auxenta Profile</b></h1>
            <br/>
          
            <div>
                 <form onSubmit={this.onSubmit} class="form-horizontal"  >
                     <div className="form-group row">
                        <label class="control-label">Name:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.out_Name}
                                onChange={this.onChangeOutName}
                                />
                    </div>

                    <div className="form-group row">
                        <label>Designation:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.out_Designation}
                                onChange={this.onChangeOutDesignation}
                                />
                    </div>

                    <div className="form-group row">
                        <label>Executive Profile:</label>
                        <textarea
                                className="form-control"
                                value={this.state.out_ExeProfile}
                                onChange={this.onChangeOutExeProfile}
                                />
                    </div>

                    

                    <div className="form-group ">
                        <label>Skills/Technologies:</label><br/>
                         
                        {this.state.Skill.map((Skill, idx) => (
                         <div >
                           <br/>
                             <input
                                 
                                 //value={Skill.name}
                                 //value={this.state.Skill}
                                 onChange={this.onChangeOutSkill(idx)} />
                         
                              <button
                                 type="button" 
                                 class="btn btn-primary"
                                 onClick={this.handleRemoveSkill(idx)}>
                                <i class="fa fa-trash"></i>    
                              </button>
                         </div>
                      ))}
                       <div>
                        
                        
                         <button 
                            type="button"
                            class="btn btn-primary"
                            onClick={this.handleAddSkill}> 
                            <i class="fas fa-plus "  ></i>
                            Add Skill
                        
                         </button> 
                        </div>
                      </div>

                      <div className="form-group ">
                         <label>Experience:</label> <br/>
                         <button 
                            type="button"
                            class="btn btn-primary"
                            onClick={this.handleExperience}> 
                            <i class="fas fa-pen-fancy "  ></i>
                            Add Experience
                        
                         </button> 


                        {
                          projects.map((val , idx)=>{
                            let comId = 'com-${idx}',desId='des-${idx}', durId = 'dur-${idx}', envId = 'env-${idx}', techId = 'tech-${idx}'                
                          
                            return (
                              <div key={idx}>
                                <label htmlFor={comId}>Company</label>
                                <input
                                  type="text"
                                  name={comId}
                                  data-id={idx}
                                  id={comId}
                                  value={projects[idx].Company} 
                                  className="form-control"
                                />
                                <label htmlFor={desId}>Designation</label>
                                <input
                                  type="text"
                                  name={desId}
                                  data-id={idx}
                                  id={desId}
                                  value={projects[idx].DesignationP} 
                                  className="form-control"
                                />

                                <label htmlFor={durId}>Duration</label>
                                <input
                                  type="text"
                                  name={durId}
                                  data-id={idx}
                                  id={durId}
                                  value={projects[idx].Duration} 
                                  className="form-control"
                                />
                                <label htmlFor={durId}>Project Environment</label>
                                <input
                                  type="text"
                                  name={envId}
                                  data-id={idx}
                                  id={envId}
                                  value={projects[idx].Environment} 
                                  className="form-control"
                                />

                                <label htmlFor={durId}>Project Technologies</label>
                                <input
                                  type="text"
                                  name={techId}
                                  data-id={idx}
                                  id={techId}
                                  value={projects[idx].TechnologiesP} 
                                  className="form-control"
                                />





                              </div>
                            )
                          
                          
                          
                          }
                          )
                        }
                    </div>  
                    

                    <div className="form-group row">
                        <label>Qualifications:</label>
                        <textarea 
                                className="form-control"
                                value={this.state.out_Qualification}
                                onChange={this.onChangeOutQualification}
                                />
                    </div>


                </form>

            </div>
        </div>
      );
    }
  }
  
  export default OutSourceProject;
  
  



 /* import React, { Component } from 'react';
 //import { MDBInput } from "mdbreact";
 import ReactDOM from "react-dom";
 //import AddIcon from '@material-ui/icons/Add';
 /* import Icon from '@material-ui/core/Icon';
 import DeleteIcon from '@material-ui/icons/Delete';
 import Fab from '@material-ui/core/Fab'; */
 //import { Field, FieldArray, reduxForm } from 'redux-form'
 
//  class OutSourceProject extends Component{
 
//      state = {
//          name: '',
//          Skill: '',
//          Designation:'',
//          Qualification:'',
         
         
         
 
       
//      };
 
//      change = e =>{
//          this.setState(
//              {
//                  [e.target.name]:e.target.value
//              }
//          );
//      };
     
//     onSubmit=(e) => {
//         e.preventDefault()
//         console.log(this.state);
//     }
 
 
//      constructor() {
//          super();
//          this.state = {
//            name: "",
//            Skill: [{ name: "" }]
//          };
//        }
 
     
//        handleSkillNameChange = idx => evt => {
//          const newSkills = this.state.Skill.map((Skill, sidx) => {
//            if (idx !== sidx) return Skill;
//            return { ...Skill, name: evt.target.value };
//          });
     
//          this.setState({ Skill: newSkills });
//        };
     
//        handleAddSkill = () => {
//          this.setState({
//            Skill: this.state.Skill.concat([{ name: "" }])
//          });
//        };
     
//        handleRemoveSkill = idx => () => {
//          this.setState({
//            Skill: this.state.Skill.filter((s, sidx) => idx !== sidx)
//          });
//        };
     
 
 
 
//      render(){
//          return(
//              /*<form>
//            <Typography component="div">
              
//                  <Box textAlign="center" m={1}>
//                      <h1><b>Auxenta Profile</b></h1>
//                  </Box>
//              </Typography>
//                  <div>
 
//                  </div>
//              </form>*/
 
//              <div>
//                  <h1 align="center">Auxenta Profile</h1>
//                  <form onSubmit={this.onSubmit}>
//                      <div className="form-group">
//                      <label><b>Name:</b></label><br></br>
//                      <input type="text"  name="Name"   value={this.state.Name}/><br></br>
//                      <label><b>Designation:</b></label><br></br>
//                      <input  name="Designation" value={this.state.Designation} />
//                      <h6><b>Skills/Technology</b></h6>
 
//                      {this.state.Skill.map((Skill, idx) => (
//                          <div className="skill">
//                              <input
//                                  type="text"
//                                  placeholder=" "
//                                  name='Skill'
//                                  //value={Skill.name}
//                                  //value={this.state.Skill}
//                                  onChange={this.handleSkillNameChange(idx)}
//                              />
//                               <button
//                                  type="button" 
//                                  onClick={this.handleRemoveSkill(idx)}
//                                  className="small"
//                              >Remove
               
//                              </button>
//                          </div>
//                       ))}
//                          <button
//                           type="button"
//                          onClick={this.handleAddSkill}
//                          className="small"
//                          > 
//                            Add Skill</button><br></br> 
                         
                     
//                      <label><b>Qualifications:</b></label><br></br>
//                      <input type="textarea" name="Qualification" label="Qualifications" rows="10" value={this.state.Qualification}/>
                     
 
//                      </div>    
//                  </form>
//              </div>
 
            
         
//      );
//      }
 
//  }
 
//  export default OutSourceProject; */