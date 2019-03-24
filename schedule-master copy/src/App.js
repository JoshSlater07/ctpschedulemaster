import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import './App.css';
import { Steps } from 'antd';
import { Icon } from 'antd';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input, FormText } from 'reactstrap';

  

const Step = Steps.Step;
  class App extends Component {
    constructor(props){
    super(props)
    this.state={
     
      modal:false,
      timelines:[{
        id:1,
        time:"07:00",
        completed:false,
        url:<img src={"http://2.bp.blogspot.com/-sXhBrR5UV9s/Up21dPTEF8I/AAAAAAAAAKM/v2ZY9aucfS8/s1600/P1040030.JPG"} draggable height="150" width="170"/>
      }]
    }
    this.toggle = this.toggle.bind(this);
}

  


   drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev,id,second) {
    ev.preventDefault();
    let timelines =this.state.timelines
  timelines=timelines.map((timeline)=>{
    if(timeline.id===id){
      if(second===true){
        return {
          ...timeline,
          completed:false
        }
      }
      return {
        ...timeline,
        completed:true
      }
    }
    return timeline
  })
  this.setState({timelines})
  }


  allowDrop(ev) {
    ev.preventDefault();
  }

  

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  addTimeline = ()=>{
    console.log(this.image)
    let img=<img draggable src={this.image.value} height="150" width="170" />
    
      console.log(img)
    let timelines = this.state.timelines
    let newtimeline ={id:timelines.length+1,time:this.time.value,completed:false,url:img}
    timelines.push(newtimeline)
    this.setState({timelines,modal:false})

  }
  
  
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  
  render() {
    return (

     
      
      <div className="timeline">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Add To-Do Event</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input
          innerRef={(node) => this.time = node}
            type="time"
            name="time"
            id="exampleTime"
            placeholder="time placeholder"
          />
              </FormGroup>
        
        <FormGroup>
          <Label for="exampleFile">Image Url</Label >
          <Input innerRef={(node) => this.image = node} type="text" name="file" id="exampleFile" />
          <FormText color="muted">.
          </FormText>
        </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{this.addTimeline()}}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

 



      <div className="container-fluid step-body">
         <div className="row">
            <div className="col-sm-12">
                <div className="stepper-container vertical">
                <div className="stepper">
                <div className="step ">
                    <div className="step-inner">
                        <div className="step-circle-black"></div>
                    </div>
                    <div className="step-content">
                        
                    </div>
                </div>
                {this.state.timelines.map((timeline)=>{
                    return (<div className="step ">
                    <div className="step-inner">
                        <div className="step-circle">{timeline.time}</div>
                    </div>
                    <div className="step-content">
                    {timeline.completed?( <>
                      <div onDrop={(e)=>{this.drop(e,timeline.id,true)}} onDragOver={(ev)=>{this.allowDrop(ev)}} className="left-img-incomplete"></div>
                      <div onDragStart={(e)=>{this.drag(e)}}  className="right-img-complete">{timeline.url}</div>
                    </>):(
                      <>
                      <div onDragStart={(e)=>{this.drag(e)}} className="left-img">{timeline.url}</div>
                      <div onDrop={(e)=>{this.drop(e,timeline.id)}} onDragOver={(ev)=>{this.allowDrop(ev)}} className="right-img"></div>
                    </>)}
                        
                    </div>
                </div>)
                })}
                    <div className="step ">
                    <div onClick={()=>{this.setState({modal:true})}} className="step-inner">
                        <div className="step-circle">+</div>
                    </div>
                </div>

      

                    
                  
                </div>
            </div>
        </div>
    </div>
</div>

      </div>

     
    );
  }
}



export default App;
