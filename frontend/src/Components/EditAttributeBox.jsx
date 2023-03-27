import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { GrFormEdit } from "react-icons/gr";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AddAttributeBoxx.css";


const EditAttributeBox=({dashDisp,setDashDisp,sprintID,taskID,attributeID,assignedTo,description,state})=>{
    const initialState={
        description:description,
        state:state,
        assignedTo:assignedTo
    };
    const [attribute,setAttribute]=React.useState(initialState);
    const [load,setLoad]=React.useState(false);
    const AllUsers=useSelector(store=>store.UserReducer.allUsers);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const UpdateAttribute=()=>{
        setLoad(true);
        let obj={};
        if(attribute.description!==initialState.description){
          obj.description=attribute.description;
        }
        if(attribute.userID!==initialState.userID){
          obj.userID=attribute.userID;
        }
        if(attribute.state!==initialState.state){
          obj.state=attribute.state;
        }
        axios.patch(`https://backend-task-organizer.vercel.app/attributes/editattribute/${attributeID}`,obj).then((res)=>{
            let response=res.data;
            if(response.message==="Attribute is updated"){
                toast({
                    title: 'Attribute Updated',
                    description: "Attribute is updated",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=dashDisp.map((el)=>{
                    if(el.sprintID===sprintID){
                        el.tasks=el.tasks.map((ele)=>{
                            if(ele.taskID===taskID){
                              ele.Attribure=ele.Attribure.map((elA)=>{
                                if(elA.attributeID===attributeID){
                                    elA.description=attribute.description;
                                    elA.state=attribute.state;
                                    elA.assignedTo=attribute.assignedTo;
                                    return elA;
                                } else {
                                    return elA;
                                }
                              });
                              return ele;
                            } else {
                              return ele;
                            }
                        });
                        return el;
                    } else {
                        return el;
                    }
                });
                setDashDisp(dashDisp);
            } else {
                toast({
                    title: 'Error',
                    description: "Something went wrong, Try again",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
            setLoad(false);
            onClose();
        }).catch(err=>{
            toast({
                title: 'Error',
                description: "Something went wrong, Try again",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setLoad(false);
            onClose();
        });
    }
    return <>
    <GrFormEdit onClick={onOpen}/>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Update Attribute</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && <input type="text" className="Deesp" value={attribute.description} placeholder="Description..." style={{height:"50px",width:"250px",paddingLeft:"2%"}} onChange={(e)=>setAttribute({...attribute,description:e.target.value})}/>}
          {!load && <div className="AddAttriSelectBox"><h1>Assign To :</h1><select value={attribute.assignedTo._id} onChange={(e)=>setAttribute({...attribute,assignedTo:AllUsers.find(elUse=>elUse._id===e.target.value)})}>
            <option value="">--select--</option>
            {AllUsers.map((el,index)=><option key={index} value={el._id}>{el.name}</option>)}
          </select></div>}
          {!load && <div className="AddAttriSelectBox"><h1>State :</h1><select value={attribute.state} onChange={(e)=>setAttribute({...attribute,state:e.target.value})}>
            <option value="">--select--</option>
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select></div>}
          {load && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef}  colorScheme='red' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' ml={3} onClick={UpdateAttribute}>
            Update
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default EditAttributeBox;