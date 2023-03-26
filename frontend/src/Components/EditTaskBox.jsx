import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { GrEdit } from "react-icons/gr";
import axios from "axios";

const initialState={
    taskName:""
}

const EditTaskBox=({dashDisp,setDashDisp,sprintID,taskID})=>{
    const [task,setTask]=React.useState(initialState);
    const [load,setLoad]=React.useState(false);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const UpdateTask=()=>{
        setLoad(true);
        axios.patch(`https://backend-task-organizer.vercel.app/tasks/updatetask/${taskID}`,{name:task.taskName}).then((res)=>{
            let response=res.data;
            if(response.message==="Task is updated"){
                toast({
                    title: 'Task Updated',
                    description: "Task is updated",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=dashDisp.map((el)=>{
                    if(el.sprintID===sprintID){
                        el.tasks=el.tasks.map((ele)=>{
                            if(ele.taskID===taskID){
                                ele.taskName=task.taskName;
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
        setTask(initialState);
    }
    return <>
    <button onClick={onOpen}><GrEdit size="16px"/></button>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Update Task</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && <input type="text" value={task.taskName} placeholder="Name of Task" style={{height:"50px",width:"250px",paddingLeft:"2%"}} onChange={(e)=>setTask({...task,taskName:e.target.value})}/>}
          {load && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef}  colorScheme='red' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' ml={3} onClick={UpdateTask}>
            Update
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default EditTaskBox;