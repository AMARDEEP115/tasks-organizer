import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import "./AddAttributeBoxx.css";


const AddAttributeBox=({dashDisp,setDashDisp,sprintID,taskID})=>{
  const initialState={
      description:"",
      state:"",
      taskID:taskID,
      sprintID:sprintID,
      attributeID:"",
      assignedTo:{}
  }
    const [attribute,setAttribute]=React.useState(initialState);
    const [load,setLoad]=React.useState(false);
    const AllUsers=useSelector(store=>store.UserReducer.allUsers);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    console.log(AllUsers);

    const AddNewAttribute=()=>{
        setLoad(true);
        console.log(attribute);
        axios.post("https://backend-task-organizer.vercel.app/attributes/addattribute",{
          description:attribute.description,
          userID:attribute.assignedTo._id,
          state:attribute.state,
          taskID:taskID,
          sprintID:sprintID
        }).then((res)=>{
            let response=res.data;
            if(response.message==="new attribute is added"){
                toast({
                    title: 'Attribute Added',
                    description: "New attribute is added",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=dashDisp.map((el)=>{
                    if(el.sprintID===sprintID){
                        el.tasks=el.tasks.map((ele)=>{
                            if(ele.taskID===taskID){
                              attribute.attributeID=response.newAttribute._id;
                              ele.Attribure=[...ele.Attribure,attribute];
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
        setAttribute(initialState);
    }
    return <>
    <h1 onClick={onOpen}>NEW <AiOutlinePlus/></h1>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Add New Attribute</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && <input type="text" className="Deesp" value={attribute.description} placeholder="Description..." style={{height:"50px",width:"250px",paddingLeft:"2%"}} onChange={(e)=>setAttribute({...attribute,description:e.target.value})}/>}
          {!load && <div className="AddAttriSelectBox"><h1>Assign To :</h1><select value={attribute.assignedTo._id} onChange={(e)=>setAttribute({...attribute,assignedTo:AllUsers.find(el=>el._id===e.target.value)})}>
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
          <Button colorScheme='blue' ml={3} onClick={AddNewAttribute}>
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default AddAttributeBox;